
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Index = () => {
  const features = [
    {
      icon: '🔒',
      title: 'Privacy-First',
      description: 'Advanced encryption and zero-knowledge proofs protect your data throughout the training process.'
    },
    {
      icon: '⚡',
      title: 'Fast & Secure',
      description: 'Blockchain-based transactions with instant settlement and cryptographic security guarantees.'
    },
    {
      icon: '💰',
      title: 'Tokenized Economy',
      description: 'Fair compensation for data owners and transparent pricing for AI developers.'
    },
    {
      icon: '🌐',
      title: 'Decentralized',
      description: 'No single point of failure. Distributed architecture ensures maximum uptime and reliability.'
    },
    {
      icon: '🔍',
      title: 'Transparent',
      description: 'Full audit trail of all training activities with immutable blockchain records.'
    },
    {
      icon: '🚀',
      title: 'Scalable',
      description: 'Enterprise-grade infrastructure that grows with your AI training needs.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Connect Your Wallet',
      description: 'Link your Web3 wallet and choose your role: Data Owner or AI Developer.'
    },
    {
      number: '02',
      title: 'Browse or Upload',
      description: 'Data owners upload datasets, AI developers browse available training data.'
    },
    {
      number: '03',
      title: 'Train & Earn',
      description: 'Execute privacy-preserving AI training and earn tokens for your contributions.'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Director',
      company: 'TechCorp Labs',
      content: 'This platform revolutionized how we access training data while maintaining the highest privacy standards.',
      avatar: '👩‍💼'
    },
    {
      name: 'Marcus Johnson',
      role: 'Data Scientist',
      company: 'DataFlow Inc',
      content: 'Finally, a marketplace where I can monetize my datasets without compromising sensitive information.',
      avatar: '👨‍💻'
    },
    {
      name: 'Elena Rodriguez',
      role: 'CTO',
      company: 'Neural Networks Co',
      content: 'The transparency and security features make this our go-to platform for all AI training projects.',
      avatar: '👩‍🔬'
    }
  ];

  return (
    <Layout showNavigation={true}>
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              The Future of
              <span className="block">AI Training & Data Privacy</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A premium marketplace where data owners and AI developers collaborate securely. 
              Trade datasets, train models, and earn tokens—all while maintaining complete privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login" className="btn-premium text-lg px-8 py-4">
                Get Started Now
              </Link>
              <Link to="/marketplace" className="btn-premium-outline text-lg px-8 py-4">
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start trading data and training AI models securely
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-black mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Enterprise-Grade Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for the most demanding AI training workflows with uncompromising security
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="premium-card animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our users are saying about their experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="premium-card animate-slide-in-right" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-black">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your AI Workflow?</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of data owners and AI developers building the future of privacy-preserving machine learning.
          </p>
          <Link to="/login" className="bg-white text-black px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all duration-300 inline-block">
            Start Trading Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold text-black">AI Marketplace</span>
              </div>
              <p className="text-gray-600">
                The premier platform for secure AI training and data trading.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/marketplace" className="hover:text-black transition-colors">Marketplace</Link></li>
                <li><Link to="/login" className="hover:text-black transition-colors">Dashboard</Link></li>
                <li><a href="#" className="hover:text-black transition-colors">API Docs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600">© 2024 AI Marketplace. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Twitter</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
