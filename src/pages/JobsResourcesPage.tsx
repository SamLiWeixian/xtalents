import React from 'react';
import { FaBriefcase, FaFileAlt, FaGraduationCap } from 'react-icons/fa';

const iconStyle = { fontSize: '1.5rem', color: '#39FF14', marginRight: '0.5rem' };

const JobsResourcesPage: React.FC = () => (
  <main className="container">
    <h1>Jobs & Resources</h1>
    
    <section>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <FaBriefcase style={iconStyle} />
        <h2 style={{ margin: 0 }}>Latest Opportunities</h2>
      </div>        <div className="job-card" style={{
        background: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--card-glow)',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>        <h3>Community Outreach Coordinator</h3>
        <p><strong>Organization:</strong> Singapore Care Network</p>
        <p><strong>Type:</strong> Full-time</p>        <p>Join our team to coordinate outreach programs that serve vulnerable communities in Singapore. This role requires excellent communication skills and a passion for social work.</p>
        <a 
          href="mailto:xtalentsfoundation@gmail.com?subject=Interest%20in%20Community%20Outreach%20Position&body=Hello%20X%20Talents,%0A%0AI'm%20interested%20in%20the%20Community%20Outreach%20Coordinator%20position.%20Please%20provide%20more%20details.%0A%0ARegards," 
          className="cta-button" 
          style={{ 
            fontSize: '0.9rem',
            textDecoration: 'none'
          }}
        >
          Apply Now
        </a>
      </div>
        <div className="job-card" style={{
        background: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--card-glow)',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>        <h3>Digital Marketing Associate</h3>
        <p><strong>Organization:</strong> Tech For Good SG</p>
        <p><strong>Type:</strong> Part-time (20hrs/week)</p>        <p>Help promote our technology initiatives that support community development. Perfect for those with social media and content creation skills.</p>
        <a 
          href="mailto:xtalentsfoundation@gmail.com?subject=Interest%20in%20Digital%20Marketing%20Position&body=Hello%20X%20Talents,%0A%0AI'm%20interested%20in%20the%20Digital%20Marketing%20Associate%20position.%20Please%20provide%20more%20details.%0A%0ARegards," 
          className="cta-button" 
          style={{ 
            fontSize: '0.9rem',
            textDecoration: 'none'
          }}
        >
          Apply Now
        </a>
      </div>
        <div className="job-card" style={{
        background: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--card-glow)',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>        <h3>Administrative Assistant</h3>
        <p><strong>Organization:</strong> Skills Future Alliance</p>
        <p><strong>Type:</strong> Freelance</p>        <p>Provide administrative support for our training programs. Flexible hours and remote work options available.</p>
        <a 
          href="mailto:xtalentsfoundation@gmail.com?subject=Interest%20in%20Administrative%20Assistant%20Position&body=Hello%20X%20Talents,%0A%0AI'm%20interested%20in%20the%20Administrative%20Assistant%20position.%20Please%20provide%20more%20details.%0A%0ARegards," 
          className="cta-button" 
          style={{ 
            fontSize: '0.9rem',
            textDecoration: 'none'
          }}
        >
          Apply Now
        </a>
      </div>
    </section>
    
    <section style={{ marginTop: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <FaGraduationCap style={iconStyle} />
        <h2 style={{ margin: 0 }}>Skills Development</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>        <div className="job-card" style={{
          background: 'white',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--card-glow)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>          <h3>Resume Writing Workshop</h3>
          <p>Free virtual workshop every Tuesday</p>          <p>Learn how to create a resume that stands out to employers.</p>
          <a 
            href="mailto:xtalentsfoundation@gmail.com?subject=Interest%20in%20Resume%20Writing%20Workshop&body=Hello%20X%20Talents,%0A%0AI'm%20interested%20in%20joining%20the%20Resume%20Writing%20Workshop.%20Please%20provide%20registration%20details.%0A%0ARegards," 
            className="cta-button" 
            style={{ 
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            Register Now
          </a>
        </div>
          <div className="job-card" style={{
          background: 'white',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--card-glow)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        }}>          <h3>Interview Skills Training</h3>
          <p>Monthly in-person sessions</p>          <p>Practice common interview questions and receive feedback from HR professionals.</p>
          <a 
            href="mailto:xtalentsfoundation@gmail.com?subject=Interest%20in%20Interview%20Skills%20Training&body=Hello%20X%20Talents,%0A%0AI'm%20interested%20in%20joining%20the%20Interview%20Skills%20Training%20sessions.%20Please%20provide%20registration%20details.%0A%0ARegards," 
            className="cta-button" 
            style={{ 
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
    
    <section style={{ marginTop: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <FaFileAlt style={iconStyle} />
        <h2 style={{ margin: 0 }}>Helpful Resources</h2>
      </div>
      
      <ul className="resources-list">
        <li>
          <a href="https://www.hays.co.uk/recruitment/charities-not-for-profit" target="_blank" rel="noopener noreferrer">
            Hays Charity & Not-for-Profit
          </a>
        </li>
        <li>
          <a href="https://charitypeople.co.uk/" target="_blank" rel="noopener noreferrer">
            Charity People
          </a>
        </li>
        <li>          <a href="https://www.linkedin.com/company/x-talents-foundation/" target="_blank" rel="noopener noreferrer">
            X Talents LinkedIn
          </a>
        </li>
        <li>
          <a href="https://www.wsg.gov.sg/" target="_blank" rel="noopener noreferrer">
            Workforce Singapore (WSG)
          </a>
        </li>
      </ul>
    </section>
  </main>
);

export default JobsResourcesPage;
