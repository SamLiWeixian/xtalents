import React, { useEffect } from 'react';
import { FaHandshake, FaHeart, FaChartLine } from 'react-icons/fa';
import samLiImage from '../assets/team/sam-li.jpg';
import hansChenImage from '../assets/team/hans-chen.jpg';

const iconStyle = { fontSize: '3rem', color: 'var(--primary-green)', marginBottom: '1rem' };


const AboutPage: React.FC = () => {
  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);
  return (  <main className="container" id="about-page"><section className="mission-section" style={{
      maxWidth: '800px',
      margin: '0 auto 2rem auto',
      padding: '2rem',
      background: 'var(--subtle-gradient)',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)'
    }}>
      <h1>About X Talents</h1>
      <h2>Our Mission</h2>
      <p>
        X Talents is dedicated to supporting job seekers in Singapore by providing access to jobs, resources, and a caring network. We believe everyone deserves meaningful work that aligns with their aspirations.
      </p>
    </section>

    <section>
      <h2>Our Core Values</h2>      <div className="services-grid" style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        margin: '2rem 0'
      }}>        <div style={{ 
          textAlign: 'center', 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))', 
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>
          <FaHandshake style={iconStyle} />
          <h3>Dignity</h3>
          <p>We believe everyone deserves to find work with dignity and respect, regardless of their circumstances.</p>
        </div>
          <div style={{ 
          textAlign: 'center', 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))', 
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>
          <FaHeart style={iconStyle} />
          <h3>Compassion</h3>
          <p>We approach every job seeker with empathy and understanding of their unique situation.</p>
        </div>
          <div style={{ 
          textAlign: 'center', 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))', 
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>
          <FaChartLine style={iconStyle} />
          <h3>Growth</h3>
          <p>We're committed to helping people develop and reach their full potential.</p>
        </div>
      </div>    </section>

    <section className="founders-section" style={{
      margin: '3rem auto',
      maxWidth: '900px'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Co-Founders</h2>
      <div className="founders-grid" style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        margin: '2rem 0'
      }}>        <div className="founder" style={{
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>          <div style={{
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'var(--welcome-gradient)',
              margin: '0 auto 1.5rem auto'
            }}>
            <img 
              src={samLiImage} 
              alt="Dr. Sam Li"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Dr. Sam Li</h3>
          <p style={{ fontStyle: 'italic', color: 'var(--primary-blue)', marginBottom: '1rem' }}>Co-Founder</p>
          <p>Leading X Talents with a vision to create opportunities for job seekers across Singapore through innovative programs and partnerships.</p>
        </div>
          <div className="founder" style={{
          background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>          <div style={{
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'var(--welcome-gradient)',
              margin: '0 auto 1.5rem auto'
            }}>
            <img 
              src={hansChenImage} 
              alt="Hans Chen"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Hans Chen</h3>
          <p style={{ fontStyle: 'italic', color: 'var(--primary-blue)', marginBottom: '1rem' }}>Co-Founder</p>
          <p>Bringing strategic vision and technical expertise to help X Talents bridge the gap between job seekers and meaningful employment opportunities.</p>
        </div>
      </div>    </section><section>
      <h2>Connect With Us</h2>
      <p>
        Learn more about us on our <a href="https://www.linkedin.com/company/x-talents-foundation/" target="_blank" rel="noopener noreferrer">LinkedIn page</a> or get in touch via email at <a href="mailto:xtalentsfoundation@gmail.com">xtalentsfoundation@gmail.com</a>.
      </p>    </section>
  </main>
  );
};

export default AboutPage;
