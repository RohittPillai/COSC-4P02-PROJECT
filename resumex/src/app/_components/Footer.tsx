import { Facebook, Twitter, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">ResumeX</h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            ResumeX is an AI-powered resume builder designed to help you craft 
            professional, job-winning resumes effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-3">
            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="/resume-builder" className="hover:text-blue-400">Resume Builder</a></li>
            <li><a href="/templates" className="hover:text-blue-400">Templates</a></li>
            <li><a href="/pricing" className="hover:text-blue-400">Pricing</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>support@resumex.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>+1 (123) 456-7890</span>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="mt-6 flex gap-4">
            <a href="#" className="hover:text-blue-400"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="hover:text-blue-400"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="hover:text-blue-400"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-12 text-center border-t border-gray-700 pt-6 text-gray-500">
        © {new Date().getFullYear()} ResumeX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
