import React from 'react';
import { FaCheck } from 'react-icons/fa';
import digitaileLogo from '../assets/partner-logos/digitaile.png';
import excelAccountingLogo from '../assets/partner-logos/EA.jpg';
import excelBizLogo from '../assets/partner-logos/EB.png';

const PartnerSection: React.FC = () => {
  // Partner organizations with their logos and website links
  const partners = [
    { name: "Digitaile", logo: digitaileLogo, website: "https://digitaile.com/" },
    { name: "Excel Accounting", logo: excelAccountingLogo, website: "https://www.excelaccounting.com.sg" },
    { name: "Excel Biz", logo: excelBizLogo, website: "https://www.excelbiz.com.sg" },
  ];
  return (    
    <section style={{ padding: '3rem 0', background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))' }}>
      <div className="container">          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Our Partners</h2>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          We collaborate with leading organizations committed to empowering job seekers and creating inclusive employment opportunities for unemployed, part-time, and freelance professionals.
        </p>          
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          justifyItems: 'center',
          marginBottom: '3rem',
          maxWidth: '900px',
          margin: '0 auto 3rem'
        }}>
          {partners.map((partner, index) => (
            <div key={index} style={{ textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center' }}>              
              <a 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',                  width: '160px',
                  height: '80px',
                  background: 'white',
                  borderRadius: '12px',
                  border: '2px solid var(--primary-blue)',                  boxShadow: 'var(--card-glow)',
                  padding: '10px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(52, 152, 219, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--card-glow)';
                }}
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
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
        </div>
        
        <div style={{ textAlign: 'center' }}>            <h3>Become a Partner</h3>
          <p>Join our network of socially responsible organizations committed to creating meaningful employment opportunities and supporting talent development.</p>
          
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
                <FaCheck style={{ color: 'var(--primary-green)', marginRight: '0.5rem', marginTop: '0.3rem' }} />
                <p style={{ margin: 0 }}>Expose job opportunities for diverse talent</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <FaCheck style={{ color: 'var(--primary-green)', marginRight: '0.5rem', marginTop: '0.3rem' }} />
                <p style={{ margin: 0 }}>Access our pool of qualified candidates</p>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <FaCheck style={{ color: 'var(--primary-green)', marginRight: '0.5rem', marginTop: '0.3rem' }} />
                <p style={{ margin: 0 }}>Participate in networking events</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <FaCheck style={{ color: 'var(--primary-green)', marginRight: '0.5rem', marginTop: '0.3rem' }} />
                <p style={{ margin: 0 }}>Support the X Talents Ecosystem</p>
              </div>
            </div>
          </div>
            <a 
            href="mailto:xtalentsfoundation@gmail.com?subject=Partnership%20Inquiry&body=Hello%20X%20Talents%2C%0A%0AI'm%20interested%20in%20becoming%20a%20partner.%20Please%20provide%20more%20information%20about%20partnership%20opportunities.%0A%0ARegards%2C"
            className="cta-button" 
            style={{ 
              marginTop: '1rem',
              background: 'var(--welcome-gradient)',
              border: 'none',
              boxShadow: 'var(--card-glow)',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Join Us!
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
