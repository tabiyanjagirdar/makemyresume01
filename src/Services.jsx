import React from "react";

const Services = () => {
    return (
        <section className="w-full px-4 py-14 bg-white text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold leading-tight mb-6 text-black text-center px-4">
                Our Professional <span className="underline">Resume Services</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* ₹49 Plan */}
                <div className="bg-white border border-black rounded-3xl p-6 sm:p-8 transition-transform hover:scale-105 duration-300">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
                        🍳 Egg Rice Plan – <span className="text-green-600 font-bold">₹49 Only</span>
                    </h3>

                    <ul className="text-sm sm:text-base text-black space-y-3 mb-6 font-medium">
                        <li>✅ ATS-Friendly Resume (Only)</li>
                        <li>❌ No Extra Courses / Calls</li>
                        <li>⚡ Delivered in 24 Hrs via WhatsApp</li>
                    </ul>
                    <a
                        href="https://wa.me/919449723865?text=Hi%20I%20want%20to%20opt%20for%20the%20₹49%20ATS%20resume%20only%20service"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full sm:w-auto px-6 py-3 bg-black text-white hover:bg-gray-900 rounded-full font-semibold tracking-wide"
                    >
                        🚀 Order via WhatsApp
                    </a>
                </div>

                {/* ₹99 Plan */}
                <div className="bg-white border border-black rounded-3xl p-6 sm:p-8 transition-transform hover:scale-105 duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-black">
                        🍕 Pizza Plan – <span className="text-red-500 font-bold">₹99 Only</span>
                    </h3>

                    <ul className="text-sm sm:text-base text-black space-y-3 mb-6 font-medium">
                        <li>✅ ATS-Friendly Resume + Premium Design</li>
                        <li>🎓 2 Udemy Certificate Courses</li>
                        <li>🧠 1-on-1 Career Consultation</li>
                    </ul>
                    <a
                        href="https://wa.me/919449723865?text=Hi%20I%20am%20interested%20in%20the%20₹99%20resume%20offer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full sm:w-auto px-6 py-3 bg-black text-white hover:bg-gray-900 rounded-full font-semibold tracking-wide"
                    >
                        💬 DM Us on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Services;
