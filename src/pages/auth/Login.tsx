import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Zap, Wifi } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const nodes: Node[] = [];
    const nodeCount = 40;
    const connectionDistance = 150;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />

      <div className="w-full max-w-6xl mx-auto px-6 py-12 relative z-10 flex items-center gap-12">
        <div className="hidden lg:flex flex-1 relative">
          <div className="w-full h-[550px] relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Wifi className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 text-center">Instant Access</h2>
                <p className="text-white/70 text-center mb-6">
                  Connect to your workspace instantly and start building amazing websites in seconds
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/60 text-sm">
                    <Zap className="w-4 h-4 flex-shrink-0" />
                    <span>Lightning-fast authentication</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-sm">
                    <Zap className="w-4 h-4 flex-shrink-0" />
                    <span>Seamless workspace sync</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-sm">
                    <Zap className="w-4 h-4 flex-shrink-0" />
                    <span>Real-time collaboration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[450px]">
        <Link to="/" className="flex justify-center mb-8">
          <div className="logo-container">
            <span className="text-white text-3xl font-bold">K</span>
          </div>
        </Link>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
          <p className="text-white/60 text-center mb-8">Sign in to your account</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black rounded-xl py-3.5 font-semibold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
