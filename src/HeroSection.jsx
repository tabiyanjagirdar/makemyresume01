import React, { useState } from 'react';
import { db, storage } from './firebase';
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
    const [plan, setPlan] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !mobile || !file || !plan) {
            alert("Please fill in all fields and select a plan.");
            return;
        }

        try {
            setLoading(true);

            const storageRef = ref(storage, `resumes/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            const fileURL = await getDownloadURL(storageRef);

            await addDoc(collection(db, "users"), {
                name,
                mobile,
                plan,
                fileURL,
                uploadedAt: new Date(),
            });

            alert("Uploaded successfully ✅");
            setName('');
            setMobile('');
            setFile(null);
            setPlan('');
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="home"
            className="flex-grow pt-10 flex items-center justify-center text-center px-4 py-16 min-h-screen"
            style={{
                backgroundImage: `url(${bgHero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                className="w-full max-w-[95%] md:w-[700px] lg:w-[900px] xl:w-[1100px] bg-white/80 text-gray-900 px-6 py-10 md:px-10 md:py-14 rounded-3xl md:rounded-[5rem] flex flex-col items-center justify-center"
                style={{ boxShadow: '0 0 40px 12px rgba(255, 255, 255, 0.5)' }}
            >
                {/* Trusted Users */}
                <div className="mb-6 flex items-center gap-3 bg-white/60 px-6 py-2 rounded-xl border border-gray-200 w-fit mx-auto">
                    <div className="flex -space-x-2">
                        <img src={boy} alt="student-1" className="w-10 h-10 rounded-full border-2 border-white" />
                        <img src={girl} alt="student-2" className="w-10 h-10 rounded-full border-2 border-white" />
                        <img src={boy2} alt="student-3" className="w-10 h-10 rounded-full border-2 border-white" />
                    </div>
                    <p className="text-sm text-gray-800 font-medium whitespace-nowrap">
                        Trusted by <span className="text-green-600 font-bold">100+</span> smart students like you 🚀
                    </p>
                </div>

                {/* Heading */}
                <div className="text-center px-4 py-6">
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-snug">
                        We Provide Creative, ATS-Friendly Resume Services That Get You Noticed
                    </h1>
                    <div className="mt-3 flex justify-center items-center text-4xl sm:text-5xl md:text-6xl font-bold gap-2">
                        <span className="text-gray-800">Make</span>
                        <span
                            className="text-white bg-red-600 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-[2rem] sm:text-[2.5rem] leading-[1]"
                            style={{ fontFamily: "Pacifico, cursive" }}
                        >
                            my
                        </span>
                        <span className="text-gray-800">Resume</span>
                    </div>
                </div>

                <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-2">
                    Impress recruiters, pass ATS filters, and land interviews — all in minutes!
                </p>
                <p className="text-sm md:text-base text-gray-600 italic mb-6">
                    Start your career with a strong first impression! 🔥
                </p>

                {/* Form */}
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

                    {/* Plan Dropdown */}
                    <select
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-lg w-full text-gray-700"
                    >
                        <option value="">Select Plan</option>
                        <option value="49">₹49 Plan – Resume + 1 Free Course</option>
                        <option value="99">₹99 Plan – Resume + 2 Courses + Free Placement Prep Materials </option>
                    </select>

                    {/* File Upload */}
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

                    <p className="mt-1 text-xs text-center text-gray-700 font-medium bg-yellow-100 px-4 py-2 rounded-lg shadow-sm">
                        📄 Upload your resume — <span className="font-semibold text-blue-600">we’ll optimize it for ATS</span> and help it reach <span className="font-semibold text-green-600">top recruiters</span>!
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition w-full disabled:opacity-60"
                    >
                        {loading ? "Uploading..." : "Submit"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default HeroSection;
