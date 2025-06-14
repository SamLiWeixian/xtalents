import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const eventsData = [
  {
    id: 1,
    title: "Resume Writing Workshop",
    date: "June 15, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Online (Zoom)",
    description: "Learn how to create a standout resume that will catch employers' attention.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "Job Fair: Non-Profit & Charity Sector",
    date: "June 22, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Singapore Community Hub, 50 Orchard Road",
    description: "Meet representatives from leading non-profit and charity organizations hiring in Singapore.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "Interview Skills Masterclass",
    date: "June 28, 2025",
    time: "1:00 PM - 3:30 PM",
    location: "X Talents Office, 123 Orchard Road",
    description: "Practice interview techniques and get feedback from HR professionals.",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

const EventsPage: React.FC = () => {
  return (
    <main className="container">
      <h1>Upcoming Events</h1>
      <p>Join us at our upcoming events to enhance your skills, meet potential employers, and connect with other job seekers.</p>
      
      <div style={{ marginTop: '2rem' }}>
        {eventsData.map(event => (          <div key={event.id} style={{
            background: 'white',
            borderRadius: '8px',
            boxShadow: 'var(--card-glow)',
            border: '1px solid rgba(52, 152, 219, 0.3)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 0 2rem 0'
          }}><div style={{ 
              display: 'flex', 
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%'
            }}>
              <div style={{ 
                flex: '1 1 250px',
                minHeight: '200px',
                backgroundImage: `url(${event.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              
              <div style={{ flex: '2 1 400px', padding: '1.5rem' }}>
                <h2 style={{ margin: '0 0 0.5rem 0' }}>{event.title}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', margin: '0.75rem 0' }}>
                  <FaCalendarAlt style={{ color: '#39FF14', marginRight: '0.5rem' }} />
                  <span>{event.date} | {event.time}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', margin: '0.75rem 0' }}>
                  <FaMapMarkerAlt style={{ color: '#39FF14', marginRight: '0.5rem' }} />
                  <span>{event.location}</span>
                </div>
                
                <p style={{ margin: '1rem 0' }}>{event.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaUsers style={{ color: '#00695c', marginRight: '0.5rem' }} />
                    <span>Limited spots available</span>
                  </div>
                  <a 
                    href="mailto:xtalentsfoundation@gmail.com?subject=Event%20Registration&body=Hello%20X%20Talents,%0A%0AI%20would%20like%20to%20register%20for%20the%20upcoming%20event.%20Please%20provide%20registration%20details.%0A%0ARegards," 
                    className="cta-button"
                    style={{
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
        <div style={{
        background: 'var(--subtle-gradient)',
        padding: '2rem',
        borderRadius: '8px',
        marginTop: '2rem',
        border: '1px solid rgba(52, 152, 219, 0.3)'
      }}>
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter to receive notifications about upcoming events and workshops.</p>
        
        <form style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <input 
            type="email" 
            placeholder="Your email address" 
            style={{ 
              flex: '1 1 250px',
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #b2dfdb'
            }}
            aria-label="Email address"
          />          <button 
            type="submit"            
            className="cta-button"
            style={{
              flex: '0 1 auto',
              border: 'none',
              borderRadius: '4px',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              background: 'var(--welcome-gradient)',
              boxShadow: 'var(--card-glow)'
            }}          >
            Get Started Today
          </button>
        </form>
      </div>
    </main>
  );
};

export default EventsPage;
