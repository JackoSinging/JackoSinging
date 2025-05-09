import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <h1>JackoSinging</h1>
        <p className="tagline">Create with Jacko, Stream the World</p>
      </div>
      <nav className="main-nav">
        <ul>
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">My Music</a></li>
          <li><a href="#">Discover</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
      <div className="user-controls">
        <button className="connect-wallet-btn">Connect Wallet</button>
      </div>
    </header>
  );
};

export default Header;