
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search as SearchIcon, 
  ChevronLeft, 
  ShoppingCart, 
  Star, 
  Sparkles, 
  Loader2, 
  Tag,
  Globe,
  Award
} from 'lucide-react';
import { getDomainSuggestions } from '../services/gemini.ts';
import { MY_DOMAINS } from '../data/inventory.ts';
import { DomainSuggestion } from '../types.ts';
import BuyModal from '../components/BuyModal.tsx';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [loading, setLoading] = useState(false);
  const [aiResults, setAiResults] = useState<DomainSuggestion[]>([]);
  const [newQuery, setNewQuery] = useState(query);
  const [buyModalData, setBuyModalData] = useState<{name: string, ext: string} | null>(null);

  const MotionDiv = (motion as any).div;

  const performSearch = async (term: string) => {
    // We only fetch from AI if the user explicitly searches for something that isn't in our inventory
    // or if the query is not the default "trending"
    if (term && term !== 'trending') {
      setLoading(true);
      const suggestions = await getDomainSuggestions(term);
      setAiResults(suggestions);
      setLoading(false);
    } else {
      setAiResults([]);
    }
  };

  const handleBuyClick = (name: string, ext: string) => {
    setBuyModalData({ name, ext });
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  // Merge inventory with AI results, prioritizing inventory
  const combinedResults = useMemo(() => {
    let list = [...MY_DOMAINS];

    // If there is a search term, filter our owned domains first
    if (newQuery && newQuery !== 'trending') {
      list = list.filter(d => 
        d.name.toLowerCase().includes(newQuery.toLowerCase()) || 
        d.extension.toLowerCase().includes(newQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(newQuery.toLowerCase())
      );
    }

    // Combine with AI suggestions if any
    return [...list, ...aiResults];
  }, [newQuery, aiResults]);

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <BuyModal 
        isOpen={!!buyModalData} 
        onClose={() => setBuyModalData(null)} 
        domainName={buyModalData?.name || ''} 
        domainExtension={buyModalData?.ext || ''} 
      />

      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-white mb-12 transition-colors">
          <ChevronLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div className="flex-1">
            <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Marketplace Discovery</h2>
            <h1 className="text-4xl md:text-6xl font-black text-white">
              {query && query !== 'trending' ? (
                <>Search: <span className="text-indigo-500">"{query}"</span></>
              ) : "Premium Portfolio"}
            </h1>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && performSearch(newQuery)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Filter inventory or search global..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Results Column */}
          <div className="lg:col-span-3 space-y-4">
            <AnimatePresence mode="wait">
              {loading ? (
                <MotionDiv 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                  <p className="text-zinc-500 font-medium">Consulting our AI for more suggestions...</p>
                </MotionDiv>
              ) : combinedResults.length === 0 ? (
                <MotionDiv 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-20 text-center rounded-3xl bg-zinc-900/10 border border-white/5 border-dashed"
                >
                  <SearchIcon size={48} className="mx-auto mb-4 text-zinc-700" />
                  <h3 className="text-xl font-bold text-zinc-400">No matches found</h3>
                  <p className="text-zinc-600 text-sm mt-2">Try searching for something else.</p>
                </MotionDiv>
              ) : (
                <MotionDiv
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {combinedResults.map((domain, idx) => (
                    <MotionDiv 
                      key={`${domain.name}-${domain.extension}-${idx}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ y: -4 }}
                      className={`group flex flex-col p-6 rounded-[2rem] border transition-all overflow-hidden ${
                        domain.isDirectListing 
                          ? 'bg-indigo-900/10 border-indigo-500/20 hover:border-indigo-500/50 hover:bg-indigo-900/20' 
                          : 'bg-zinc-900/30 border-white/5 hover:border-white/20 hover:bg-zinc-900/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-2">
                          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            domain.isDirectListing ? 'bg-indigo-500/20 text-indigo-300' : 'bg-zinc-500/10 text-zinc-500'
                          }`}>
                            {domain.category}
                          </div>
                          {domain.isDirectListing && (
                            <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-amber-500/10 text-amber-500 flex items-center">
                              <Award size={10} className="mr-1" /> Verified Owner
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-xs font-bold text-zinc-600">
                          <Star size={12} className="mr-1 fill-zinc-800" /> {domain.popularity}
                        </div>
                      </div>

                      <div className="flex-1 mb-8">
                        <Link to={`/analytics/${domain.name}${domain.extension}`}>
                          <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
                            {domain.name}<span className="text-indigo-500/40">{domain.extension}</span>
                          </h3>
                        </Link>
                        <p className="text-sm text-zinc-500 line-clamp-2 mt-2 leading-relaxed">
                          {domain.reason}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Price</span>
                          <span className="text-xl font-black text-white">{domain.price}</span>
                        </div>
                        <button 
                          onClick={() => handleBuyClick(domain.name, domain.extension)}
                          className="bg-white text-black px-6 py-2.5 rounded-xl font-bold flex items-center hover:bg-indigo-600 hover:text-white transition-all transform group-hover:scale-105 active:scale-95"
                        >
                          <ShoppingCart size={16} className="mr-2" /> Buy
                        </button>
                      </div>
                    </MotionDiv>
                  ))}
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
              <Sparkles className="absolute -top-4 -right-4 w-32 h-32 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <h3 className="text-2xl font-black text-white mb-4">Direct Sales</h3>
              <p className="text-indigo-100 mb-8 text-sm leading-relaxed opacity-80">
                These domains are part of our <span className="font-bold underline">private collection</span>. Deal directly with the verified owner.
              </p>
              <button className="w-full bg-white text-indigo-600 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-zinc-100 transition-colors shadow-xl">
                Contact Broker
              </button>
            </div>

            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Globe size={18} className="mr-2 text-indigo-500" /> Ownership Status
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Direct Listings', value: MY_DOMAINS.length, color: 'text-indigo-500' },
                  { label: 'Verified Escrow', value: 'Active', color: 'text-emerald-500' },
                  { label: 'Avg Response', value: '< 2hrs', color: 'text-zinc-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-zinc-400 font-medium">{item.label}</span>
                    <span className={`text-sm font-black ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/10 rounded-3xl p-8 text-center">
              <h4 className="font-bold text-white mb-2">Bulk Offers?</h4>
              <p className="text-zinc-500 text-xs mb-6">Interested in purchasing multiple domains from our portfolio?</p>
              <a href="mailto:broker@ethernames.io" className="block p-3 bg-zinc-900/50 rounded-xl border border-white/5 font-bold text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
