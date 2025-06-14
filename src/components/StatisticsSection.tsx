import React from 'react';
import { FaClock, FaUsers, FaBullseye } from 'react-icons/fa';

const StatisticsSection: React.FC = () => {  return (    <section style={{
      background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
      padding: '3rem 0',
      margin: '2rem 0',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
      border: '1px solid rgba(52, 152, 219, 0.3)'
    }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Impact</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div className="stat-card">            <FaUsers style={{ fontSize: '3rem', color: 'var(--primary-blue)', marginBottom: '1rem' }} />
            <h3>2,500+</h3>
            <p>Job Seekers Supported</p>
          </div>
          
          <div className="stat-card">
            <FaBullseye style={{ fontSize: '3rem', color: 'var(--primary-green)', marginBottom: '1rem' }} />
            <h3>1,200+</h3>
            <p>Successful Placements</p>
          </div>
            <div className="stat-card">
            <FaClock style={{ fontSize: '3rem', color: 'var(--primary-blue)', marginBottom: '1rem' }} />
            <h3>150+</h3>
            <p>Partner Organizations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
