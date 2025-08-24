// src/pages/Jobs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SPONSOR_LINK =
    "https://www.profitableratecpm.com/hpppsb5n7r?key=9dfa5af7ea37a41696d231fc108bdbed";

// Helper to inject inline ads
function injectInlineAd(containerId, key = "cb0a8735930d31fbf1dcbf5f5a089bed") {
    const container = document.getElementById(containerId);
    if (!container || container.dataset.injected === "1") return;
    container.dataset.injected = "1";

    const scriptInline = document.createElement("script");
    scriptInline.type = "text/javascript";
    scriptInline.innerHTML = `
    atOptions = {
      'key' : '${key}',
      'format' : 'iframe',
      'height' : 50,
      'width' : 320,
      'params' : {}
    };
  `;

    const scriptExternal = document.createElement("script");
    scriptExternal.src = `//www.highperformanceformat.com/${key}/invoke.js`;
    scriptExternal.async = true;

    container.appendChild(scriptInline);
    container.appendChild(scriptExternal);
}

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const categories = ["All", "IT", "Non-IT", "Govt"];

    // Fetch jobs from Firestore
    useEffect(() => {
        const fetchJobs = async () => {
            const snap = await getDocs(collection(db, "jobs"));
            const list = snap.docs
                .map((d) => ({ id: d.id, ...d.data() }))
                .sort((a, b) => {
                    const A = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                    const B = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                    return B - A;
                });
            setJobs(list);
        };
        fetchJobs();
    }, []);

    // Inject ads dynamically
    useEffect(() => {
        // Top banner ad
        const topAdContainer = document.getElementById("top-banner-ad");
        if (topAdContainer && !document.getElementById("top-banner-ad-script")) {
            const scriptInline = document.createElement("script");
            scriptInline.type = "text/javascript";
            scriptInline.innerHTML = `
        atOptions = {
          'key' : '717b13bb1e5878f471b01b30a7ef293d',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;

            const scriptExternal = document.createElement("script");
            scriptExternal.src =
                "//www.highperformanceformat.com/717b13bb1e5878f471b01b30a7ef293d/invoke.js";
            scriptExternal.async = true;
            scriptExternal.id = "top-banner-ad-script";

            topAdContainer.appendChild(scriptInline);
            topAdContainer.appendChild(scriptExternal);
        }

        // Inline ads in grid
        const ids = Array.from(document.querySelectorAll("[data-inline-ad-id]")).map(
            (el) => el.getAttribute("data-inline-ad-id")
        );
        ids.forEach((id) => injectInlineAd(id));

        // Sticky mobile inline ad
        const stickyContainer = document.getElementById("sticky-inline-ad-bottom");
        if (stickyContainer && !stickyContainer.dataset.injected) {
            stickyContainer.dataset.injected = "1";
            const scriptInline = document.createElement("script");
            scriptInline.type = "text/javascript";
            scriptInline.innerHTML = `
        atOptions = {
          'key' : 'cb0a8735930d31fbf1dcbf5f5a089bed',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
            const scriptExternal = document.createElement("script");
            scriptExternal.src =
                "//www.highperformanceformat.com/cb0a8735930d31fbf1dcbf5f5a089bed/invoke.js";
            scriptExternal.async = true;
            stickyContainer.appendChild(scriptInline);
            stickyContainer.appendChild(scriptExternal);
        }

        // Native banner at bottom
        const nativeContainer = document.getElementById(
            "container-eb5de8b2878b13d29759ac560b672011"
        );
        if (nativeContainer && !document.getElementById("native-banner-ad-script")) {
            const script = document.createElement("script");
            script.async = true;
            script.src =
                "//pl27485819.profitableratecpm.com/eb5de8b2878b13d29759ac560b672011/invoke.js";
            script.id = "native-banner-ad-script";
            nativeContainer.appendChild(script);
        }

        // Social bar ad
        const socialBarContainer = document.getElementById("social-bar");
        if (socialBarContainer && !document.getElementById("social-bar-ad")) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src =
                "//pl27485813.profitableratecpm.com/fa/e5/be/fae5beaf948081b360878f46b4841b73.js";
            script.id = "social-bar-ad";
            script.async = true;
            socialBarContainer.appendChild(script);
        }
    }, [jobs, search, category]);

    // Filter jobs
    const filtered = jobs.filter((j) => {
        const matchesCategory = category === "All" || j.category === category;
        const q = search.trim().toLowerCase();
        const matchesSearch =
            !q ||
            (j.company && j.company.toLowerCase().includes(q)) ||
            (j.role && j.role.toLowerCase().includes(q)) ||
            (j.description && j.description.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6 relative">
            {/* Top banner ad */}
            <div id="top-banner-ad" className="w-full flex justify-center mb-6"></div>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Open Jobs</h2>

                <div className="flex gap-3 flex-wrap mb-6 items-center">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-4 py-2 border rounded text-sm ${category === c ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="mb-6">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by company, role or keywords..."
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((job, idx) => (
                        <React.Fragment key={job.id}>
                            <div className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
                                <div className="flex gap-4 items-start">
                                    <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                                        {job.imageUrl ? (
                                            <img
                                                src={job.imageUrl}
                                                alt={job.company}
                                                className="object-contain w-full h-full"
                                            />
                                        ) : (
                                            <div className="text-xs text-gray-400">No image</div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{job.company}</h3>
                                        <p className="text-sm text-gray-600">{job.role}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {job.location} • {job.category}
                                        </p>
                                        <p className="text-sm mt-2 text-gray-700 line-clamp-3">{job.description}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Link
                                        to={`/jobs/${job.slug}`}
                                        className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        View Details
                                    </Link>
                                    <a
                                        href={SPONSOR_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Sponsor
                                    </a>
                                </div>

                                {(idx + 1) % 3 === 0 && (
                                    <div
                                        className="col-span-full flex justify-center my-2"
                                        data-inline-ad-id={`inline-ad-${job.id}`}
                                        id={`inline-ad-${job.id}`}
                                    />
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-gray-600">Loading....</div>
                )}
            </div>

            {/* Social bar */}
            <div id="social-bar" className="w-full flex justify-center mt-6"></div>

            {/* Sticky mobile inline ad */}
            <div
                id="sticky-inline-ad-bottom"
                className="sm:hidden fixed bottom-0 left-0 w-full flex justify-center bg-white shadow-lg z-50"
            ></div>

            {/* Native banner at bottom */}
            <div
                id="container-eb5de8b2878b13d29759ac560b672011"
                className="w-full flex justify-center mt-6"
            ></div>
        </div>
    );
}
