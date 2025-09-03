import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet";
import ScrollAd from "../components/ScrollAd";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const categories = ["All", "IT", "Non-IT", "Govt"];

    const nativeAdRef = useRef(null);
    const sticky468TopRef = useRef(null); // Top 468x60 ad
    const sticky468BottomRef = useRef(null); // Bottom 468x60 ad

    const loadScript = (src) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        script.async = true;
        return script;
    };

    // Native ad
    useEffect(() => {
        if (!nativeAdRef.current) return;
        nativeAdRef.current.innerHTML =
            '<div id="container-eb5de8b2878b13d29759ac560b672011" style="width:100%;max-width:600px;margin:0 auto"></div>';
        const script = loadScript(
            "//pl27485819.revenuecpmgate.com/eb5de8b2878b13d29759ac560b672011/invoke.js"
        );
        script.setAttribute("data-cfasync", "false");
        nativeAdRef.current.appendChild(script);
    }, []);

    // Top 468x60 ad
    useEffect(() => {
        if (!sticky468TopRef.current) return;
        sticky468TopRef.current.innerHTML =
            '<div id="container-sticky-top-468" style="width:468px;height:60px;margin:0 auto"></div>';

        window.atOptions = {
            key: "c0b964be2f9fff8857c0f9d347c60372",
            format: "iframe",
            height: 60,
            width: 468,
            params: {},
        };

        const script = loadScript(
            "//www.highperformanceformat.com/c0b964be2f9fff8857c0f9d347c60372/invoke.js"
        );
        script.setAttribute("data-cfasync", "false");
        document.getElementById("container-sticky-top-468")?.appendChild(script);
    }, []);

    // Bottom sticky 468x60 ad
    useEffect(() => {
        if (!sticky468BottomRef.current) return;
        sticky468BottomRef.current.innerHTML =
            '<div id="container-sticky-bottom-468" style="width:468px;height:60px;margin:0 auto"></div>';

        window.atOptions = {
            key: "c0b964be2f9fff8857c0f9d347c60372",
            format: "iframe",
            height: 60,
            width: 468,
            params: {},
        };

        const script = loadScript(
            "//www.highperformanceformat.com/c0b964be2f9fff8857c0f9d347c60372/invoke.js"
        );
        script.setAttribute("data-cfasync", "false");
        document.getElementById("container-sticky-bottom-468")?.appendChild(script);
    }, []);

    // Fetch jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const snap = await getDocs(collection(db, "jobs"));
                const list = snap.docs
                    .map((d) => ({ id: d.id, ...d.data() }))
                    .sort((a, b) => {
                        const A = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                        const B = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                        return B - A;
                    });
                setJobs(list);
            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const matchesCategory = category === "All" || job.category === category;
        const q = search.trim().toLowerCase();
        const matchesSearch =
            !q ||
            (job.company && job.company.toLowerCase().includes(q)) ||
            (job.role && job.role.toLowerCase().includes(q)) ||
            (job.description && job.description.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative pb-32">
            <Helmet>
                <title>Open Jobs | MakeMyResume</title>
                <meta
                    name="description"
                    content="Browse latest IT, Non-IT, and Govt jobs. Find company details, job roles, locations, and apply online."
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: filteredJobs.map((job, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            url: `https://makemyresume.net/jobs/${job.slug}`,
                            name: `${job.role} at ${job.company}`,
                        })),
                    })}
                </script>
            </Helmet>


            <div className="max-w-6xl mx-auto p-6">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-tight">
                    🔥 Open Jobs
                </h2>

                {/* Top 468x60 ad */}
                {/* <div ref={sticky468TopRef} className="mb-6 flex justify-center"></div> */}

                {/* Filters */}
                <div className="flex gap-3 flex-wrap mb-6 items-center">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-4 py-2 rounded-full shadow-sm text-sm font-medium transition ${category === c
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="🔎 Search by company, role or keywords..."
                        className="w-full border rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Jobs grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-5 flex flex-col h-full"
                        >
                            <div className="flex gap-4 items-start">
                                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                                    {job.imageUrl ? (
                                        <img
                                            src={job.imageUrl}
                                            alt={`${job.role} at ${job.company}`}
                                            className="object-contain w-full h-full"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400">No image</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800">
                                        {job.company}
                                    </h3>
                                    <p className="text-sm text-blue-600 font-medium">{job.role}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {job.location} • {job.category}
                                    </p>
                                    <p className="text-sm mt-2 text-gray-600 line-clamp-3">
                                        {job.description}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Link
                                    to={`/jobs/${job.slug}`}
                                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="text-center py-16 text-gray-600 animate-pulse">
                        Loading jobs...
                    </div>
                )}

                {/* Native ad */}
                <div className="bg-green-50 border border-green-200 rounded-lg shadow p-4 mt-10 text-center">
                    <p className="text-xs uppercase font-semibold text-green-700 mb-2">
                        Sponsored
                    </p>
                    <div ref={nativeAdRef} className="flex justify-center"></div>
                    <p className="text-sm text-green-700 mt-2">
                        🔔 Don’t miss these exclusive offers
                    </p>
                </div>
            </div>
            <ScrollAd />
            {/* Bottom sticky 468x60 ad */}
            <div
                ref={sticky468BottomRef}
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 9999,
                    width: "100%",
                    maxWidth: "468px",
                    padding: "0 6px",
                    boxSizing: "border-box",
                }}
            />
        </div>
    );
}
