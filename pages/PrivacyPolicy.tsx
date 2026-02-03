
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection.tsx';

const PrivacyPolicy: React.FC = () => {
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
            PRIVACY <br /><span className="text-zinc-500">POLICY</span>
          </h1>
          <p className="text-zinc-500 text-sm">Last Updated: June 15, 2024</p>
        </MotionDiv>

        <div className="space-y-16">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">01</span>
              Introduction
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                At EtherNames, your privacy is a cornerstone of our relationship. We are committed to protecting the personal information you share with us while navigating our premium domain portfolio.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or interact with our domain brokers.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">02</span>
              Information We Collect
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                To provide our elite concierge services, we may collect the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact information (Name, Email, Phone Number)</li>
                <li>Inquiry details regarding specific domain assets</li>
                <li>Device information and browsing behavior for site optimization</li>
                <li>Billing information for secure transaction facilitation</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">03</span>
              How We Use Your Data
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                Your data is exclusively used to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Facilitate domain negotiations and transfers</li>
                <li>Communicate about new listings in our private collection</li>
                <li>Ensure the security of our marketplace and prevent fraud</li>
                <li>Improve the cinematic user experience of our platform</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">04</span>
              Data Security
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                We implement industry-leading encryption and security protocols to protect your personal information. High-value transactions are always facilitated through verified third-party escrow services.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mr-4 text-sm font-black">05</span>
              Contact Information
            </h2>
            <div className="text-zinc-400 leading-relaxed space-y-4">
              <p>
                If you have questions about this policy or wish to exercise your data rights, please contact our legal team at <span className="text-indigo-400 underline italic">domainerakheraz@gmail.com</span>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
