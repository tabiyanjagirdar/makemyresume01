import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

import Ad300x250 from "./components/Ad300x250";

function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const docRef = doc(db, "courses", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) setCourse({ id: docSnap.id, ...docSnap.data() });
        };
        fetchCourse();
    }, [id]);

    // Inject ads after course loads
    useEffect(() => {
        if (!course) return;

        // Native Ad
        const nativeContainer = document.getElementById("container-eb5de8b2878b13d29759ac560b672011");
        if (nativeContainer) {
            nativeContainer.innerHTML = "";
            const script = document.createElement("script");
            script.src = "//pl27485819.revenuecpmgate.com/eb5de8b2878b13d29759ac560b672011/invoke.js";
            script.async = true;
            script.setAttribute("data-cfasync", "false");
            nativeContainer.appendChild(script);
        }

        // Social Bar / Second Ad
        const socialAdContainer = document.getElementById("container-fae5beaf948081b360878f46b4841b73");
        if (socialAdContainer) {
            socialAdContainer.innerHTML = "";
            const adScript = document.createElement("script");
            adScript.type = "text/javascript";
            adScript.src = "//pl27485813.revenuecpmgate.com/fa/e5/be/fae5beaf948081b360878f46b4841b73.js";
            adScript.async = true;
            socialAdContainer.appendChild(adScript);
        }
    }, [course]);

    if (!course) return <p className="text-center mt-10 text-gray-500 animate-pulse">Loading...</p>;

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
            <Helmet>
                <title>{course.title} - makemyresume.help</title>
                <meta name="description" content={course.description} />
            </Helmet>

            {/* Back Button */}
            <Link
                to="/courses"
                className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg mb-4 text-center"
            >
                ← Back to Courses
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-xl rounded-3xl overflow-hidden max-w-4xl mx-auto w-full"
            >
                {course.imageUrl && (
                    <div className="relative h-64 sm:h-72 md:h-96 w-full overflow-hidden">
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                )}

                <div className="p-4 sm:p-6 md:p-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900">
                        {course.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                        <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {course.category}
                        </span>
                    </div>

                    {/* Top Ad */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-white shadow-md rounded-2xl p-3 border border-gray-200">
                            <Ad300x250 />
                            <p className="text-xs text-gray-500 text-center mt-2">Advertisement</p>
                        </div>
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                        {course.description}
                    </p>

                    {/* Native Ad */}
                    <div
                        id="container-eb5de8b2878b13d29759ac560b672011"
                        className="flex justify-center w-full max-w-md mx-auto mb-6"
                        style={{ minHeight: "250px" }} // ensures ad renders
                    />

                    {/* Social Bar / Second Ad */}
                    <div
                        id="container-fae5beaf948081b360878f46b4841b73"
                        className="flex justify-center w-full max-w-md mx-auto mb-6"
                        style={{ minHeight: "90px" }} // ensures ad renders
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <a
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg mb-4"
                        >
                            Enroll Now
                        </a>
                        <a
                            href="https://chat.whatsapp.com/GwPmoYzo5Qh7OUitJjGX4g"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg space-x-2"
                        >
                            <FaWhatsapp className="w-5 h-5" />
                            <span>Course Notifications</span>
                        </a>
                    </div>

                    {/* Course Highlights */}
                    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border-t border-gray-200 mt-8">
                        <h2 className="text-lg sm:text-xl font-semibold mb-2">Course Highlights</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                            <li>Comprehensive course content</li>
                            <li>Practical examples and exercises</li>
                            <li>Flexible learning schedule</li>
                            <li>Free and accessible online</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default CourseDetails;
