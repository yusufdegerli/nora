import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import FloatingEmojis from './components/FloatingEmojis';
import './index.css';
import './App.css';

function NavLinks() {
  const location = useLocation();
  
  return (
    <div className="nav-links">
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      >
        Ana Sayfa
      </Link>
      <Link 
        to="/iletisim" 
        className={`nav-link ${location.pathname === '/iletisim' ? 'active' : ''}`}
      >
        İletişim
      </Link>
      <Link 
        to="/admin" 
        className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
      >
        Admin
      </Link>
      <Link to="/iletisim" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
        Randevu Al
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App bg-gradient">
        {/* Background Blobs for Visual Effect */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        
        {/* Floating Emojis Animation */}
        <FloatingEmojis />

        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="container nav-container">
            <Link to="/" className="logo">
              <HeartPulse className="logo-accent" size={28} />
              <span>Vita<span className="logo-accent">Sağlık</span></span>
            </Link>
            <NavLinks />
          </div>
        </nav>

        {/* Page Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer>
          <p>&copy; {new Date().getFullYear()} VitaSağlık Merkezi. Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;