import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import logo from "../assets/images/xtalentslogo.png";
import { navLinks } from "../utils/navLinks";

const Footer: React.FC = () => {
  const location = useLocation();    return (    <footer style={{ 
      background: 'var(--welcome-gradient)', 
      color: "white", 
      padding: "2rem 1rem" 
    }}>
      <div
        className="footer-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link to="/" style={{ marginBottom: "1.5rem" }}>
          <img src={logo} alt="X Talents Logo" style={{ height: "180px" }} />
        </Link>
        
        {/* Quick Links Navigation */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "white", textAlign: "center", marginBottom: "1rem" }}>Quick Links</h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "1.5rem",
              margin: 0,
              padding: 0,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >          {navLinks.map((link) => (
              <li key={link.to}>                <Link
                  to={link.to}                  style={{                    
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 600,
                    transition: "all 0.2s ease",
                    padding: "0.5rem 0.75rem",
                    borderBottom: location.pathname === link.to ? "2px solid var(--primary-green)" : "none",
                    background: location.pathname === link.to ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    borderRadius: "4px",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
          <div
          className="social-icons"
          style={{ marginBottom: "1.5rem", display: "flex", gap: "1.5rem" }}        >
          <a 
            href="https://www.linkedin.com/company/x-talents-foundation/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Visit X Talents Foundation on LinkedIn"
          >
            <FaLinkedin size={24} color="white" style={{ cursor: "pointer" }} />
          </a>
        </div>
          <p style={{ margin: 0, color: "white" }}>
          &copy; 2025 X Talents. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;