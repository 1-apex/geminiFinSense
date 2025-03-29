import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          Gemini FinSense
        </Link>

        <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`}>
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className="nav__link">Chat</Link>
            </li>
            <li className="nav__item">
              <Link to="/profile" className="nav__link">Profile</Link>
            </li>
          </ul>
        </div>

        <div className="nav__profile">
          {user ? (
            <Link to="/profile" className="profile-link">
              <img 
                src={user.avatar || 'default-avatar.png'} 
                alt="Profile" 
                className="profile-avatar"
              />
              <span className="profile-name">{user.name}</span>
            </Link>
          ) : (
            <Link to="/login" className="button button--small">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;