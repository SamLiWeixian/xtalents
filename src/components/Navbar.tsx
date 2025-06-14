import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/xtalentslogo.png";
import { navLinks } from "../utils/navLinks";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when route changes or when clicking outside
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Function to determine if a path is active (accounts for nested routes)
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return path !== "/" && location.pathname.startsWith(path);
  };  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src={logo} alt="X Talents Logo" style={{ height: "200px" }} />
          </Link>
        </div>
        
        <div className="nav-center">
          <ul className={`nav-links ${menuOpen ? 'nav-active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={isActive(link.to) ? 'highlight-link' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="nav-right">
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes color="var(--primary-blue)" /> : <FaBars color="var(--primary-blue)" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
