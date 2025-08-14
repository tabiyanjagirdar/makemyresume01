import React, { useState, useEffect } from "react";
import { db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { FiUpload } from "react-icons/fi";
import { motion } from "framer-motion";

import bgHero from "./assets/hero-bg.jpg";
import boy from "./assets/boy.jpg";
import girl from "./assets/girl.jpg";
import boy2 from "./assets/boy2.jpg";

const BASE_PRICE = 99;

const VALID_CODES = {
    muf01: 10,
    rahul99: 20,
    tabiyan10: 10,
    influencerx: 10,
};

const HeroSection = () => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [referralCode, setReferralCode] = useState("");
    const [price, setPrice] = useState(BASE_PRICE);
    const [discountPercent, setDiscountPercent] = useState(0);

    const [whatsappLink, setWhatsappLink] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlCode = params.get("ref")?.trim().toLowerCase() || "";
        if (urlCode) applyReferral(urlCode);
    }, []);

    const applyReferral = (code) => {
        setReferralCode(code);
        const discount = VALID_CODES[code] || 0;
        setDiscountPercent(discount);

        const discountedPrice =
            discount > 0 ? Math.round(BASE_PRICE - (BASE_PRICE * discount) / 100) : BASE_PRICE;
        setPrice(discountedPrice);
    };

    const handleReferralChange = (e) => {
        const code = e.target.value.trim().toLowerCase();
        applyReferral(code);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!name || !mobile || !file) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const fileRef = ref(storage, `resumes/${Date.now()}-${file.name}`);
            await uploadBytes(fileRef, file);
            const fileURL = await getDownloadURL(fileRef);

            await addDoc(collection(db, "users"), {
                name,
                mobile,
                plan: BASE_PRICE,
                finalPrice: price,
                referralCode: referralCode || null,
                discountPercent,
                fileURL,
                uploadedAt: new Date(),
            });

            const message = `Hi, I have uploaded my resume!
Name: ${name}
Mobile: ${mobile}
Price Paid: ₹${price}
Referral Code: ${referralCode || "None"}
Discount: ${discountPercent}%`;

            setWhatsappLink(`https://wa.me/919964198118?text=${encodeURIComponent(message)}`);
            setName("");
            setMobile("");
            setFile(null);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            alert("Upload failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="home"
            className="flex-grow pt-[1px] flex items-center justify-center text-center px-4 py-16 min-h-screen"
            style={{
                backgroundImage: `url(${bgHero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div
                className="w-full max-w-[95%] md:w-[700px] lg:w-[900px] xl:w-[1100px] bg-white/85 text-gray-900 px-6 py-10 md:px-10 md:py-14 rounded-3xl md:rounded-[5rem] flex flex-col items-center"
                style={{ boxShadow: "0 0 40px 12px rgba(255, 255, 255, 0.5)" }}
            >
                {/* Social Proof */}
                <div className="mb-4 flex items-center gap-3 bg-white/60 px-6 py-2 rounded-xl border border-gray-200 w-fit">
                    <div className="flex -space-x-2">
                        <img src={boy} alt="student" className="w-10 h-10 rounded-full border-2 border-white" />
                        <img src={girl} alt="student" className="w-10 h-10 rounded-full border-2 border-white" />
                        <img src={boy2} alt="student" className="w-10 h-10 rounded-full border-2 border-white" />
                    </div>
                    <p className="text-sm text-gray-800 font-medium">
                        Trusted by <span className="text-green-600 font-bold">100+</span> job seekers 🚀
                    </p>
                </div>

                {/* Heading */}
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                    Get Your Resume <span className="text-red-600">ATS-Optimized</span> in Minutes!
                </h1>
                <p className="text-gray-700 text-sm md:text-base mb-6 max-w-xl">
                    Professionally redesigned to pass ATS filters and grab recruiters’ attention — plus extra career tools.
                </p>

                {/* Plan Features */}
                <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-5 mb-6 w-full max-w-md text-left">
                    <h3 className="text-lg font-bold mb-2 text-yellow-800">₹99 Plan Includes:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        <li>✅ ATS-Friendly Resume</li>
                        <li>🎓 2 Free Udemy Certificate Courses</li>
                        <li>🧠 1-on-1 Career Consultation</li>
                        <li>📚 Placement Prep Materials</li>
                    </ul>

                    {/* Price Section */}
                    <div className="mt-4 flex flex-col md:flex-row items-center gap-4 justify-center">
                        {discountPercent > 0 && (
                            <motion.span
                                className="text-green-700 font-bold text-xl md:text-2xl"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                🎉 {discountPercent}% OFF Applied
                            </motion.span>
                        )}
                        <div className=" flex start gap-2 items-center">
                            <span className="text-gray-500 line-through text-2xl md:text-2xl mr-2">
                                {discountPercent > 0 ? `₹${BASE_PRICE}` : ""}
                            </span>
                            <span className="text-green-700 font-extrabold text-3xl md:text-5xl">
                                <span> Price: ₹{price} <span className="text-[15px]">only/-</span></span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Form or Success Message */}
                {!success ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                        />
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                        />
                        <input
                            type="text"
                            placeholder="Referral Code (Optional)"
                            value={referralCode}
                            onChange={handleReferralChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                        />
                        <label className="inline-flex items-center cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition w-full justify-center">
                            <FiUpload className="mr-2 text-xl" />
                            {file ? "File Selected ✅" : "Upload Your Resume"}
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </label>
                        <p className="text-xs text-center text-gray-700 bg-yellow-100 px-4 py-2 rounded-lg">
                            📄 Upload your current resume — we’ll make it recruiter-ready!
                        </p>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition disabled:opacity-60"
                        >
                            {loading ? "Processing..." : "Submit"}
                        </button>
                    </form>
                ) : (
                    <div className="bg-green-100 border border-green-300 p-6 rounded-xl text-center max-w-md">
                        <h2 className="text-lg font-bold text-green-700 mb-2">✅ Uploaded Successfully!</h2>
                        <p className="text-gray-700 mb-4">We’ll get in touch with you soon.</p>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition inline-block"
                        >
                            📲 Contact on WhatsApp
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
