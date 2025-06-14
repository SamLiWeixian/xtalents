import React from 'react';
import { Link } from 'react-router-dom';
import { FaHandsHelping, FaLaptop, FaUsers } from 'react-icons/fa';
import StatisticsSection from '../components/StatisticsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import PartnerSection from '../components/PartnerSection';

const iconStyle = {
  fontSize: '2.5rem',
  color: 'var(--primary-blue)',
  marginBottom: '1rem'
};

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
  borderRadius: '8px',
  padding: '1.5rem',
  boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  textAlign: 'center' as const,
  border: '1px solid rgba(52, 152, 219, 0.3)'
};

const HomePage: React.FC = () => (
  <>    <div className="hero-section">
      <div className="hero-overlay">        <div className="hero-content">          
          <h1 style={{ color: 'white' }}>Welcome to X Talents</h1>
          <p style={{ color: 'white' }}>Empowering Singapore's job seekers to find their path with dignity</p>
          <Link to="/talent-pool" className="cta-button" style={{ textDecoration: 'none' }}>Get Started Today</Link>
        </div>
      </div>
    </div>
    
    <main>
      <div className="container">        <section className="mission-section" style={{
          maxWidth: '800px',
          margin: '0 auto 3rem auto',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)'
        }}>
          <h2>Our Mission</h2>
          <p>
            X Talents is dedicated to supporting job seekers in Singapore by providing access to jobs, resources, and a caring network. 
            We believe everyone deserves meaningful work that aligns with their aspirations.
          </p>
        </section>
        
        <section className="services-section">
          <h2>How We Serve You</h2>
          <div className="services-grid">
            <div style={cardStyle}>
              <FaHandsHelping style={iconStyle} />
              <h3>Support & Guidance</h3>
              <p>Personalized support from industry professionals to help you find your ideal position.</p>
            </div>
            
            <div style={cardStyle}>
              <FaLaptop style={iconStyle} />
              <h3>Job Opportunities</h3>
              <p>Access to exclusive job listings from our network of charity and corporate partners.</p>
            </div>
            
            <div style={cardStyle}>
              <FaUsers style={iconStyle} />
              <h3>Community</h3>
              <p>Join our supportive community of job seekers and professionals.</p>
            </div>
          </div>
        </section>
      </div>
      
      <StatisticsSection />
      
      <div className="container">        <section style={{ 
          marginBottom: '3rem', 
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>
          <h2>How It Works</h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>              <div style={{ 
                minWidth: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'var(--welcome-gradient)', 
                color: 'white', 
                border: '2px solid transparent',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>1</div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Register & Upload Your Resume</h3>
                <p style={{ margin: 0 }}>Create an account and share your skills, experience, and career goals with us.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>              <div style={{ 
                minWidth: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'var(--welcome-gradient)', 
                color: 'white', 
                border: '2px solid transparent',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>2</div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Personalized Talent Consultation</h3>
                <p style={{ margin: 0 }}>Meet with our talent advisors who will understand your needs and aspirations.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>              <div style={{ 
                minWidth: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'var(--welcome-gradient)', 
                color: 'white', 
                border: '2px solid transparent',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>3</div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Get Matched with Opportunities</h3>
                <p style={{ margin: 0 }}>We'll connect you with jobs that match your skills and preferences.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>              <div style={{ 
                minWidth: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'var(--welcome-gradient)', 
                color: 'white', 
                border: '2px solid transparent',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>4</div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Ongoing Support</h3>
                <p style={{ margin: 0 }}>Receive continuous guidance and resources throughout your employment journey.</p>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/resume-upload" className="cta-button" style={{ textDecoration: 'none' }}>Register Today</Link>
          </div>
        </section>
      </div>        <TestimonialsSection />
      <PartnerSection />
    </main>
  </>
);

export default HomePage;
