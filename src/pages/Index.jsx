
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Index = () => {
  return (
    <Layout showNavigation={false}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              AI Training & Data Privacy Marketplace
            </h1>
            <p className="hero-subtitle">
              Secure, decentralized platform for AI developers and data owners to collaborate
              with privacy-preserving technologies and tokenized incentives.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn-premium">
                Connect Wallet
              </Link>
              <a href="#features" className="btn-outline">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Connect & Choose Role</h3>
              <p>Data owners upload datasets, AI developers browse and request access</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Secure Training</h3>
              <p>Train models on encrypted data using privacy-preserving technologies</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Earn Rewards</h3>
              <p>Get paid in tokens for data usage and successful model training</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-gray-50">
        <div className="container">
          <h2 className="section-title">Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>Zero-knowledge proofs and trusted execution environments protect your data</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⛓️</div>
              <h3>Blockchain Verified</h3>
              <p>All transactions and training logs are recorded on-chain for transparency</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Token Rewards</h3>
              <p>Earn tokens for contributing data and successful model training</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Optimized</h3>
              <p>Built specifically for machine learning workflows and model training</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>AI Marketplace</h4>
              <p>Secure AI training with privacy-preserving technologies</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><Link to="/login">Get Started</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>support@aimarketplace.com</p>
              <p>Join our community</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 AI Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
