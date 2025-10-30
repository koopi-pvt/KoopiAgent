import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CreditCard, Crown, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardNavProps {
  user: {
    name: string;
    email: string;
    membership: string;
    credits: number;
    avatar?: string;
  };
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/dashboard" className="flex items-center">
            <div className="logo-container">
              <span className="text-white text-3xl font-bold tracking-tight">K</span>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <CreditCard className="w-4 h-4 text-white/60" />
              <span className="text-white/80 font-medium">{user.credits} credits</span>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-white font-medium hidden sm:inline">{user.name}</span>
                <ChevronDown className={`w-4 h-4 text-white/60 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-black/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-slide-up">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{user.name}</p>
                        <p className="text-white/60 text-sm">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center space-x-2">
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-medium">{user.membership}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <div className="flex items-center justify-between px-4 py-3 text-white/80 hover:bg-white/5 rounded-xl transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-white/60" />
                        <span>Credits</span>
                      </div>
                      <span className="font-semibold">{user.credits}</span>
                    </div>

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-white/5 rounded-xl transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5 text-white/60" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}