import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <div className="logo-container">
              <span className="text-white text-3xl font-bold tracking-tight">K</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-white/80 hover:text-white transition-colors duration-300 px-4 py-2">
              Login
            </Link>
            <Link to="/signup" className="cta-button px-6 py-2.5 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
