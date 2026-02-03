
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Zap, Shield, BarChart3, Globe2, ShoppingCart, TrendingUp, Sparkles, Scale, Activity, BrainCircuit, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection.tsx';
import BuyModal from '../components/BuyModal.tsx';
import { MY_DOMAINS } from '../data/inventory.ts';
import { appraiseDomain } from '../services/gemini.ts';
import { DomainAppraisal } from '../types.ts';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [appraisalInput, setAppraisalInput] = useState('');
  const [appraisalResult, setAppraisalResult] = useState<DomainAppraisal | null>(null);
  const [isAppraising, setIsAppraising] = useState(false);
  const [buyModalData, setBuyModalData] = useState<{name: string, ext: string} | null>(null);
  const navigate = useNavigate();
  
  const MotionDiv = (motion as any).div;
  const MotionForm = (motion as any).form;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/search');
    }
  };

  const handleAppraise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appraisalInput.trim()) return;
    
    setIsAppraising(true);
    try {
      const result = await appraiseDomain(appraisalInput);
      setAppraisalResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAppraising(false);
    }
  };

  const handleBuyClick = (name: string, ext: string) => {
    setBuyModalData({ name, ext });
  };

  const extensions = [
    { ext: '.com', price: '$12.99', color: 'bg-indigo-500' },
    { ext: '.io', price: '$49.00', color: 'bg-emerald-500' },
    { ext: '.ai', price: '$79.00', color: 'bg-violet-500' },
    { ext: '.net', price: '$10.50', color: 'bg-sky-500' },
    { ext: '.xyz', price: '$1.99', color: 'bg-pink-500' },
  ];

  const featuredInventory = MY_DOMAINS.slice(0, 6);

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <BuyModal 
        isOpen={!!buyModalData} 
        onClose={() => setBuyModalData(null)} 
        domainName={buyModalData?.name || ''} 
        domainExtension={buyModalData?.ext || ''} 
      />

      {/* Hero Section */}
      <section className="relative px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-indigo-600/10 blur-[120px] -z-10 rounded-full" />
        
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6">
              Verified Premium Domain Portfolio
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
              Powerfull Domain <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-400">Powerfull Business</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Explore our exclusive collection of high-value digital assets. Secure the foundation for your next billion-dollar venture.
            </p>
          </MotionDiv>

          <MotionForm 
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative max-w-2xl mx-auto mb-16"
          >
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search our exclusive portfolio..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full py-6 pl-16 pr-32 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
              />
              <button 
                type="submit"
                className="absolute right-3 top-3 bottom-3 bg-white text-black px-8 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center"
              >
                Search
              </button>
            </div>
          </MotionForm>

          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {extensions.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-sm font-bold text-white mb-1">{item.ext}</span>
                <span className="text-xs text-zinc-500 font-medium">{item.price}</span>
              </div>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* AI Appraisal Section */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <AnimatedSection className="relative overflow-hidden rounded-[3.5rem] bg-zinc-900/40 border border-white/5 p-12 md:p-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4 block flex items-center">
                <BrainCircuit size={16} className="mr-2" /> Powered by Gemini
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                AI DOMAIN <br /> <span className="text-zinc-500">APPRAISAL</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                Wondering what your domain is worth? Our AI analyzes brandability, SEO potential, and current market trends to give you a professional valuation in seconds.
              </p>
              
              <MotionForm 
                onSubmit={handleAppraise}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input 
                  type="text" 
                  value={appraisalInput}
                  onChange={(e) => setAppraisalInput(e.target.value)}
                  placeholder="e.g. quantum.ai"
                  className="flex-grow bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button 
                  disabled={isAppraising}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-500 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {isAppraising ? (
                    <Loader2 size={20} className="animate-spin mr-2" />
                  ) : (
                    <Scale size={20} className="mr-2" />
                  )}
                  {isAppraising ? 'Appraising...' : 'Appraise Now'}
                </button>
              </MotionForm>
            </div>

            <div className="relative min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!appraisalResult && !isAppraising ? (
                  <MotionDiv 
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                      <Activity size={40} className="text-zinc-600" />
                    </div>
                    <p className="text-zinc-500 font-medium">Ready for your first appraisal</p>
                  </MotionDiv>
                ) : isAppraising ? (
                  <MotionDiv 
                    key="loading-ui"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="relative">
                      <div className="w-32 h-32 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BrainCircuit size={40} className="text-indigo-500 animate-pulse" />
                      </div>
                    </div>
                    <p className="mt-8 text-zinc-400 font-bold uppercase tracking-widest text-xs">Analyzing Market Data...</p>
                  </MotionDiv>
                ) : (
                  <MotionDiv 
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Domain Name</h4>
                        <p className="text-2xl font-black text-white">{appraisalResult?.domain}</p>
                      </div>
                      <div className="text-right">
                        <h4 className="text-indigo-500 text-[10px] font-black uppercase tracking-widest mb-1">Market Value</h4>
                        <p className="text-2xl font-black text-indigo-400">{appraisalResult?.estimatedValue}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <h5 className="text-zinc-500 text-[10px] font-bold uppercase mb-2">Brandability</h5>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-black text-white">{appraisalResult?.brandabilityScore}%</span>
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full mb-2 overflow-hidden">
                            <MotionDiv 
                              initial={{ width: 0 }}
                              animate={{ width: `${appraisalResult?.brandabilityScore}%` }}
                              className="h-full bg-indigo-500" 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                        <h5 className="text-zinc-500 text-[10px] font-bold uppercase mb-2">SEO Potential</h5>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-black text-white">{appraisalResult?.seoPotential}%</span>
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full mb-2 overflow-hidden">
                             <MotionDiv 
                              initial={{ width: 0 }}
                              animate={{ width: `${appraisalResult?.seoPotential}%` }}
                              className="h-full bg-emerald-500" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <div>
                        <h5 className="text-zinc-500 text-[10px] font-bold uppercase mb-2">Expert Verdict</h5>
                        <p className="text-zinc-400 text-sm italic leading-relaxed">
                          "{appraisalResult?.verdict}"
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {appraisalResult?.bestSuitedFor.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-zinc-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-6 mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {[
          { label: 'Direct Listings', value: MY_DOMAINS.length.toString() },
          { label: 'Total Value', value: '$240K+' },
          { label: 'Extensions', value: '12+' },
          { label: 'Sold This Month', value: '4' },
        ].map((stat, i) => (
          <div key={i} className="group cursor-default">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-indigo-500 transition-colors">{stat.value}</h3>
            <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">{stat.label}</p>
          </div>
        ))}
      </AnimatedSection>

      {/* Trending Domains Section */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <AnimatedSection className="mb-16">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center">
                <TrendingUp size={14} className="mr-2 text-indigo-500" /> Exclusive Portfolio
              </h2>
              <h2 className="text-4xl md:text-5xl font-black text-white">Direct Marketplace</h2>
            </div>
            <button 
              onClick={() => navigate('/search?q=trending')}
              className="flex items-center text-sm font-bold text-indigo-400 hover:text-white transition-colors"
            >
              View Full Portfolio <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredInventory.map((domain, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <MotionDiv 
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  boxShadow: "0 20px 40px -20px rgba(99, 102, 241, 0.3)"
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group relative p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5 hover:border-indigo-500/50 hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden cursor-default"
              >
                {/* Subtle Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Moving Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none overflow-hidden">
                  <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
                
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles size={20} className="text-indigo-500 animate-pulse" />
                </div>
                
                <div className="mb-8 relative z-10">
                  <span className="text-xs font-black uppercase tracking-tighter text-zinc-600 bg-white/5 px-3 py-1 rounded-full mb-4 inline-block group-hover:text-indigo-400/80 group-hover:bg-indigo-500/10 transition-all duration-500">
                    {domain.category} • Direct
                  </span>
                  <Link to={`/analytics/${domain.name}${domain.extension}`} className="block">
                    <h3 className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">
                      {domain.name}<span className="text-zinc-700 group-hover:text-indigo-500/60 transition-colors duration-500">{domain.extension}</span>
                    </h3>
                  </Link>
                </div>

                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <span className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-zinc-400 transition-colors">Price</span>
                    <span className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors duration-500">{domain.price}</span>
                  </div>
                  <button 
                    onClick={() => handleBuyClick(domain.name, domain.extension)}
                    className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg shadow-black/20 transform group-hover:scale-105 active:scale-95"
                  >
                    <ShoppingCart size={18} className="mr-2" /> Buy
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500 transition-all duration-700" />
              </MotionDiv>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Image Showcase */}
      <AnimatedSection className="max-w-7xl mx-auto px-6 mt-40">
        <div className="relative rounded-[2rem] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600&h=800" 
            alt="Global Network" 
            className="w-full h-[500px] object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          <div className="absolute bottom-12 left-12 z-20 max-w-md">
            <h2 className="text-4xl font-black text-white mb-4">Direct from Owner Portfolio.</h2>
            <p className="text-zinc-400 mb-6">Skip the middleman fees. We offer premium domains at direct-listing prices with secure escrow transfers.</p>
            <button 
              onClick={() => navigate('/search')}
              className="flex items-center text-white font-bold group"
            >
              Browse all names <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedSection delay={0.1} className="p-10 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/50 transition-all">
            <Zap className="text-indigo-500 w-12 h-12 mb-8" />
            <h3 className="text-2xl font-bold text-white mb-4">Direct Transfer</h3>
            <p className="text-zinc-500 leading-relaxed">No registrar delays. We initiate the transfer authorization immediately upon purchase verification.</p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="p-10 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/50 transition-all">
            <Shield className="text-emerald-500 w-12 h-12 mb-8" />
            <h3 className="text-2xl font-bold text-white mb-4">Escrow Guaranteed</h3>
            <p className="text-zinc-500 leading-relaxed">All high-value transactions are handled through industry-leading escrow services for 100% security.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="p-10 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/50 transition-all">
            <BarChart3 className="text-violet-500 w-12 h-12 mb-8" />
            <h3 className="text-2xl font-bold text-white mb-4">Verified Growth</h3>
            <p className="text-zinc-500 leading-relaxed">Every name in our portfolio is selected based on historical search volume and industry growth potential.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection className="max-w-7xl mx-auto px-6 mt-40 text-center">
        <div className="bg-gradient-to-br from-indigo-900/20 to-transparent rounded-[3rem] p-20 border border-indigo-500/20">
          <Globe2 className="w-16 h-16 text-indigo-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to secure your future?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button onClick={() => navigate('/search?q=trending')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all">
              Browse Portfolio
            </button>
            <button onClick={() => navigate('/search?q=trending')} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-full font-bold text-lg transition-all">
              Broker Support
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;
