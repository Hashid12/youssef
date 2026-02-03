
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
  domainExtension: string;
}

const BuyModal: React.FC<BuyModalProps> = ({ isOpen, onClose, domainName, domainExtension }) => {
  const domain = `${domainName}${domainExtension}`;
  const MotionDiv = (motion as any).div;

  const providers = [
    {
      name: 'GoDaddy',
      description: 'The world\'s largest domain registrar.',
      url: `https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=${encodeURIComponent(domain)}`,
      color: 'bg-[#00A63F]',
      logo: 'GD'
    },
    {
      name: 'Unstoppable Domains',
      description: 'Best for Web3, AI, and digital identity.',
      url: `https://unstoppabledomains.com/search?searchTerm=${encodeURIComponent(domain)}`,
      color: 'bg-[#0D67FE]',
      logo: 'UD'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-indigo-500 w-8 h-8" />
              </div>
              <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">Secure your domain</h2>
              <h3 className="text-3xl font-black text-white">
                {domainName}<span className="text-indigo-500">{domainExtension}</span>
              </h3>
            </div>

            <div className="space-y-4">
              {providers.map((provider) => (
                <a
                  key={provider.name}
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${provider.color} rounded-xl flex items-center justify-center text-white font-black text-lg mr-6`}>
                    {provider.logo}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{provider.name}</h4>
                    <p className="text-sm text-zinc-500">{provider.description}</p>
                  </div>
                  <ExternalLink size={20} className="text-zinc-600 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            <p className="text-center mt-10 text-xs text-zinc-600">
              You will be redirected to the provider's website to complete your purchase. 
              EtherNames does not handle payment processing directly.
            </p>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BuyModal;
