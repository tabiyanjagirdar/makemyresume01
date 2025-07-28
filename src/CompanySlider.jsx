import React from 'react';
import tcs from './assets/tcs.png';
import wipro from './assets/wipro.png';
import ltimindtree from './assets/ltimindtree.png';
import cognizant from './assets/cognizant.png';
import capgemini from './assets/capgemini.png';
import hcl from './assets/hcl.png';
import techmahindra from './assets/hcl.png';

const CompanySlider = () => {
    return (
        <>
            <div className="w-full overflow-hidden bg-black py-2">
                <style>
                    {`
      .marquee-track {
        display: flex;
        width: fit-content;
        animation: scrollMarquee 25s linear infinite;
      }

      @keyframes scrollMarquee {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      @media (max-width: 640px) {
        .marquee-track {
          animation-duration: 35s; /* Slower on mobile */
        }
      }
    `}
                </style>

                <div className="flex overflow-hidden whitespace-nowrap">
                    <div className="marquee-track">
                        {/* Repeat all items twice to avoid gaps */}
                        {[...Array(2)].map((_, loopIndex) => (
                            [
                                "🔥 Real advice from people who just cracked it — last semester.",
                                "🧠 Built by freshers, for freshers – we know the grind.",
                                "🚀 From college to corporate – make the jump confidently.",
                                "💡 Mentored by folks placed in TCS, Infosys, Wipro.",
                                "🎯 Resume tips that actually work – no fluff.",
                                "📈 Turn your degree into a job offer – fast.",
                                "✨ Crack aptitude, interviews, HR rounds."
                            ].map((text, index) => (
                                <span
                                    key={`${loopIndex}-${index}`}
                                    className="text-yellow-400 font-bold text-base sm:text-lg px-6"
                                >
                                    {text}
                                </span>
                            ))
                        ))}
                    </div>
                </div>
            </div>






            <div className="w-full overflow-hidden  py-6">
                {/* Inline style for keyframes */}
                <style>
                    {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
                </style>

                <div className="whitespace-nowrap flex gap-8 animate-[slide_10s_linear_infinite]">
                    {[tcs, wipro, techmahindra, ltimindtree, cognizant, capgemini, hcl, tcs, wipro, ltimindtree, cognizant, capgemini, hcl].map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt="company logo"
                            className="h-12 sm:h-16 object-contain"
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CompanySlider;
