import React from 'react';

const AboutUs = () => {
    return (
        <section
            id="about"
            className="w-full px-4 py-14 flex justify-center items-center bg-white"
        >
            <div className="max-w-4xl w-full bg-white border border-black rounded-2xl p-6 sm:p-10 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-6">
                    About Us
                </h2>

                <p className="text-black text-base sm:text-lg leading-relaxed mb-4">
                    <strong className="text-red-600 font-bold">MakeMyResume</strong> is more than just a resume builder — it’s your gateway to career success.
                    We empower <span className="font-semibold">BCA</span> and <span className="font-semibold">B.Sc</span> graduates to build impactful, ATS-friendly resumes that get noticed by top recruiters.
                </p>

                <p className="text-black text-base sm:text-lg leading-relaxed mb-4">
                    Our strong network includes professionals from leading IT companies like
                    <span className="font-semibold text-gray-700"> TCS</span>,
                    <span className="font-semibold text-gray-700"> Wipro</span>,
                    <span className="font-semibold text-gray-700"> Cognizant</span>,
                    <span className="font-semibold text-gray-700"> Infosys</span>,
                    <span className="font-semibold text-gray-700"> Capgemini</span>,
                    <span className="font-semibold text-gray-700"> HCL</span>,
                    <span className="font-semibold text-gray-700"> LTIMindtree</span>,
                    <span className="font-semibold text-gray-700"> Tech Mahindra</span>, and more.
                </p>

                <p className="text-black text-base sm:text-lg leading-relaxed">
                    With guidance from industry insiders, we ensure your resume meets real-world expectations and helps you stand out in the hiring process.
                    <span className="text-black font-medium"> Let MakeMyResume be your trusted partner in launching a successful career.</span>
                </p>
            </div>
        </section>
    );
};

export default AboutUs;
