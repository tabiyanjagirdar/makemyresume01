import React, { useState, useEffect } from "react";
import { db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { FiUpload } from "react-icons/fi";

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
        applyReferral(e.target.value.trim().toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^\d{10}$/.test(mobile) || !name || !file) {
            alert("Please fill in all fields correctly.");
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

            setWhatsappLink(`https://wa.me/919449723865?text=${encodeURIComponent(message)}`);
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
            <div className="w-full max-w-[95%] md:w-[700px] lg:w-[900px] xl:w-[1100px] bg-white/85 text-gray-900 px-6 py-10 md:px-10 md:py-14 rounded-3xl md:rounded-[5rem] flex flex-col items-center">
                {/* Social Proof */}
                <div className="mb-4 flex items-center justify-center gap-3 bg-white/60 px-4 py-2 rounded-xl border border-gray-200">
                    <div className="flex -space-x-2 items-center">
                        <img src={boy} alt="student" className="w-10 h-10 rounded-full border-2 border-white" />
                        <img src={girl} alt="student" className="w-10 h-10 rounded-full border-2 border-white" />
                        <img src={boy2} alt="student" className="w-10 h-10 rounded-full border-2 border-white" />
                    </div>
                    <p className="text-sm text-gray-800 font-medium flex items-center whitespace-nowrap">
                        Trusted by <span className="text-green-600 font-bold mx-1">100+</span> job seekers 🚀
                    </p>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                    Get Your Resume <span className="text-red-600">ATS-Optimized</span> in Minutes!
                </h1>
                <p className="text-gray-700 text-sm md:text-base mb-6 max-w-xl">
                    Professionally redesigned to pass ATS filters and grab recruiters’ attention — plus extra career tools.
                </p>

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
