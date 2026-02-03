
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection.tsx';

const blogPosts = [
  {
    title: "The Rise of .AI: Why Tech Companies are Switching",
    category: "Market Trends",
    date: "May 12, 2024",
    author: "Elena Vance",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=500",
    excerpt: "With artificial intelligence dominating the headlines, the .ai extension has become the ultimate signal of innovation."
  },
  {
    title: "10 Principles of a Highly Brandable Domain Name",
    category: "Guides",
    date: "April 28, 2024",
    author: "Marcus Aurelius",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=500",
    excerpt: "Short, memorable, and phonetic. We break down the science behind names that stick."
  },
  {
    title: "Future-Proofing Your Digital Identity in Web3",
    category: "Blockchain",
    date: "April 15, 2024",
    author: "Jordan Miller",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800&h=500",
    excerpt: "How ENS and decentralized domains are changing the way we interact with the internet foundation."
  },
  {
    title: "Premium Domains as an Alternative Investment Class",
    category: "Finance",
    date: "March 22, 2024",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800&h=500",
    excerpt: "Why the smart money is moving into digital assets, and how you can participate in this growing market."
  }
];

const Blog: React.FC = () => {
  const MotionDiv = (motion as any).div;

  return (
    <div className="pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4 block">Knowledge Base</span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">INSIGHTS & <br /> TRENDS</h1>
          </MotionDiv>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..."
              className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Featured Post */}
        <AnimatedSection className="mb-20">
          <div className="relative rounded-[3rem] overflow-hidden group cursor-pointer h-[500px]">
            <img 
              src={blogPosts[0].image} 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              alt="Featured Post"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
              <span className="px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-bold uppercase w-fit mb-4">{blogPosts[0].category}</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 group-hover:text-indigo-400 transition-colors">{blogPosts[0].title}</h2>
              <div className="flex items-center space-x-6 text-zinc-400 text-sm">
                <span className="flex items-center"><User size={14} className="mr-2" /> {blogPosts[0].author}</span>
                <span className="flex items-center"><Calendar size={14} className="mr-2" /> {blogPosts[0].date}</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="group flex flex-col bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/30 transition-all">
                <div className="h-64 overflow-hidden">
                  <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-500 mb-4">{post.category}</span>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight">{post.title}</h3>
                  <p className="text-zinc-500 text-sm mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-zinc-600">{post.date}</span>
                    <button className="flex items-center text-xs font-bold text-white group-hover:text-indigo-500 transition-colors">
                      Read More <ArrowRight size={14} className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Newsletter CTA */}
        <AnimatedSection className="mt-40 p-20 rounded-[3.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Never miss a drop.</h2>
          <p className="text-zinc-500 mb-10 max-w-md mx-auto">Get notified about new premium domain listings and market reports directly in your inbox.</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-grow bg-white/5 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-500 transition-colors">
              Subscribe
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Blog;
