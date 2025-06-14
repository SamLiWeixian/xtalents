import React from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import digitaileLogo from '../assets/partner-logos/digitaile.png';
import excelAccountingLogo from '../assets/partner-logos/EA.jpg';
import excelBizLogo from '../assets/partner-logos/EB.png';

const SupportersSection: React.FC = () => {
  // Supporter organizations with their logos and website links (same as partners)
  const supporters = [
    { name: "Digitaile", logo: digitaileLogo, website: "https://digitaile.com/" },
    { name: "Excel Accounting", logo: excelAccountingLogo, website: "https://www.excelaccounting.com.sg" },
    { name: "Excel Biz", logo: excelBizLogo, website: "https://www.excelbiz.com.sg" },
  ];

  return (    <section style={{ 
        padding: '3rem 0', 
        background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
        border: '1px solid rgba(52, 152, 219, 0.3)',
        margin: '2rem 0'
      }}>
      <div className="container">        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Our Supporters</h2>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem', color: '#2c3e50' }}>
          These organizations provide valuable funding, resources, and expertise to help us empower job seekers in the blockchain and Web3 space.
        </p><div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          justifyItems: 'center',
          marginBottom: '3rem',
          maxWidth: '900px',
          margin: '0 auto 3rem'
        }}>
          {supporters.map((supporter, index) => (
            <div key={index} style={{ textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center' }}>              <a 
                href={supporter.website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',                  width: '160px',
                  height: '80px',
                  background: 'white',
                  borderRadius: '12px',
                  border: '2px solid var(--primary-blue)',
                  boxShadow: 'var(--card-glow)',
                  padding: '10px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(52, 152, 219, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--card-glow)';
                }}
              >
                <img 
                  src={supporter.logo} 
                  alt={`${supporter.name} logo`}
                  style={{ 
                    maxWidth: '100%', 
                    height: '60px',
                    objectFit: 'contain',
                    filter: 'none',
                    transition: 'filter 0.3s, box-shadow 0.3s'
                  }}
                />
              </a>
            </div>
          ))}
        </div>          <div style={{ textAlign: 'center', color: '#2c3e50' }}>
          <h3 style={{ color: 'var(--primary-blue)' }}>Support Our Mission</h3>
          <p>Help us empower job seekers by providing resources, mentorship, or financial support.</p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            maxWidth: '800px',
            margin: '2rem auto',
            textAlign: 'left'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FaHandHoldingHeart style={{ color: '#39FF14', marginRight: '0.5rem', marginTop: '0.3rem' }} />
                <p style={{ margin: 0, color: '#2c3e50' }}>Sponsor training programs and workshops</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <FaHandHoldingHeart style={{ color: '#39FF14', marginRight: '0.5rem', marginTop: '0.3rem' }} />
                <p style={{ margin: 0, color: '#2c3e50' }}>Provide mentorship to aspiring blockchain developers</p>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FaHandHoldingHeart style={{ color: '#39FF14', marginRight: '0.5rem', marginTop: '0.3rem' }} />
                <p style={{ margin: 0, color: '#2c3e50' }}>Donate equipment or digital resources</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <FaHandHoldingHeart style={{ color: '#39FF14', marginRight: '0.5rem', marginTop: '0.3rem' }} />
                <p style={{ margin: 0, color: '#2c3e50' }}>Make a financial contribution to our programs</p>
              </div>
            </div>
          </div>
            <a 
            href="mailto:xtalentsfoundation@gmail.com?subject=Become%20a%20Supporter&body=Hello%20X%20Talents%2C%0A%0AI'm%20interested%20in%20becoming%20a%20supporter%20of%20your%20organization.%20I%20would%20like%20to%20help%20in%20the%20following%20way(s)%3A%0A%0A-%20%5BSponsoring%20training%20programs%2Fworkshops%5D%0A-%20%5BProviding%20mentorship%5D%0A-%20%5BDonating%20equipment%2Fdigital%20resources%5D%0A-%20%5BMaking%20a%20financial%20contribution%5D%0A-%20%5BOther%5D%0A%0APlease%20let%20me%20know%20how%20I%20can%20best%20support%20your%20mission.%0A%0ARegards%2C%0A"            className="cta-button" 
            style={{ 
              marginTop: '1rem',
              background: 'var(--welcome-gradient)',
              border: 'none',
              boxShadow: 'var(--card-glow)',
              color: 'white',
              textDecoration: 'none', 
              display: 'inline-block'
            }}
          >
            Become a Supporter
          </a>
        </div>
      </div>
    </section>
  );
};

export default SupportersSection;
