import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function JobDetails() {
    const { slug } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

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

    // Function to safely inject a script
    const loadScript = (src, id, parent = document.body) => {
        if (document.getElementById(id)) return;
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.async = true;
        parent.appendChild(script);
    };

    useEffect(() => {
        if (!job) return;

        // 1️⃣ Inline Banner Ad (above job description)
        const inlineAdContainer = document.getElementById("inline-job-ad");
        if (inlineAdContainer && !document.getElementById("inline-job-ad-script")) {
            const scriptInline = document.createElement("script");
            scriptInline.id = "inline-job-ad-script";
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
            scriptExternal.src = "//www.highperformanceformat.com/cb0a8735930d31fbf1dcbf5f5a089bed/invoke.js";
            inlineAdContainer.appendChild(scriptInline);
            inlineAdContainer.appendChild(scriptExternal);
        }

        // 2️⃣ Native Banner Ad
        const nativeAdContainer = document.getElementById("container-eb5de8b2878b13d29759ac560b672011");
        if (nativeAdContainer && !document.getElementById("native-banner-ad-script")) {
            loadScript("//pl27485819.profitableratecpm.com/eb5de8b2878b13d29759ac560b672011/invoke.js", "native-banner-ad-script", nativeAdContainer);
        }

        // 3️⃣ Social Bar Ad
        const socialBarContainer = document.getElementById("social-bar");
        if (socialBarContainer && !document.getElementById("social-bar-ad")) {
            loadScript("//pl27485813.profitableratecpm.com/fa/e5/be/fae5beaf948081b360878f46b4841b73.js", "social-bar-ad", socialBarContainer);
        }

    }, [job]);

    if (loading) return <div className="p-8 text-center">Loading job details...</div>;
    if (!job) return <div className="p-8 text-center">Job not found.</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">

                {/* Job Image */}
                {job.imageUrl && (
                    <img src={job.imageUrl} alt={job.company} className="w-full h-48 object-contain mb-4 rounded" />
                )}

                {/* Job Info */}
                <h1 className="text-3xl font-bold text-blue-700">{job.role}</h1>
                <h2 className="text-xl text-gray-700 mt-1">{job.company}</h2>
                <p className="text-sm text-gray-500 mb-3">{job.location} • {job.category}</p>

                {/* Inline Ad */}
                <div id="inline-job-ad" className="mb-4 flex justify-center"></div>

                {/* Job Description */}
                <div id="job-description-container" className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-purple-600">Job Description</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm prose max-w-none text-gray-800 whitespace-pre-line animate-fadeIn">
                        {job.description}
                    </div>
                </div>

                {/* Native Banner Ad */}
                <div id="container-eb5de8b2878b13d29759ac560b672011" className="mb-6 flex justify-center"></div>

                {/* Buttons */}
                <div className="flex gap-3 mb-4">
                    <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all">Apply</a>
                    <Link to="/jobs" className="flex-1 text-center px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition-all">Back to Jobs</Link>
                </div>

                {/* Social Bar */}
                <div id="social-bar" className="w-full flex justify-center mt-6"></div>
            </div>
        </div>
    );
}
