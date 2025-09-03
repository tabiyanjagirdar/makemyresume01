// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Ad300x250 from "./components/Ad300x250";
// import ScrollAd from "./components/ScrollAd";
import { Helmet } from "react-helmet";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [showAllCategories, setShowAllCategories] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            const snapshot = await getDocs(collection(db, "courses"));
            const allCourses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Filter out courses older than 7 days and delete them from Firestore
            const now = new Date();
            const validCourses = [];

            for (let course of allCourses) {
                const createdDate = course.createdAt?.toDate ? course.createdAt.toDate() : new Date(course.createdAt);
                const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);
                if (diffDays > 7) {
                    // Delete from Firestore
                    await deleteDoc(doc(db, "courses", course.id));
                } else {
                    validCourses.push(course);
                }
            }

            // Sort newest first
            validCourses.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                return dateB - dateA;
            });

            setCourses(validCourses);
        };

        fetchCourses();
    }, []);

    const categories = ["All", ...new Set(courses.map(c => c.category))];
    const visibleCategories = showAllCategories ? categories : categories.slice(0, 5);

    const filteredCourses = courses.filter(course =>
        (category === "All" || course.category === category) &&
        (course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.description.toLowerCase().includes(search.toLowerCase()))
    );

    const getDateLabel = date => {
        const courseDate = date?.toDate ? date.toDate() : new Date(date);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        if (courseDate.toDateString() === today.toDateString()) return "Today";
        if (courseDate.toDateString() === yesterday.toDateString()) return "Yesterday";
        return courseDate.toLocaleDateString();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Helmet>
                <title>Free Courses - makemyresume.help</title>
                <meta name="description" content="Explore free courses on makemyresume.help. Learn, enroll, and upgrade your skills with our curated courses." />
            </Helmet>

            <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
                <h2 className="text-2xl font-bold mb-6">Free Courses</h2>

                <div className="flex justify-center mb-6">
                    <div className="bg-white shadow-md rounded-2xl p-3 border border-gray-200">
                        <Ad300x250 />
                        <p className="text-xs text-gray-500 text-center mt-2">Advertisement</p>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-3 mb-6 items-center">
                    {visibleCategories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 border text-sm font-medium transition ${category === cat
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                    {categories.length > 5 && (
                        <button
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="px-4 py-2 border text-sm font-medium text-white bg-red-500 border-gray-300 hover:bg-gray-100 transition"
                        >
                            {showAllCategories ? "Less" : "More"}
                        </button>
                    )}
                </div>

                {/* Search */}
                <div className="relative flex items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border p-2 pl-10 w-full rounded shadow-sm focus:outline-none"
                    />
                </div>

                {/* Courses Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map(course => (
                            <div key={course.id} className="p-4 border rounded-lg shadow hover:shadow-xl transition relative bg-white">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {getDateLabel(course.createdAt)}
                                </div>

                                {course.imageUrl && <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded mb-3" />}
                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                <p className="text-gray-600 text-sm">
                                    {course.description.split(" ").length > 10
                                        ? course.description.split(" ").slice(0, 10).join(" ") + "..."
                                        : course.description
                                    }
                                </p>
                                <p className="text-xs mt-1 text-gray-500 italic">{course.category}</p>

                                <div className="flex gap-2 mt-3">
                                    <Link
                                        to={`/courses/${course.id}`}
                                        className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                                    >
                                        Enroll Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-10 animate-pulse">
                        <h3 className="text-lg font-semibold text-gray-700">❌ No courses found</h3>
                    </div>
                )}
            </div>

            {/* WhatsApp Join Button */}
            <div className="w-full flex justify-center mt-6 mb-6">
                <a href="https://chat.whatsapp.com/GwPmoYzo5Qh7OUitJjGX4g" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
                    Join WhatsApp Group for Course Notifications
                </a>
            </div>

            {/* <ScrollAd /> */}
        </div>
    );
}

export default Courses;
