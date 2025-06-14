import React from 'react';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    text: "X Talents helped me land a position that aligns with my skills and personal circumstances. Their personalized approach made all the difference.",
    author: "Mei Lin",
    position: "Digital Marketing Specialist",
    image: "marketing-symbol"
  },
  {
    id: 2,
    text: "After struggling to find part-time work that fit my schedule as a parent, X Talents connected me with the perfect opportunity. I'm so grateful for their support.",
    author: "Ahmed Khan",
    position: "Project Coordinator",
    image: "project-symbol"
  },
  {
    id: 3,
    text: "The workshops and resources provided by X Talents gave me the confidence to pursue my dream career. Now I'm working in a role I love.",
    author: "Sarah Tan",
    position: "Community Outreach Officer",
    image: "community-symbol"
  }
];

const TestimonialsSection: React.FC = () => {
  return (    <section style={{ 
        padding: '3rem 0',
        background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(57, 255, 20, 0.1))',
        borderRadius: '10px',
        margin: '2rem 0',
        boxShadow: '0 4px 15px rgba(57, 255, 20, 0.1)',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Success Stories</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map(testimonial => (            <div key={testimonial.id} style={{
              background: 'white',
              borderRadius: '8px',
              padding: '2rem',
              boxShadow: '0 4px 12px rgba(57, 255, 20, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(52, 152, 219, 0.2)'
            }}>
              <div style={{ fontSize: '1.5rem', color: '#39FF14', marginBottom: '1rem' }}>❝</div>
              <p style={{ flex: 1, fontStyle: 'italic', marginBottom: '1.5rem' }}>"{testimonial.text}"</p>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    marginRight: '1rem',
                    backgroundColor: 'white',
                    border: '2px solid #39FF14',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.8rem',
                    color: '#39FF14'
                  }}
                >
                  {testimonial.position.includes('Marketing') ? '📱' : 
                   testimonial.position.includes('Project') ? '📋' : 
                   testimonial.position.includes('Community') ? '🤝' : '👤'}
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>{testimonial.author}</p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
