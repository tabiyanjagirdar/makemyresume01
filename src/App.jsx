import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Analytics } from "@vercel/analytics/react"; // ✅ Keep Analytics
import Services from "./Services"; // ✅ Keep Services

import AboutUs from "./AboutUs";
import CompanySlider from "./CompanySlider";
import ResourceCards from "./ResourceCards";
import HeroSection from "./HeroSection";
import Courses from "./Courses"; // Public courses page
import PostCourse from "./PostCourse"; // Admin course posting page
import resumebro from "./assets/resumebro.png";

import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import AdminJobs from "./pages/AdminJobs"; // ✅ Admin job posting page
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col scroll-smooth bg-white text-gray-900">
        {/* Header */}
        <header className="w-full shadow-lg bg-white relative">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/">
              <img

                src={resumebro}
                alt="Make My Resume Logo"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-4 items-center">
              <Link
                to="/about"
                className="text-sm md:text-base border border-gray-700 text-gray-700 px-3 py-1 rounded-full hover:text-white hover:bg-black transition duration-300"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-sm md:text-base border border-gray-700 text-gray-700 px-3 py-1 rounded-full hover:text-white hover:bg-black transition duration-300"
              >
                Contact Us
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-black focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-300 absolute w-full top-full left-0 z-10 flex flex-col items-center py-4 space-y-4 text-gray-900">
              <Link
                to="/about"
                className="border border-gray-700 px-4 py-1 rounded-full hover:text-white hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="border border-gray-700 px-4 py-1 rounded-full hover:text-white hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          )}
        </header>

        {/* Free Courses, Job Updates & Jobs Buttons */}
        <div className="flex justify-center gap-4 py-3 flex-wrap">
          <Link
            to="/courses"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Free Courses
          </Link>
          <a
            href="https://chat.whatsapp.com/GwPmoYzo5Qh7OUitJjGX4g"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-green-700 transition"
          >
            Job Updates
          </a>
          <Link
            to="/jobs"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-purple-700 transition"
          >
            Jobs
          </Link>
        </div>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <CompanySlider />
                  <ResourceCards />
                  <Services /> {/* ✅ Added Services to homepage */}
                  <AboutUs />
                </>
              }
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admin" element={<PostCourse />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:slug" element={<JobDetails />} />
            <Route path="/adminjobs" element={<AdminJobs />} />{/* ✅ Admin Job Posting */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* ← add this */}
            <Route
              path="/contact"
              element={
                <section className="w-full px-4 py-12 flex justify-center items-center">
                  <div className="bg-white border border-gray-300 rounded-lg p-6 sm:p-8 max-w-4xl w-full text-center space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold">Contact Us</h2>
                    <div className="flex justify-center items-center gap-8 overflow-x-auto whitespace-nowrap pt-6">
                      <a
                        href="https://wa.me/919449723865"
                        className="p-3 rounded-full border-2 border-black text-green-600 hover:scale-110 transition"
                      >
                        <FaWhatsapp className="text-3xl" />
                      </a>
                      <a
                        href="https://www.instagram.com/makemyresume.help?igsh=eHIyeWZxcTZmcWl2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border-2 border-black text-pink-600 hover:scale-110 transition"
                      >
                        <FaInstagram className="text-3xl" />
                      </a>
                      <a
                        href="mailto:studybrokud@example.com"
                        className="p-3 rounded-full border-2 border-black text-blue-600 hover:scale-110 transition"
                      >
                        <FaEnvelope className="text-3xl" />
                      </a>
                    </div>
                  </div>
                </section>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="w-full bg-black text-white py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <a href="/privacy-policy" className="text-sm text-gray-600 hover:underline">
              Privacy Policy
            </a>
            <p className="text-sm">
              © {new Date().getFullYear()} MakeMyResume. All rights reserved.
            </p>

          </div>
        </footer>

        {/* Analytics */}
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
