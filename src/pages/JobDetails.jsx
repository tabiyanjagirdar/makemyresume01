// src/pages/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet";
import Ad300x250 from "../components/Ad300x250";
import { FaWhatsapp } from "react-icons/fa";
import ScrollAd from "../components/ScrollAd";
import applyNowAd from '../assets/applynowad.png';


export default function JobDetails() {
    const { slug } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch job data
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

    // Load native ad after component is mounted
    useEffect(() => {
        const containerId = "container-eb5de8b2878b13d29759ac560b672011";
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clear previous content
        container.innerHTML = "";

        // Append script
        const script = document.createElement("script");
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.src =
            "//pl27485819.revenuecpmgate.com/eb5de8b2878b13d29759ac560b672011/invoke.js";

        container.appendChild(script);

        return () => {
            container.innerHTML = "";
        };
    }, [job]); // depend on job to ensure div exists

    if (loading)
        return (
            <div className="p-8 text-center text-gray-500 animate-pulse">
                Loading job details...
            </div>
        );
    if (!job)
        return (
            <div className="p-8 text-center text-red-500">Job not found.</div>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Helmet>
                <title>{job.role} at {job.company} | MakeMyResume</title>
                <meta name="description" content={job.description.slice(0, 160)} />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "JobPosting",
                        title: job.role,
                        description: job.description,
                        identifier: {
                            "@type": "PropertyValue",
                            name: job.company,
                            value: job.id,
                        },
                        datePosted: job.createdAt?.toDate
                            ? job.createdAt.toDate().toISOString()
                            : new Date().toISOString(),
                        hiringOrganization: {
                            "@type": "Organization",
                            name: job.company,
                            sameAs: "https://makemyresume.net", // change if you have a company link
                            logo: job.imageUrl || "https://makemyresume.net/default-logo.png",
                        },
                        jobLocation: {
                            "@type": "Place",
                            address: {
                                "@type": "PostalAddress",
                                addressLocality: job.location || "India",
                                addressCountry: "IN",
                            },
                        },
                        employmentType: "FULL_TIME",
                        validThrough: new Date(
                            Date.now() + 1000 * 60 * 60 * 24 * 30
                        ).toISOString(), // 30 days validity
                        applicantLocationRequirements: {
                            "@type": "Country",
                            name: "India",
                        },
                    })}
                </script>
            </Helmet>


            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 space-y-6">
                {/* Company Logo */}
                {job.imageUrl && (
                    <img
                        src={job.imageUrl}
                        alt={`${job.role} at ${job.company}`}
                        className="w-full h-56 object-contain mb-4 rounded-xl shadow-sm"
                    />
                )}

                {/* Job Title & Company */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-blue-700">{job.role}</h1>
                    <h2 className="text-xl text-gray-700">{job.company}</h2>
                    <p className="text-sm text-gray-500">
                        {job.location} • {job.category}
                    </p>
                </div>

                <div className="flex justify-center mb-6">
                    <div className="bg-white shadow-md rounded-2xl p-3 border border-gray-200">

                        <a href="https://www.revenuecpmgate.com/hpppsb5n7r?key=9dfa5af7ea37a41696d231fc108bdbed">
                            <img
                                src={applyNowAd}
                                alt="Advertisement"
                                className="rounded-2xl"
                            />
                        </a>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Advertisement
                        </p>
                    </div>
                </div>

                <div className="flex justify-center align-middle text-3xl text-red-500 font-bold">Apply Link in bottom</div>

                {/* Top Banner Ad */}
                <div className="flex justify-center mb-6">
                    <div className="bg-white shadow-md rounded-2xl p-3 border border-gray-200">
                        <Ad300x250 />
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Advertisement
                        </p>
                    </div>
                </div>

                {/* Job Description */}
                <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-500 shadow-sm prose max-w-none text-gray-800 whitespace-pre-line">
                    <h3 className="text-xl font-semibold text-purple-600 mb-2">
                        Job Description
                    </h3>
                    {job.description}
                </div>

                {/* Native Ad */}
                <div className="bg-green-50 border border-green-200 rounded-lg shadow p-4 mt-10 text-center">
                    <p className="text-xs uppercase font-semibold text-green-700 mb-2">
                        Sponsored
                    </p>
                    <div
                        id="container-eb5de8b2878b13d29759ac560b672011"
                        className="flex justify-center w-full max-w-md mx-auto"
                    />
                    <p className="text-sm text-green-700 mt-2">
                        🔔 Don’t miss these exclusive offers
                    </p>
                </div>

                {/* Apply / Back Buttons */}
                <div className="flex flex-col md:flex-row gap-4">
                    <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all font-semibold shadow-md"
                    >
                        Apply
                    </a>
                    <Link
                        to="/jobs"
                        className="flex-1 text-center px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition-all font-semibold shadow-md"
                    >
                        Back to Jobs
                    </Link>
                </div>

                {/* WhatsApp Notifications */}
                <div className="text-center mt-6">
                    <a
                        href="https://chat.whatsapp.com/GwPmoYzo5Qh7OUitJjGX4g"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg space-x-2"
                    >
                        <FaWhatsapp className="w-5 h-5" />
                        <span>Job Notifications</span>
                    </a>
                </div>

                <ScrollAd />

            </div>
        </div>
    );
}
