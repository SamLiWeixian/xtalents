import React from 'react';

// The Google Form link is directly used in the component's JSX

const ResumeUploadPage: React.FC = () => {
  return (
    <main className="container">      <h1>Submit Your Profile & Resume</h1>
        <div className="upload-container" style={{
        maxWidth: '800px',
        margin: '0 auto 2rem auto',
        padding: '2rem',
        background: 'var(--subtle-gradient)',
        borderRadius: '10px',
        boxShadow: 'var(--card-glow)',
        textAlign: 'center',
        color: '#2c3e50',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-blue)' }}>Join Our X Talents Pool</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#2c3e50' }}>
          Share your information and resume with us so we can display your profile in our X Talents Pool 
          and help match you with suitable opportunities.
        </p>
        
        <div style={{ margin: '2rem auto' }}>          <p style={{ 
            fontSize: '1.2rem', 
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: '#2c3e50'
          }}>
            Please click the button below to fill out our Google Form
          </p>
            <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLScyK2E0-HZE43q-j1TiSxkKaNJVgP6hmQx8mv2kCaI63GsvQA/viewform?usp=header" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-button"            style={{ 
              display: 'inline-block',
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              margin: '1rem 0 2rem',
              background: 'white',
              color: 'var(--primary-blue)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              border: '1px solid var(--primary-blue)'
            }}
          >
            Get Started Today
          </a>
            <p style={{ fontSize: '0.9rem', color: '#2c3e50', marginTop: '1rem' }}>
            This form will allow you to share your professional information and upload your resume
          </p>
        </div>
      </div>
          <div style={{ 
        marginTop: '2rem', 
        maxWidth: '800px', 
        margin: '0 auto',
        padding: '2rem',
        background: 'var(--subtle-gradient)',
        borderRadius: '10px',
        boxShadow: 'var(--card-glow)',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>        
        <h2 style={{ color: 'var(--primary-blue)' }}>What Happens Next?</h2>
        <ol style={{ lineHeight: '1.6' }}>
          <li>Your profile is reviewed by our team (typically within 48 hours)</li>
          <li>We may contact you to discuss additional job preferences and goals</li>
          <li>Your profile is added to our X Talents Pool for employers to view</li>
          <li>We actively match you with suitable opportunities from our network</li>
          <li>We provide ongoing support throughout your job search process</li>
        </ol>
        
        <p style={{ marginTop: '2rem' }}>
          For any questions, please email us at <a href="mailto:xtalentsfoundation@gmail.com">xtalentsfoundation@gmail.com</a>.
        </p>
      </div>
    </main>
  );
};

export default ResumeUploadPage;
