import React from 'react';
import digitaileLogo from '../assets/partner-logos/digitaile.png';
import excelAccountingLogo from '../assets/partner-logos/EA.jpg';
import excelBizLogo from '../assets/partner-logos/EB.png';

const SupportersSection: React.FC = () => {
  const supporters = [
    { name: 'Digitaile', logo: digitaileLogo },
    { name: 'Excel Accounting', logo: excelAccountingLogo },
    { name: 'Excel Biz', logo: excelBizLogo },
  ];

  return (
    <section style={{
      padding: '3rem 0',
      background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
      border: '1px solid rgba(52, 152, 219, 0.3)',
      margin: '2rem 0'
    }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Our Partners</h2>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem', color: '#2c3e50' }}>
          We collaborate with leading organizations committed to empowering job seekers and creating inclusive employment opportunities for unemployed, part-time, and freelance professionals.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2.5rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
        }}>
          {supporters.map((supporter, index) => (
            <div key={index} style={{ textAlign: 'center', width: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={supporter.logo}
                alt={`${supporter.name} logo`}
                style={{
                  maxWidth: '100%',
                  height: '60px',
                  objectFit: 'contain',
                  marginBottom: '0.5rem',
                  background: 'white',
                  borderRadius: '12px',
                  border: '2px solid var(--primary-blue)',
                  boxShadow: 'var(--card-glow)',
                  padding: '10px',
                }}
              />
              <span style={{ color: '#2c3e50', fontWeight: 500 }}>{supporter.name}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', color: '#2c3e50', marginTop: '2rem' }}>
          <h3 style={{ color: 'var(--primary-blue)' }}>Become a Partner</h3>
          <p>Join our network of socially responsible organizations committed to creating meaningful employment opportunities and supporting talent development.</p>
          <ul style={{
            listStyle: 'disc',
            textAlign: 'left',
            maxWidth: '500px',
            margin: '1.5rem auto',
            color: '#2c3e50',
            fontSize: '1rem',
          }}>
            <li>Expose job opportunities for diverse talent</li>
            <li>Access our pool of qualified candidates</li>
            <li>Participate in networking events</li>
            <li>Support the X Talents Ecosystem</li>
          </ul>
          <a
            href="mailto:xtalentsfoundation@gmail.com?subject=Become%20a%20Partner&body=Hello%20X%20Talents%2C%0A%0AI'd%20like%20to%20become%20a%20partner%20and%20support%20your%20mission.%0A%0A"
            className="cta-button"
            style={{
              marginTop: '1rem',
              background: 'var(--welcome-gradient)',
              border: 'none',
              boxShadow: 'var(--card-glow)',
              color: 'white',
              textDecoration: 'none',
              display: 'inline-block',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            Become a Partner
          </a>
        </div>
      </div>
    </section>
  );
};

export default SupportersSection;
