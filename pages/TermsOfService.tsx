
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection.tsx';

const TermsOfService: React.FC = () => {
  const MotionDiv = (motion as any).div;

  return (
    <div className="pt-40 pb-20 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4 block">Legal Center</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8">
            TERMS OF <br /><span className="text-zinc-500">SERVICE</span>
          </h1>
          <p className="text-zinc-500 text-sm">Last Updated: June 15, 2024</p>
        </MotionDiv>

        <div className="space-y-16">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">01</span>
              Acceptance of Terms
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                By accessing or using the EtherNames platform, you agree to be bound by these Terms of Service. If you do not agree, please refrain from using our marketplace.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">02</span>
              Marketplace Use
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                EtherNames provides a marketplace for the discovery and acquisition of premium domain names. While we use AI to assist in discovery, high-value assets are often part of a private, verified inventory.
              </p>
              <p>
                Users must be at least 18 years old to engage in domain purchase negotiations.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">03</span>
              Transaction and Escrow
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                All domain sales initiated through our platform are final once the transfer authorization code (EPP) is released to the buyer.
              </p>
              <p>
                To ensure maximum security, all transactions exceeding $1,000 USD must be processed through an approved third-party escrow service. EtherNames is not responsible for fees charged by these external providers.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">04</span>
              Intellectual Property
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                The design, animations, and proprietary "EtherNames" branding are protected by international copyright laws. Unauthorized reproduction of any site element is strictly prohibited.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">05</span>
              Limitation of Liability
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                EtherNames acts as a facilitator for domain transfers. We are not liable for any trademark disputes arising from the purchase or use of domain names acquired through our platform. Buyers are encouraged to perform their own trademark due diligence.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
