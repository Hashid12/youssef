
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <Globe className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tighter text-white uppercase">EtherNames</span>
          </div>
          <p className="text-zinc-500 max-w-sm mb-8">
            Providing the foundation for the next generation of the web. 
            Secure, fast, and transparent domain management for everyone.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-indigo-600 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-indigo-600 transition-colors"><Github size={18} /></a>
            <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-indigo-600 transition-colors"><Linkedin size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Platform</h4>
          <ul className="space-y-4 text-zinc-500 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/search?q=trending" className="hover:text-white transition-colors">Domains</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-zinc-500 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Status</a></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-xs">
        <p>&copy; {new Date().getFullYear()} EtherNames. All rights reserved.</p>
        <p className="mt-2 md:mt-0 flex items-center"><Mail size={12} className="mr-1" /> domainerakheraz@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
