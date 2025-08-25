import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import EzoicAd from "../components/EzoicAd";
import EzoicShowAds from "../components/EzoicShowAds";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const categories = ["All", "IT", "Non-IT", "Govt"];

    const pagePlacementIds = [201, 202, 203, 204];

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

            // Initial Ezoic ad load
            window.ezstandalone?.cmd?.push(() => window.ezstandalone.showAds(...pagePlacementIds));
        };
        fetchJobs();
    }, []);

    // Refresh Ezoic ads whenever search/category changes
    useEffect(() => {
        window.ezstandalone?.cmd?.push(() => window.ezstandalone.showAds(...pagePlacementIds));
    }, [category, search]);

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
            <div className="w-full flex justify-center mb-6">
                <EzoicAd id={201} />
            </div>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Open Jobs</h2>

                <div className="flex gap-3 flex-wrap mb-6 items-center">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`px-4 py-2 border rounded text-sm ${category === c
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700"
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
                                        <p className="text-sm mt-2 text-gray-700 line-clamp-3">
                                            {job.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Link
                                        to={`/jobs/${job.slug}`}
                                        className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        View Details
                                    </Link>
                                </div>

                                {(idx + 1) % 3 === 0 && (
                                    <div className="col-span-full flex justify-center my-2">
                                        <EzoicAd id={202} />
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-gray-600">Loading....</div>
                )}
            </div>

            <div className="w-full flex justify-center mt-6">
                <EzoicAd id={203} />
            </div>

            <div className="w-full flex justify-center mt-6">
                <EzoicAd id={204} />
            </div>

            <EzoicShowAds ids={pagePlacementIds} />
        </div>
    );
}
