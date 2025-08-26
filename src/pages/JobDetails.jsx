// src/pages/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet";
import EzoicAd from "../components/EzoicAd";
import EzoicShowAds from "../components/EzoicShowAds";

export default function JobDetails() {
    const { slug } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    const placementIds = [101, 102, 103];

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const snap = await getDocs(collection(db, "jobs"));
                const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                const found = list.find((j) => j.slug === slug);
                setJob(found || null);
            } catch (err) {
                console.error("Error fetching job:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [slug]);

    useEffect(() => {
        if (!loading && job && window.ezstandalone?.cmd) {
            window.ezstandalone.cmd.push(() => {
                window.ezstandalone.showAds(...placementIds);
            });
        }
    }, [loading, job, slug]);

    if (loading) return <div className="p-8 text-center">Loading job details...</div>;
    if (!job) return <div className="p-8 text-center">Job not found.</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Helmet>
                <title>{job.role} at {job.company} | MakeMyResume</title>
                <meta
                    name="description"
                    content={job.description.slice(0, 160)}
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "JobPosting",
                        "title": job.role,
                        "hiringOrganization": { "@type": "Organization", "name": job.company },
                        "jobLocation": {
                            "@type": "Place",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": job.location || "",
                                "addressCountry": "IN"
                            }
                        },
                        "description": job.description,
                        "datePosted": job.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
                        "validThrough": job.expiryDate || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
                    })}
                </script>
            </Helmet>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">

                {job.imageUrl && (
                    <img
                        src={job.imageUrl}
                        alt={`${job.role} at ${job.company} in ${job.location}`}
                        className="w-full h-48 object-contain mb-4 rounded"
                    />
                )}

                <h1 className="text-3xl font-bold text-blue-700">{job.role}</h1>
                <h2 className="text-xl text-gray-700 mt-1">{job.company}</h2>
                <p className="text-sm text-gray-500 mb-3">{job.location} • {job.category}</p>

                <div className="w-full flex justify-center my-4">
                    <EzoicAd id={101} />
                </div>

                <div id="job-description-container" className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-purple-600">Job Description</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm prose max-w-none text-gray-800 whitespace-pre-line animate-fadeIn">
                        {job.description}
                    </div>
                </div>

                <div className="w-full flex justify-center my-4">
                    <EzoicAd id={102} />
                </div>

                <div className="flex gap-3 mb-4">
                    <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all"
                    >
                        Apply
                    </a>
                    <Link
                        to="/jobs"
                        className="flex-1 text-center px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-all"
                    >
                        Back to Jobs
                    </Link>
                </div>

                <div className="w-full flex justify-center my-4">
                    <EzoicAd id={103} />
                </div>

                <div className="max-w-3xl mx-auto mt-6 text-center">
                    <a
                        href="https://chat.whatsapp.com/GwPmoYzo5Qh7OUitJjGX4g"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
                    >
                        Job Notifications
                    </a>
                </div>

                <EzoicShowAds ids={placementIds} />
            </div>
        </div>
    );
}
