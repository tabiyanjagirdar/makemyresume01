import { useState } from 'react';
import Services from './Services';
import AboutUs from './AboutUs';
import CompanySlider from './CompanySlider';
import ResourceCards from './ResourceCards';
import HeroSection from './HeroSection';
import resumebro from './assets/resumebro.png';
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';

import { db, storage } from './firebase'; // Correct import
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !file) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const storageRef = ref(storage, `resumes/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "resume_uploads"), {
        name,
        phone,
        fileURL,
        timestamp: new Date()
      });

      setUploadStatus('Uploaded successfully!');
      setName('');
      setPhone('');
      setFile(null);
    } catch (error) {
      setUploadStatus('Upload failed.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col scroll-smooth bg-white text-gray-900">
      {/* Header */}
      <header className="w-full shadow-lg relative bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img
            src={resumebro}
            alt="Make My Resume Logo"
            className="h-12 md:h-16 w-auto object-contain"
          />

          <nav className="hidden md:flex space-x-4 items-center">
            <a href="#about" className="text-sm md:text-base border border-gray-700 text-gray-700 px-3 py-1 rounded-full hover:text-white hover:bg-black transition duration-300">
              About Us
            </a>
            <a href="#contact" className="text-sm md:text-base border border-gray-700 text-gray-700 px-3 py-1 rounded-full hover:text-white hover:bg-black transition duration-300">
              Contact Us
            </a>
            <a
              href="https://studybrojobsupdates.blogspot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full text-sm sm:text-base transition duration-300"
            >
              <FaWhatsapp className="text-lg" />
              Job Updates
            </a>
          </nav>

          <button
            className="md:hidden text-black focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-300 absolute w-full top-full left-0 z-10 flex flex-col items-center py-4 space-y-4 text-gray-900">
            <a href="#about" className="border border-gray-700 px-4 py-1 rounded-full hover:text-white hover:bg-gray-800">About Us</a>
            <a href="#contact" className="border border-gray-700 px-4 py-1 rounded-full hover:text-white hover:bg-gray-800">Contact Us</a>
            <a
              href="https://chat.whatsapp.com/GwPmoYzo5Qh7OUitJjGX4g"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm sm:text-base transition duration-300"
            >
              <FaWhatsapp className="text-lg" />
              Job Updates
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Services */}
      <Services />
      <CompanySlider />
      <ResourceCards />
      <AboutUs />

      {/* Contact Section */}
      <section id="contact" className="w-full px-4 py-12 flex justify-center items-center bg-white text-gray-900">
        <div className="bg-white border border-gray-300 rounded-lg p-6 sm:p-8 max-w-4xl w-full text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Contact Us</h2>



          {/* Social Icons */}
          <div className="flex justify-center items-center gap-8 overflow-x-auto whitespace-nowrap pt-6">
            <a href="https://wa.me/919449723865" className="p-3 rounded-full border-2 border-black text-green-600 hover:scale-110 transition">
              <FaWhatsapp className="text-3xl" />
            </a>
            <a href="https://www.instagram.com/makemyresume.help?igsh=eHIyeWZxcTZmcWl2" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border-2 border-black text-pink-600 hover:scale-110 transition">
              <FaInstagram className="text-3xl" />
            </a>
            <a href="mailto:studybrokud@example.com" className="p-3 rounded-full border-2 border-black text-blue-600 hover:scale-110 transition">
              <FaEnvelope className="text-3xl" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} MakeMyResume. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
