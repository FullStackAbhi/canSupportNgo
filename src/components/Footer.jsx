import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  

  return (
    <footer ref={footerRef} className="w-full bg-black py-20 px-10 md:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="footer-item col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-6">CanSupport</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Changing the world one story at a time. Join our community to build a transparent future for education and healthcare.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-item">
          <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Explore</h3>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li className="hover:text-blue-500 transition-colors cursor-pointer text-white/70">Our Campaigns</li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer text-white/70">Volunteer Hub</li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer text-white/70">Impact Reports</li>
          </ul>
        </div>

        {/* Socials */}
        <div className="footer-item">
          <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Connect</h3>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li className="hover:text-blue-500 transition-colors cursor-pointer text-white/70">YouTube</li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer text-white/70">Instagram</li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer text-white/70">Twitter</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-item">
          <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h3>
          <div className="flex items-center border-b border-white/20 py-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent border-none text-white w-full focus:outline-none placeholder:text-gray-600"
            />
            <button className="text-blue-500 font-bold ml-2">→</button>
          </div>
        </div>

      </div>

      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
        <p className="footer-item">© 2026 ChotuStoryTime. Built for the Future.</p>
        <div className="flex gap-8 mt-4 md:mt-0 footer-item">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;