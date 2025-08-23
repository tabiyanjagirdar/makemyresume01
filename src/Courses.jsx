import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

// Levenshtein distance for fuzzy search
function levenshtein(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () =>
        Array(b.length + 1).fill(0)
    );
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else
                dp[i][j] =
                    1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[a.length][b.length];
}

function Courses() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [showAllCategories, setShowAllCategories] = useState(false);

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            const querySnapshot = await getDocs(collection(db, "courses"));
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(new Date().getDate() - 7);

            const recentCourses = querySnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((course) => {
                    if (!course.createdAt) return true;
                    const courseDate = course.createdAt.toDate
                        ? course.createdAt.toDate()
                        : new Date(course.createdAt);
                    return courseDate >= oneWeekAgo;
                });

            setCourses(recentCourses);
        };
        fetchCourses();
    }, []);

    const categories = ["All", ...new Set(courses.map((c) => c.category))];
    const visibleCategories = showAllCategories
        ? categories
        : categories.slice(0, 5);

    const filteredCourses = courses.filter(
        (course) =>
            (category === "All" || course.category === category) &&
            (course.title.toLowerCase().includes(search.toLowerCase()) ||
                course.description.toLowerCase().includes(search.toLowerCase()))
    );

    let suggestions = [];
    if (filteredCourses.length === 0 && search.trim() !== "") {
        suggestions = courses.filter(
            (course) =>
                levenshtein(course.title.toLowerCase(), search.toLowerCase()) <= 3
        );
    }

    const getDateLabel = (date) => {
        const courseDate = date.toDate ? date.toDate() : new Date(date);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (
            courseDate.getDate() === today.getDate() &&
            courseDate.getMonth() === today.getMonth() &&
            courseDate.getFullYear() === today.getFullYear()
        )
            return "Today";

        if (
            courseDate.getDate() === yesterday.getDate() &&
            courseDate.getMonth() === yesterday.getMonth() &&
            courseDate.getFullYear() === yesterday.getFullYear()
        )
            return "Yesterday";

        return courseDate.toLocaleDateString();
    };

    // Inject Top Banner Ad
    useEffect(() => {
        const container = document.getElementById("top-banner-ad");
        if (!container) return;
        container.innerHTML = "";

        const script = document.createElement("script");
        script.innerHTML = `
      atOptions = {
        'key' : '717b13bb1e5878f471b01b30a7ef293d',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
        container.appendChild(script);

        const externalScript = document.createElement("script");
        externalScript.src =
            "//www.highperformanceformat.com/717b13bb1e5878f471b01b30a7ef293d/invoke.js";
        container.appendChild(externalScript);
    }, []);

    // Inject Social Bar
    useEffect(() => {
        const socialContainer = document.getElementById("social-bar");
        if (!socialContainer) return;
        const socialScript = document.createElement("script");
        socialScript.src =
            "//pl27485813.profitableratecpm.com/fa/e5/be/fae5beaf948081b360878f46b4841b73.js";
        socialScript.async = true;
        socialContainer.appendChild(socialScript);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Top Banner Ad */}
            <div id="top-banner-ad" className="w-full flex justify-center my-4"></div>

            <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
                <h2 className="text-2xl font-bold mb-6">Free Courses</h2>

                {/* Category Tabs */}
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 mb-6 items-center">
                    {visibleCategories.map((cat, index) => (
                        <button
                            key={index}
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


                {/* Search Bar */}
                <div className="relative flex items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 pl-10 w-full rounded shadow-sm focus:outline-none"
                    />
                    <button
                        onClick={() => setSearch(search)}
                        className="absolute left-3 text-gray-500 hover:text-gray-700"
                    >
                        🔍
                    </button>
                </div>

                {/* Courses Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <div
                                key={course.id}
                                className="p-4 border rounded-lg shadow hover:shadow-xl transition relative bg-white"
                            >
                                {/* Date badge */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {getDateLabel(course.createdAt)}
                                </div>

                                {course.imageUrl && (
                                    <img
                                        src={course.imageUrl}
                                        alt={course.title}
                                        className="w-full h-40 object-cover rounded mb-3"
                                    />
                                )}
                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                <p className="text-gray-600 text-sm">{course.description}</p>
                                <p className="text-xs mt-1 text-gray-500 italic">
                                    {course.category}
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-2 mt-3">
                                    <a
                                        href={course.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                                    >
                                        Enroll Now
                                    </a>
                                    <a
                                        href="https://www.profitableratecpm.com/hpppsb5n7r?key=9dfa5af7ea37a41696d231fc108bdbed"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                                    >
                                        Sponsor
                                    </a>
                                </div>

                                {/* Inline Banner Ad */}
                                <div className="w-full flex justify-center my-4">
                                    <div className="w-full max-w-sm flex justify-center">
                                        <script
                                            type="text/javascript"
                                            dangerouslySetInnerHTML={{
                                                __html: `
                          atOptions = {
                            'key' : 'cb0a8735930d31fbf1dcbf5f5a089bed',
                            'format' : 'iframe',
                            'height' : 50,
                            'width' : 320,
                            'params' : {}
                          };
                        `
                                            }}
                                        />
                                        <script
                                            type="text/javascript"
                                            src="//www.highperformanceformat.com/cb0a8735930d31fbf1dcbf5f5a089bed/invoke.js"
                                        ></script>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-10 animate-pulse">
                        <h3 className="text-lg font-semibold text-gray-700">
                            ❌ No courses found
                        </h3>
                        {suggestions.length > 0 && (
                            <div className="mt-4">
                                <p className="text-gray-600">Did you mean:</p>
                                <div className="flex flex-wrap justify-center gap-3 mt-3">
                                    {suggestions.map((s) => (
                                        <span
                                            key={s.id}
                                            onClick={() => setSearch(s.title)}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200"
                                        >
                                            {s.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Social Bar */}
            <div id="social-bar" className="w-full flex justify-center mt-4 mb-2"></div>

            {/* Bottom Banner Ad */}
            <div className="w-full flex justify-center mt-2 mb-4">
                <script
                    async
                    data-cfasync="false"
                    src="//pl27485819.profitableratecpm.com/eb5de8b2878b13d29759ac560b672011/invoke.js"
                ></script>
                <div id="container-eb5de8b2878b13d29759ac560b672011"></div>
            </div>
        </div>
    );
}

export default Courses;
