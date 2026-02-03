
import React from 'react';
import { motion } from 'framer-motion';
// Added Globe to the imports from lucide-react
import { Target, Users, ShieldCheck, Zap, Globe } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection.tsx';

const About: React.FC = () => {
  const MotionDiv = (motion as any).div;

  return (
    <div className="pt-40 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-32">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
              REDEFINING <br /> THE <span className="text-zinc-500 italic">WEB'S</span> FOUNDATION
            </h1>
            <p className="text-zinc-500 text-xl max-w-2xl mx-auto leading-relaxed">
              We believe every great idea deserves a premium home. EtherNames was founded to bridge the gap between visionaries and their digital identities.
            </p>
          </MotionDiv>
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40">
          <AnimatedSection className="p-12 rounded-[3rem] bg-zinc-900/30 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target size={180} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-zinc-500 leading-relaxed mb-8">
              To curate and provide the world's most brandable domain names while ensuring a seamless, secure, and transparent transfer process for our elite clientele.
            </p>
            <div className="flex items-center space-x-2 text-indigo-500 font-bold">
              <span>Integrity</span>
              <span className="w-1 h-1 bg-zinc-700 rounded-full" />
              <span>Speed</span>
              <span className="w-1 h-1 bg-zinc-700 rounded-full" />
              <span>Innovation</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="p-12 rounded-[3rem] bg-indigo-600 relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users size={180} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">Elite Network</h3>
            <p className="text-indigo-100 leading-relaxed mb-8 opacity-80">
              With a network of verified brokers and industry veterans, we offer exclusive access to "off-market" assets that you won't find on any public registrar.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-zinc-100 transition-colors">
              Meet the Team
            </button>
          </AnimatedSection>
        </div>

        {/* Stats / Why Us */}
        <AnimatedSection className="mb-40">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-4">Why Global Brands Choose Us</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: <ShieldCheck className="text-indigo-500 mb-6" size={40} />, title: "Full Escrow Protection", desc: "Every transaction is secured through premier third-party escrow services, ensuring peace of mind." },
               { icon: <Zap className="text-emerald-500 mb-6" size={40} />, title: "Concierge Transfers", desc: "Our technical team handles the entire DNS and ownership transfer process for you." },
               { icon: <Globe className="text-violet-500 mb-6" size={40} />, title: "Verified Assets", desc: "Each domain in our portfolio is meticulously vetted for brandability and clean history." }
             ].map((item, i) => (
               <div key={i} className="text-center p-8">
                 {item.icon}
                 <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                 <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </AnimatedSection>

        {/* Image / Vision */}
        <AnimatedSection>
          <div className="relative rounded-[3rem] h-[600px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600&h=800" 
              className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              alt="EtherNames HQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12 md:p-20">
              <h3 className="text-4xl md:text-6xl font-black text-white max-w-3xl leading-tight">
                "The domain name is the real estate of the 21st century."
              </h3>
              <p className="text-indigo-500 font-bold mt-6 tracking-widest uppercase">Founded 2024 • Silicon Valley</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default About;
