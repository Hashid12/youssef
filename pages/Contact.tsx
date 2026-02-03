
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection.tsx';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const MotionDiv = (motion as any).div;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("In a real application, this would send an inquiry to our broker team.");
  };

  return (
    <div className="pt-40 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Info Side */}
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4 block">Get In Touch</span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              LET'S <br /> TALK <br /> <span className="text-zinc-500">ASSETS.</span>
            </h1>
            <p className="text-zinc-500 text-lg leading-relaxed mb-12 max-w-sm">
              Looking for a specific domain? Our specialized brokers are ready to negotiate on your behalf.
            </p>

            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Email us</h4>
                  <p className="text-zinc-500 text-sm">domainerakheraz@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Call our broker</h4>
                  <p className="text-zinc-500 text-sm">+212629287935</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Location</h4>
                  <p className="text-zinc-500 text-sm">San Francisco, CA • Global Ops</p>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Form Side */}
          <AnimatedSection delay={0.2} className="relative">
            <div className="absolute -inset-10 bg-indigo-600/10 blur-[100px] -z-10 rounded-full" />
            <form 
              onSubmit={handleSubmit}
              className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-10 md:p-12 rounded-[3.5rem] shadow-2xl"
            >
              <div className="flex items-center space-x-3 mb-10">
                <MessageCircle className="text-indigo-500" />
                <h3 className="text-2xl font-bold text-white">Send an Inquiry</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-600 tracking-tighter ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-600 tracking-tighter ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-zinc-600 tracking-tighter ml-1">Message</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell us which domain you are interested in..."
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
                >
                  <Send size={18} className="mr-3" /> Send Message
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Contact;
