
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const MotionDiv = (motion as any).div;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Domains', path: '/search?q=trending' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <Globe className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white uppercase">EtherNames</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium tracking-wide hover:text-indigo-400 transition-colors ${
                location.pathname === link.path || 
                (link.name === 'Domains' && location.search.includes('q=trending')) ||
                (link.name === 'Analytics' && location.pathname.startsWith('/analytics'))
                  ? 'text-indigo-500' 
                  : 'text-zinc-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-indigo-500 hover:text-white transition-all duration-300">
            Sign In
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MotionDiv
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden bg-zinc-900 overflow-hidden"
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-indigo-400"
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-indigo-600 text-white w-full py-3 rounded-lg font-bold">
            Sign In
          </button>
        </div>
      </MotionDiv>
    </nav>
  );
};

export default Navbar;
