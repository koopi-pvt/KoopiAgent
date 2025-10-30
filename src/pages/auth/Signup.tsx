import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, AlertCircle, CheckCircle, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signUp(email, password, fullName);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 flex items-center justify-center px-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delay" />
        </div>

        <div className="max-w-md w-full relative z-10">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center shadow-2xl animate-slide-up">
            <div className="w-20 h-20 bg-white/20 border-2 border-white/40 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-white font-bold text-3xl mb-3">Check Your Email!</h2>
            <p className="text-white/80 text-base mb-6 leading-relaxed">
              We've sent a confirmation link to <strong className="text-white">{email}</strong>. 
              Click the link to verify your account and get started.
            </p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-6">
              <p className="text-white/70 text-sm">
                <strong className="text-white">Pro Tip:</strong> Check your spam folder if you don't see it in a few minutes.
              </p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all shadow-lg inline-flex items-center space-x-2"
            >
              <span>Back to Login</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delay" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center mb-8 group">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 group-hover:scale-110 transition-all duration-300">
            <span className="text-white text-3xl font-bold tracking-tight">K</span>
          </div>
        </Link>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white font-bold text-3xl mb-2">Create Account</h1>
            <p className="text-white/70 text-base">Start building amazing projects today</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl flex items-start space-x-3 backdrop-blur-sm animate-slide-up">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm flex-1">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium block">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
                <input
                  data-testid="signup-name-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all backdrop-blur-sm"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium block">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
                <input
                  data-testid="signup-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all backdrop-blur-sm"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-white/90 text-sm font-medium block">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/70 transition-colors" />
                <input
                  data-testid="signup-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all backdrop-blur-sm"
                  required
                  minLength={6}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-white/50 text-xs">Must be at least 6 characters</p>
            </div>

            {/* Submit Button */}
            <button
              data-testid="signup-submit-button"
              type="submit"
              disabled={loading}
              className="w-full bg-white text-pink-600 rounded-xl py-3.5 font-semibold hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg mt-6 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/60">or</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white/70 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:underline font-semibold transition-all">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/50 text-sm mt-6">
          © 2025 KoopiAgent. All rights reserved.
        </p>
      </div>
    </div>
  );
}
