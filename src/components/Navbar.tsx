import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/xtalentslogo.png";
import { navLinks } from "../utils/navLinks";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll events for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Function to determine if a path is active (accounts for nested routes)
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return path !== "/" && location.pathname.startsWith(path);
  };
  
  // Handle body overflow when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="container">
        <div className="nav-left">
          <Link to="/" className="logo" aria-label="X Talents Home">
            <img 
              src={logo} 
              alt="X Talents Logo"
              className="logo-image"
            />
          </Link>
        </div>
        
        <div className="nav-center">
          <ul className={`nav-links ${menuOpen ? 'nav-active' : ''}`}>
            {navLinks.map((link, index) => (
              <li key={link.to} style={{ '--i': index } as React.CSSProperties}>
                <Link
                  to={link.to}
                  className={isActive(link.to) ? 'highlight-link' : ''}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>        </div>
        <div className="nav-right">
          <button 
            className={`mobile-menu-btn ${menuOpen ? 'mobile-menu-btn-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              title={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
