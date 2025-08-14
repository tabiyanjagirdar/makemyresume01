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
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !mobile || !file) {
            alert("Please fill in all fields.");
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
                plan: "99",
                fileURL,
                uploadedAt: new Date(),
            });

            setName('');
            setMobile('');
            setFile(null);
            setSuccess(true); // Show success message
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
            className="flex-grow pt-[1px] flex items-center justify-center text-center px-4 py-16 min-h-screen"
            style={{
                backgroundImage: `url(${bgHero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div
                className="w-full max-w-[95%] md:w-[700px] lg:w-[900px] xl:w-[1100px] bg-white/85 text-gray-900 px-6 py-10 md:px-10 md:py-14 rounded-3xl md:rounded-[5rem] flex flex-col items-center justify-center"
                style={{ boxShadow: '0 0 40px 12px rgba(255, 255, 255, 0.5)' }}
            >
                {/* Social Proof */}
                <div className="mb-4 flex items-center gap-3 bg-white/60 px-6 py-2 rounded-xl border border-gray-200 w-fit mx-auto">
                    <div className="flex -space-x-2">
                        <img src={boy} alt="student-1" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white" />
                        <img src={girl} alt="student-2" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white" />
                        <img src={boy2} alt="student-3" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white" />
                    </div>
                    <p className="text-sm text-gray-800 font-medium whitespace-nowrap">
                        Trusted by <span className="text-green-600 font-bold">100+</span> job seekers 🚀
                    </p>
                </div>

                {/* Headline */}
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug mb-3">
                    Get Your Resume <span className="text-red-600">ATS-Optimized</span> in Minutes!
                </h1>
                <p className="text-gray-700 text-sm md:text-base lg:text-lg mb-6 max-w-xl">
                    We professionally redesign your resume to pass ATS filters and grab recruiters’ attention — plus give you extra career tools.
                </p>

                {/* Plan Highlight */}
                <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-5 mb-6 text-left w-full max-w-md">
                    <h3 className="text-lg font-bold mb-2 text-yellow-800">₹99 Plan Includes:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        <li>✅ ATS-Friendly Resume with Premium Design</li>
                        <li>🎓 2 Free Udemy Certificate Courses</li>
                        <li>🧠 1-on-1 Career Consultation</li>
                        <li>📚 Placement Prep Materials (TCS, Wipro, etc.)</li>
                    </ul>
                </div>

                {/* Form */}
                {!success ? (
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

                        {/* File Upload */}
                        <label className="inline-flex items-center cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition w-full justify-center">
                            <FiUpload className="mr-2 text-xl" />
                            {file ? 'File Selected ✅' : 'Upload Your Resume'}
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </label>

                        {/* Upload Info */}
                        <p className="mt-1 text-xs text-center text-gray-700 font-medium bg-yellow-100 px-4 py-2 rounded-lg shadow-sm">
                            📄 Just upload your current resume — we’ll make it recruiter-ready and ATS-approved!
                        </p>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition w-full disabled:opacity-60"
                        >
                            {loading ? "Processing..." : "Submit"}
                        </button>
                    </form>
                ) : (
                    <div className="bg-green-100 border border-green-300 p-6 rounded-xl text-center max-w-md w-full">
                        <h2 className="text-lg font-bold text-green-700 mb-2">✅ Uploaded Successfully!</h2>
                        <p className="text-gray-700 mb-4">Your resume has been submitted. We’ll get in touch with you soon.</p>
                        <a
                            href="https://wa.me/919964198118?text=Hi,%20I%20have%20uploaded%20my%20resume!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition inline-block"
                        >
                            📲 Get in Touch on WhatsApp
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
