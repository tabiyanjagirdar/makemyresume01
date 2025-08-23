<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import { db, storage } from './firebase'; // ✅ Use this if firebase.js is in same folder
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import bgHero from './assets/hero-bg.jpg';
import { FiUpload } from 'react-icons/fi';
import boy from './assets/boy.jpg';
import girl from './assets/girl.jpg';
import boy2 from './assets/boy2.jpg';

const HeroSection = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
>>>>>>> origin/master

    const handleSubmit = async (e) => {
        e.preventDefault();

<<<<<<< HEAD
        if (!/^\d{10}$/.test(mobile)) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!name || !mobile || !file) {
            alert("Please fill in all fields.");
=======
        if (!file || !name || !mobile) {
            alert("Please fill all fields and upload a file");
>>>>>>> origin/master
            return;
        }

        try {
            setLoading(true);

<<<<<<< HEAD
            const fileRef = ref(storage, `resumes/${Date.now()}-${file.name}`);
            await uploadBytes(fileRef, file);
            const fileURL = await getDownloadURL(fileRef);
=======
            const storageRef = ref(storage, `resumes/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            const fileURL = await getDownloadURL(storageRef);
>>>>>>> origin/master

            await addDoc(collection(db, "users"), {
                name,
                mobile,
<<<<<<< HEAD
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
=======
                fileURL,
                uploadedAt: new Date()
            });

            alert("Uploaded successfully ✅");
            setName('');
            setMobile('');
            setFile(null);
        } catch (error) {
            console.error("Upload error:", error);
>>>>>>> origin/master
            alert("Upload failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="home"
<<<<<<< HEAD
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
=======
            className="flex-grow flex items-center justify-center text-center px-4 py-16 min-h-screen"
            style={{
                backgroundImage: `url(${bgHero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                className="w-full max-w-[95%] md:w-[700px] lg:w-[900px] xl:w-[1100px] md:h-[600px] lg:h-[700px] xl:h-[750px] bg-white/80 text-gray-900 px-6 py-10 md:px-10 md:py-14 rounded-3xl md:rounded-[5rem] flex flex-col items-center justify-center"
                style={{ boxShadow: '0 0 40px 12px rgba(255, 255, 255, 0.5)' }}
            >
                {/* Trusted Students */}
                <div className="mb-6 flex items-center gap-3 bg-white/60 px-4 md:px-6 py-2 rounded-xl border border-gray-200 w-fit mx-auto">
                    <div className="flex -space-x-2">
                        <img src={boy} alt="student-1" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" />
                        <img src={girl} alt="student-2" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" />
                        <img src={boy2} alt="student-3" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" />
                    </div>
                    <p className="text-xs md:text-sm lg:text-base text-gray-800 font-medium whitespace-nowrap">
                        Trusted by <span className="text-green-600 font-bold">100+</span> smart students like you 🚀
                    </p>
                </div>

                {/* Heading & Description */}
                <div className="text-center px-4 py-6">
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-snug">
                        Build a Creative, ATS-Friendly Resume with
                    </h1>

                    <div className="mt-3 flex justify-center items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gap-2">
                        <span className="text-gray-800">Make</span>
                        <span
                            className="text-white bg-red-600 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-[2rem] sm:text-[2rem] md:text-[2.5rem] leading-[1]"
                            style={{ fontFamily: "Pacifico, cursive" }}
                        >
                            my
                        </span>
                        <span className="text-gray-800">Resume</span>
                    </div>
                </div>

                <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 mb-4">
                    Impress recruiters, pass ATS filters, and land interviews — all in minutes!
                </p>

                <p className="text-xs md:text-sm lg:text-base text-gray-600 italic mb-6">
                    Resume for just egg rice price maga! 🔥
                </p>

                {/* Upload Form */}
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                    <label className="inline-flex items-center cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition w-full justify-center">
                        <FiUpload className="mr-2 text-xl" />
                        {file ? 'Uploaded ✅' : 'Upload Resume'}
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
                        className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition w-full disabled:opacity-60"
                    >
                        {loading ? "Uploading..." : "Submit"}
                    </button>
                </form>
>>>>>>> origin/master
            </div>
        </section>
    );
};

export default HeroSection;
