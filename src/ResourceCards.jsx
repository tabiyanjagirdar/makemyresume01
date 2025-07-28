import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import Tabiyan from './assets/Tabiyan.jpg';
import cognizant from './assets/cognizant.png';

import pyspider from './assets/pyspider.png';
import Chetan from './assets/Chetan.jpg';
import stand from './assets/stand.png';
import veeru from './assets/veeru.jpg';


const resourcePeople = [
    {
        name: "Tabiyan Jagirdar",
        image: Tabiyan,
        companyLogo: cognizant,
        linkedin: "https://in.linkedin.com/in/tabiyanjagirdar",
    },
    {

        name: "Ravi Kumar",
        image: "https://via.placeholder.com/150",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Cognizant_logo_2022.svg/512px-Cognizant_logo_2022.svg.png",
        linkedin: "https://www.linkedin.com/in/ravi-kumar",
    },
    {
        name: "Priya Desai",
        image: "https://via.placeholder.com/150",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/LTI_Mindtree_logo.svg/512px-LTI_Mindtree_logo.svg.png",
        linkedin: "https://www.linkedin.com/in/priya-desai",

        name: "Chetan Kudla",
        image: Chetan,
        companyLogo: pyspider,
        linkedin: "https://www.linkedin.com/in/chetan-kudla-56b989324",
    },
    {
        name: "Veeranagouda Patil",
        image: veeru,
        companyLogo: stand,
        linkedin: "https://www.linkedin.com/in/veeranagouda-patil-529233326",

    },
];

const ResourceCards = () => {
    return (
        <section className="py-14 bg-white">
            <h2 className="text-4xl font-extrabold text-center text-black mb-12">College Mentors</h2>
            <div className="flex flex-wrap justify-center gap-8 px-4">
                {resourcePeople.map((person, index) => (
                    <div
                        key={index}
                        className="w-72 bg-white border border-black rounded-2xl p-6 text-center transition-all duration-300"
                    >
                        <img
                            src={person.image}
                            alt={person.name}
                            className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border border-black"
                        />
                        <h3 className="text-xl font-semibold text-black mb-1">{person.name}</h3>

                        <div className="flex justify-center mt-2 mb-4">
                            <img
                                src={person.companyLogo}
                                alt="Company Logo"
                                className="w-16 h-auto object-contain"
                            />
                        </div>

                        <a
                            href={person.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white font-medium rounded-md transition"
                        >
                            <FaLinkedin className="text-lg" />
                            LinkedIn
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ResourceCards;
