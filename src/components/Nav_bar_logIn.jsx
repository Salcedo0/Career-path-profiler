import React from 'react';
import { Search, Bell } from 'lucide-react';
import '../styles/navbarlogin.css'; // Ensure this path is correct

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-icon">m</div>
            <span className="logo-text">Magneto365</span>
          </div>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Navigation & User */}
          <div className="nav-user-section">
            <nav className="navigation">
              <a href="#" className="nav-link">Home</a>
              <a href="#" className="nav-link active">Jobs</a>
              <a href="#" className="nav-link">Profiles</a>
              <a href="#" className="nav-link">Messages</a>
            </nav>
            
            <div className="user-actions">
              <button className="notification-btn">
                <Bell className="w-5 h-5" />
                <span className="notification-badge"></span>
              </button>
              <div className="user-profile">
                <div className="user-avatar">
                  <span className="user-avatar-text">JD</span>
                </div>
                <span className="user-name">John Doe</span>
                <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;