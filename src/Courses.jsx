import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import EzoicAd from "./components/EzoicAd";
import EzoicShowAds from "./components/EzoicShowAds";
import { Helmet } from "react-helmet";

// Levenshtein distance for fuzzy search
function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

function Courses() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [showAllCategories, setShowAllCategories] = useState(false);

    const ezoicPlacementIds = [101, 102, 103];

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            const snapshot = await getDocs(collection(db, "courses"));
            const allCourses = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => {
                    const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                    const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                    return dateB - dateA;
                });
            setCourses(allCourses);

            // Initial Ezoic ad load
            window.ezstandalone?.cmd?.push(() => window.ezstandalone.showAds(...ezoicPlacementIds));
        };
        fetchCourses();
    }, []);

    // Refresh Ezoic ads on category/search change
    useEffect(() => {
        window.ezstandalone?.cmd?.push(() => window.ezstandalone.showAds(...ezoicPlacementIds));
    }, [category, search]);

    const categories = ["All", ...new Set(courses.map(c => c.category))];
    const visibleCategories = showAllCategories ? categories : categories.slice(0, 5);

    const filteredCourses = courses
        .filter(course =>
            (category === "All" || course.category === category) &&
            (course.title.toLowerCase().includes(search.toLowerCase()) ||
                course.description.toLowerCase().includes(search.toLowerCase()))
        )
        .sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
            return dateB - dateA;
        });

    let suggestions = [];
    if (filteredCourses.length === 0 && search.trim() !== "") {
        suggestions = courses.filter(
            course =>
                levenshtein(course.title.toLowerCase(), search.toLowerCase()) <= 3 ||
                levenshtein(course.description.toLowerCase(), search.toLowerCase()) <= 3
        );
    }

    const getDateLabel = date => {
        const courseDate = date.toDate ? date.toDate() : new Date(date);
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
                <meta property="og:title" content="Free Courses - makemyresume.help" />
                <meta property="og:description" content="Explore free courses on makemyresume.help. Learn, enroll, and upgrade your skills with our curated courses." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://makemyresume.help/courses" />
                <meta property="og:image" content="https://makemyresume.help/logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Free Courses",
                        "itemListElement": filteredCourses.map((course, idx) => ({
                            "@type": "Course",
                            "position": idx + 1,
                            "name": course.title,
                            "description": course.description,
                            "url": course.link
                        }))
                    })}
                </script>
            </Helmet>

            <div className="w-full flex justify-center my-4">
                <EzoicAd id={101} />
            </div>

            <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
                <h2 className="text-2xl font-bold mb-6">Free Courses</h2>

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

                <div className="relative flex items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border p-2 pl-10 w-full rounded shadow-sm focus:outline-none"
                    />
                    <button
                        onClick={() => setSearch(search)}
                        className="absolute left-3 text-gray-500 hover:text-gray-700"
                    >
                        🔍
                    </button>
                </div>

                {filteredCourses.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map(course => (
                            <div key={course.id} className="p-4 border rounded-lg shadow hover:shadow-xl transition relative bg-white">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {getDateLabel(course.createdAt)}
                                </div>

                                {course.imageUrl && <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded mb-3" />}
                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                <p className="text-gray-600 text-sm">{course.description}</p>
                                <p className="text-xs mt-1 text-gray-500 italic">{course.category}</p>

                                <div className="flex gap-2 mt-3">
                                    <a href={course.link} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                                        Enroll Now
                                    </a>
                                </div>

                                <div className="w-full flex justify-center my-4">
                                    <EzoicAd id={102} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-10 animate-pulse">
                        <h3 className="text-lg font-semibold text-gray-700">❌ No courses found</h3>
                        {suggestions.length > 0 && (
                            <div className="mt-4">
                                <p className="text-gray-600">Did you mean:</p>
                                <div className="flex flex-wrap justify-center gap-3 mt-3">
                                    {suggestions.map(s => (
                                        <span key={s.id} onClick={() => setSearch(s.title)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200">
                                            {s.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full flex justify-center mt-4 mb-4">
                <EzoicAd id={103} />
            </div>

            {/* WhatsApp Join Button */}
            <div className="w-full flex justify-center mt-6 mb-6">
                <a href="https://chat.whatsapp.com/GwPmoYzo5Qh7OUitJjGX4g" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
                    Join WhatsApp Group for Course Notifications
                </a>
            </div>

            <EzoicShowAds ids={ezoicPlacementIds} />
        </div>
    );
}

export default Courses;
