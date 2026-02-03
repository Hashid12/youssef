
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  ChevronLeft, 
  Loader2, 
  Share2, 
  ShieldCheck, 
  ArrowUpRight,
  History,
  Activity
} from 'lucide-react';
import { getDomainAnalytics } from '../services/gemini.ts';
import { DomainAnalytics as AnalyticsType } from '../types.ts';
import AnimatedSection from '../components/AnimatedSection.tsx';

const DomainAnalytics: React.FC = () => {
  const { domain: domainParam } = useParams<{ domain: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsType | null>(null);
  const MotionDiv = (motion as any).div;

  // Default to a flagship domain if none is provided
  const targetDomain = domainParam || 'quantum.ai';

  useEffect(() => {
    fetchData();
  }, [targetDomain]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getDomainAnalytics(targetDomain);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs">Aggregating Global Metrics...</p>
      </div>
    );
  }

  if (!data) return null;

  const maxVisitors = Math.max(...data.visitors.map(v => v.count));

  return (
    <div className="pt-32 pb-20 bg-black min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/search" className="inline-flex items-center text-zinc-500 hover:text-white mb-12 transition-colors">
          <ChevronLeft size={20} className="mr-2" />
          Back to Marketplace
        </Link>

        {/* Header Section */}
        <AnimatedSection className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4 block flex items-center">
                <Activity size={16} className="mr-2" /> Live Market Intelligence
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4 leading-none">
                {data.domain.split('.')[0]}<span className="text-zinc-700">.{data.domain.split('.')[1]}</span>
              </h1>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-emerald-400 flex items-center">
                  <ShieldCheck size={14} className="mr-2" /> Verified Data Source
                </div>
                <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-bold text-indigo-400 flex items-center">
                  <TrendingUp size={14} className="mr-2" /> Market Index: {data.marketIndex}/100
                </div>
              </div>
            </div>
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-[1.02] flex items-center">
              Make an Offer <ArrowUpRight size={18} className="ml-2" />
            </button>
          </div>
        </AnimatedSection>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Avg. CPA', value: data.cpa, icon: <Users className="text-indigo-500" />, trend: '+12%' },
            { label: 'Avg. CPC', value: data.cpc, icon: <DollarSign className="text-emerald-500" />, trend: '+5%' },
            { label: 'Search Volume', value: data.searchVolume, icon: <BarChart3 className="text-violet-500" />, trend: 'High' },
            { label: 'Social Mentions', value: data.socialMentions, icon: <Share2 className="text-pink-500" />, trend: 'Rising' },
          ].map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 hover:border-white/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h4 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</h4>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-black text-white">{stat.value}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">{stat.trend}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Traffic Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedSection className="lg:col-span-2 p-10 rounded-[3rem] bg-zinc-900/30 border border-white/5 h-full">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <TrendingUp size={20} className="mr-3 text-indigo-500" /> Traffic Velocity
              </h3>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-zinc-400">Monthly Visitors</div>
              </div>
            </div>

            <div className="relative h-[300px] flex items-end justify-between gap-4">
              {data.visitors.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full h-full flex items-end justify-center">
                    <MotionDiv
                      initial={{ height: 0 }}
                      animate={{ height: `${(v.count / maxVisitors) * 100}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 1, ease: "easeOut" }}
                      className="w-full max-w-[40px] bg-gradient-to-t from-indigo-600/20 to-indigo-500 rounded-t-xl group-hover:from-indigo-600/40 group-hover:to-indigo-400 transition-all relative"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-2 py-1 rounded text-[10px] font-black whitespace-nowrap">
                        {v.count.toLocaleString()}
                      </div>
                    </MotionDiv>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest group-hover:text-white transition-colors">
                    {v.month}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Domain History */}
          <AnimatedSection delay={0.2} className="p-10 rounded-[3rem] bg-zinc-900/30 border border-white/5 h-full">
             <h3 className="text-2xl font-bold text-white mb-10 flex items-center">
                <History size={20} className="mr-3 text-indigo-500" /> Domain Registry History
              </h3>
              
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-white/10" />
                {data.domainHistory.map((item, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-2.5 top-1.5 w-3 h-3 bg-indigo-500 rounded-full border-4 border-black ring-4 ring-indigo-500/20" />
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter block mb-1">
                      {item.year}
                    </span>
                    <h4 className="text-white font-bold mb-1 leading-tight">{item.event}</h4>
                    <p className="text-zinc-500 text-xs">Official Registry Modification</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-indigo-600/10 border border-indigo-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Clock size={16} className="text-indigo-400" />
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Next Expiry</span>
                </div>
                <p className="text-white font-bold text-lg">Oct 12, 2025</p>
              </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default DomainAnalytics;
