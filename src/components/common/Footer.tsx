import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-white text-2xl font-bold">K</span>
            <span className="text-white/60">KoopiAgent</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
              Home
            </Link>
            <Link to="/login" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
              Login
            </Link>
            <Link to="/signup" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">
              Sign Up
            </Link>
          </div>

          <div className="text-white/40 text-sm">
            © {currentYear} KoopiAgent. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
