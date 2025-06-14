import React, { useState } from 'react';
import { FaUserTie, FaMapMarkerAlt, FaBriefcase, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTalent } from '../context/TalentContext';

const PAGE_SIZE = 3;

const TalentPoolPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { talents } = useTalent();
  const totalPages = Math.ceil(talents.length / PAGE_SIZE);

  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const visibleTalents = talents.slice(startIdx, endIdx);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  return (    <main className="container">
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 2rem auto',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>
        <h1>X Talents Pool</h1>
        <p>Meet some of the talented job seekers in our community. Interested in connecting? <a href="mailto:xtalentsfoundation@gmail.com">Contact us</a> for more info.</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
        minHeight: 400
      }}>
        {visibleTalents.map(talent => (          <div key={talent.id} style={{
            background: 'var(--subtle-gradient)',
            borderRadius: '10px',
            boxShadow: 'var(--card-glow)',
            border: '1px solid rgba(52, 152, 219, 0.3)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 140,
            textAlign: 'center'
          }}><div style={{ 
                width: 100, 
                height: 100, 
                borderRadius: '50%', 
                background: 'var(--welcome-gradient)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2.5rem',
                color: 'white',
                marginBottom: '1rem' 
              }}>
                {talent.profession.includes('Designer') ? '🎨' : 
                 talent.profession.includes('Developer') ? '💻' : 
                 talent.profession.includes('Project') ? '📋' : 
                 talent.profession.includes('Customer') ? '🤝' : 
                 talent.profession.includes('Content') || talent.profession.includes('Writer') ? '✍️' : 
                 talent.profession.includes('Data') ? '📊' : '👤'}
              </div>
            <h2 style={{ margin: '0.5rem 0' }}>{talent.name}</h2>
            <p style={{ color: 'var(--primary-blue)', fontWeight: 600, margin: 0 }}><FaUserTie /> {talent.profession}</p>
            <p style={{ margin: '0.5rem 0' }}><FaMapMarkerAlt /> {talent.location} &nbsp; | &nbsp; <FaBriefcase /> {talent.experience} experience</p>
            <p style={{ fontSize: '0.95rem', margin: '0.5rem 0 1rem 0' }}>{talent.about}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>              {talent.skills.map(skill => (
                <span key={skill} style={{ 
                  background: 'var(--primary-green)',
                  color: '#000000', 
                  borderRadius: '12px', 
                  padding: '0.3rem 0.8rem', 
                  fontSize: '0.9rem',
                  boxShadow: '0 2px 5px rgba(57, 255, 20, 0.2)'
                }}>{skill}</span>
              ))}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'auto', paddingTop: '1rem' }}>              <a 
                href="mailto:xtalentsfoundation@gmail.com?subject=Interested%20in%20Talent&body=Hello%20X%20Talents,%0A%0AI'm%20interested%20in%20connecting%20with%20this%20talent.%20Please%20provide%20more%20information.%0A%0ARegards,"
                className="cta-button" 
                style={{ 
                  width: '80%', 
                  maxWidth: '200px',
                  background: 'var(--welcome-gradient)',
                  border: 'none',
                  boxShadow: 'var(--card-glow)',
                  textDecoration: 'none',
                  display: 'inline-block',
                  textAlign: 'center'
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', margin: '2rem 0' }}>        <button 
          className="cta-button" 
          onClick={handlePrev} 
          disabled={page === 1} 
          aria-label="Previous Page"
          style={{
            background: 'var(--welcome-gradient)',
            border: 'none',
            boxShadow: 'var(--card-glow)'
          }}
        >
          <FaChevronLeft /> Prev
        </button>
        <span style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>
          Page {page} of {totalPages}
        </span>
        <button 
          className="cta-button" 
          onClick={handleNext} 
          disabled={page === totalPages} 
          aria-label="Next Page"
          style={{
            background: 'var(--welcome-gradient)',
            border: 'none',
            boxShadow: 'var(--card-glow)'
          }}
        >
          Next <FaChevronRight />
        </button>
      </div>
    </main>
  );
};

export default TalentPoolPage;
