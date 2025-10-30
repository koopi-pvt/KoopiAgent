import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Settings, Crown, Coins, LogOut } from 'lucide-react';
import PageTransition from '../../components/common/PageTransition';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [mobileResponsive, setMobileResponsive] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <span className="text-white text-xl font-bold">K</span>
                </div>
                <span className="text-white font-semibold text-lg">Mindle</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-white text-sm font-medium">Pro</span>
              </button>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Coins className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm font-medium">921.0 Credits</span>
              </div>

              <button className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                W
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-8">
            <p className="text-white/60 text-sm mb-2">Welcome back, W.Navidu Sathsara Weerakon</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Build your next{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                portfolio
              </span>
            </h1>
            <p className="text-white/50 text-lg">
              Transform your ideas into stunning, mobile-responsive websites with the power of AI
            </p>
          </div>

          {/* Generator Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white font-medium">Website Generator</span>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-white/60 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    Mobile Responsive
                  </span>
                  <div
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      mobileResponsive ? 'bg-green-500' : 'bg-white/10'
                    }`}
                    onClick={() => setMobileResponsive(!mobileResponsive)}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        mobileResponsive ? 'translate-x-6' : ''
                      }`}
                    />
                  </div>
                </label>

                <button className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors">
                  <Settings className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Build me a dashboard for..."
              className="w-full h-64 bg-black/30 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 resize-none focus:outline-none focus:border-white/30 transition-colors font-mono text-sm"
            />

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Mindle G1</span>
                <span className="text-white/20">|</span>
                <span>921.1 credits</span>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-lg shadow-cyan-500/20"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <button className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all group">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Templates</h3>
              <p className="text-white/50 text-sm">Start with pre-built designs</p>
            </button>

            <button className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all group">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Settings className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">My Projects</h3>
              <p className="text-white/50 text-sm">View your saved websites</p>
            </button>

            <button className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all group">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Crown className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-1">Upgrade</h3>
              <p className="text-white/50 text-sm">Get unlimited access</p>
            </button>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
