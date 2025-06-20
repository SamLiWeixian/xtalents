import React, { useState } from 'react';
import { FaHandHoldingHeart, FaMoneyCheckAlt, FaHandsHelping } from 'react-icons/fa';
import SupportersSection from '../components/SupportersSection';
import QRCodeModal from '../components/QRCodeModal';

const DonatePage: React.FC = () => { // Consider renaming this component to SupportPage in a future update
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  
  const openQRModal = () => {
    setIsQRModalOpen(true);
  };
  
  const closeQRModal = () => {
    setIsQRModalOpen(false);
  };
  
  return (
    <main className="container">      <h1 style={{ marginBottom: '1.5rem' }}>Support Our Mission</h1>      <div className="mission-section" style={{ 
        maxWidth: '800px',
        margin: '0 auto 2rem auto',
        padding: '2rem',
        background: 'var(--subtle-gradient)',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)'
      }}>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          Your contribution helps us empower job seekers across Singapore to find meaningful employment and rebuild their lives with dignity.
        </p>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        margin: '3rem 0'
      }}>        <div className="job-card" style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>          
          <FaMoneyCheckAlt style={{ fontSize: '3rem', color: 'var(--primary-blue)', margin: '0 0 1rem 0' }}/>            <h2>Support Us</h2>
          <p>Your financial contribution directly supports our programs, workshops, and services for job seekers.</p>
          <button 
             onClick={openQRModal}
             className="cta-button" 
             style={{ 
               marginTop: '1rem', 
               textDecoration: 'none', 
               display: 'inline-block',
               background: 'var(--welcome-gradient)',
               border: 'none',
               boxShadow: 'var(--card-glow)',
               cursor: 'pointer'
             }}>Support Us!</button>
        </div>          <div className="job-card" style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>
          <FaHandsHelping style={{ fontSize: '3rem', color: 'var(--primary-blue)', margin: '0 0 1rem 0' }}/>          
          <h2>Volunteer</h2>
          <p>Share your passion, time and skills to help connecting the organizations with the amazing X Talents pool.</p>
          <a href="mailto:xtalentsfoundation@gmail.com?subject=Become%20a%20Volunteer&body=Hello%20X%20Talents%2C%0A%0AI'm%20interested%20in%20volunteering%20with%20your%20organization.%20I%20would%20like%20to%20contribute%20my%20skills%20and%20time%20to%20help%20connect%20organizations%20with%20the%20X%20Talents%20pool.%0A%0AMy%20skills%20include%3A%20%0A-%20%0A-%20%0A-%20%0A%0AAvailability%3A%20%0A%0ARegards%2C%0A" 
             className="cta-button" 
             style={{ 
               marginTop: '1rem', 
               textDecoration: 'none', 
               display: 'inline-block',
               background: 'var(--welcome-gradient)',
               border: 'none',
               boxShadow: 'var(--card-glow)'
             }}>Volunter with Us!</a>
        </div>
          <div className="job-card" style={{ 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>
          <FaHandHoldingHeart style={{ fontSize: '3rem', color: 'var(--primary-green)', margin: '0 0 1rem 0' }} /><h2>Partner With Us</h2>
          <p>Organizations can partner with us to create employment opportunities and support our mission.</p>
          <a href="mailto:xtalentsfoundation@gmail.com?subject=Partnership%20Inquiry&body=Hello%20X%20Talents%2C%0A%0AI'm%20reaching%20out%20on%20behalf%20of%20%5BCompany%20Name%5D%20to%20explore%20potential%20partnership%20opportunities.%20We're%20interested%20in%20working%20with%20X%20Talents%20to%20create%20employment%20opportunities%20and%20support%20your%20mission.%0A%0AAbout%20our%20organization%3A%0A%0AThe%20type%20of%20partnership%20we're%20interested%20in%3A%0A%0ARegards%2C%0A" className="cta-button" style={{ marginTop: '1rem', textDecoration: 'none', display: 'inline-block' }}>Join Us!</a>
        </div>
      </div>
        <div className="contact-section" style={{
        maxWidth: '800px',
        margin: '0 auto 3rem auto',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>
        <h2>Get in Touch</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
          Have questions about how you can support our mission? We'd love to hear from you!
        </p>        <a 
          href="mailto:xtalentsfoundation@gmail.com?subject=Question%20about%20Supporting%20X%20Talents&body=Hello%20X%20Talents%2C%0A%0AI%20have%20a%20question%20about%20how%20I%20can%20support%20your%20mission.%0A%0A%0ARegards%2C%0A" 
          className="cta-button"
          style={{
            display: 'inline-block',
            textDecoration: 'none',
            padding: '0.75rem 2rem'
          }}
        >
          Email Us
        </a>
      </div>        <section style={{ 
        background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))', 
        borderRadius: '10px',
        padding: '2rem',
        boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
        border: '1px solid rgba(52, 152, 219, 0.3)',
        marginBottom: '3rem',
        maxWidth: '800px',
        margin: '0 auto 3rem auto'
      }}>
        <h2>How Your Support Helps</h2>
        
        <div style={{ margin: '2rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>            <div style={{ 
              width: '60px', 
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: 'var(--primary-blue)',
              borderBottom: '2px solid var(--primary-blue)',
              paddingBottom: '0.25rem'
            }}>
              $50
            </div>
            <div style={{ flex: 1, marginLeft: '1.5rem' }}>
              <p style={{ margin: 0 }}>Provides career searching for X Talents community</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>            <div style={{ 
              width: '60px', 
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: 'var(--primary-blue)',
              borderBottom: '2px solid var(--primary-blue)',
              paddingBottom: '0.25rem'
            }}>
              $100
            </div>
            <div style={{ flex: 1, marginLeft: '1.5rem' }}>
              <p style={{ margin: 0 }}>Funds the enterprise in outreach programmes for the X Talents community</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>            <div style={{ 
              width: '60px', 
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: 'var(--primary-blue)',
              borderBottom: '2px solid var(--primary-blue)',
              paddingBottom: '0.25rem'
            }}>
              $250
            </div>
            <div style={{ flex: 1, marginLeft: '1.5rem' }}>
              <p style={{ margin: 0 }}>Supports a platform connecting job seekers with potential employers</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>            <div style={{ 
              width: '60px', 
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: 'var(--primary-blue)',
              borderBottom: '2px solid var(--primary-blue)',
              paddingBottom: '0.25rem'
            }}>
              $500+
            </div>
            <div style={{ flex: 1, marginLeft: '1.5rem' }}>
              <p style={{ margin: 0 }}>Helps establish sustainable long-term career support</p>
            </div>
          </div>
        </div>      </section>
        <SupportersSection />
        <QRCodeModal isOpen={isQRModalOpen} onClose={closeQRModal} />
    </main>
  );
};

export default DonatePage;
