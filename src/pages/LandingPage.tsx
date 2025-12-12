import { useState, useEffect } from 'react';
import { Link2, Zap, BarChart3, Shield, ArrowRight, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'; // Import Clerk hook

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  
  // Get user authentication state from Clerk
  const { isSignedIn, isLoaded } = useUser();

  // Redirect to home if user is already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('User is already signed in, redirecting to /home');
      navigate('/home');
    }
  }, [isLoaded, isSignedIn, navigate]);

  const handleShorten = (e: any) => {
    e.preventDefault();
    if (url) {
      setShortened(`lnk.shift/${Math.random().toString(36).substr(2, 6)}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortened);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Show loading state while Clerk is checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#FCF5EE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#850E35] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#850E35]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF5EE]">
      {/* Navigation */}
      <nav className="border-b border-[#FFC4C4]/30 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#850E35]">Link Shift</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-[#850E35] hover:text-[#EE6983] transition-colors">Features</a>
            <a href="#pricing" className="text-[#850E35] hover:text-[#EE6983] transition-colors">Pricing</a>
            
            {/* Show different button based on auth state */}
            {isSignedIn ? (
              <button 
                onClick={() => navigate('/home')}
                className="px-5 py-2 bg-[#850E35] text-white rounded-lg hover:bg-[#EE6983] transition-colors"
              >
                Go to Dashboard
              </button>
            ) : (
              <button 
                onClick={() => navigate('/sign-in')}
                className="px-5 py-2 bg-[#850E35] text-white rounded-lg hover:bg-[#EE6983] transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-[#FFC4C4]/40 rounded-full text-[#850E35] text-sm font-medium">
          ✨ Shorten, Track, and Optimize Your Links
        </div>
        <h1 className="text-6xl font-bold text-[#850E35] mb-6 leading-tight">
          Transform Long URLs<br />Into Powerful Links
        </h1>
        <p className="text-xl text-[#850E35]/70 mb-12 max-w-2xl mx-auto">
          Create short, memorable links in seconds. Track clicks, analyze performance, and boost your online presence.
        </p>

        {/* URL Shortener Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-2 border-[#FFC4C4]">
          <form onSubmit={() => navigate(isSignedIn ? '/home' : '/sign-in')} className="flex gap-3 mb-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="flex-1 px-6 py-4 rounded-xl border-2 border-[#FFC4C4] focus:border-[#EE6983] focus:outline-none text-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-linear-to-r from-[#EE6983] to-[#850E35] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              {isSignedIn ? 'Go to Dashboard' : 'Get Started'} 
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Additional Auth Options */}
          <div className="mt-6 text-center">
            {!isSignedIn && (
              <>
                <p className="text-sm text-[#850E35]/60 mb-3">
                  Already have an account?{' '}
                  <button 
                    onClick={() => navigate('/sign-in')}
                    className="text-[#850E35] font-semibold hover:text-[#EE6983]"
                  >
                    Sign In
                  </button>
                </p>
                <p className="text-sm text-[#850E35]/60">
                  New user?{' '}
                  <button 
                    onClick={() => navigate('/sign-up')}
                    className="text-[#850E35] font-semibold hover:text-[#EE6983]"
                  >
                    Create Account
                  </button>
                </p>
              </>
            )}
          </div>

          <p className="text-sm text-[#850E35]/50 mt-4">
            Fast redirects • Generous Free plan • 99.9% Uptime 
          </p>
        </div>
      </section>

      {/* ... rest of your existing code remains the same ... */}
      
      {/* Footer */}
      <footer className="bg-white border-t border-[#FFC4C4]/30 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-lg flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#850E35]">Link Shift</span>
              </div>
              <p className="text-[#850E35]/60 text-sm">
                Shorten, track, and optimize your links with ease.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#850E35] mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-[#850E35]/60">
                <li><a href="#" className="hover:text-[#EE6983]">Features</a></li>
                <li><a href="#" className="hover:text-[#EE6983]">Pricing</a></li>
                <li><a href="#" className="hover:text-[#EE6983]">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#850E35] mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-[#850E35]/60">
                <li><a href="#" className="hover:text-[#EE6983]">About</a></li>
                <li><a href="#" className="hover:text-[#EE6983]">Blog</a></li>
                <li><a href="#" className="hover:text-[#EE6983]">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#850E35] mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-[#850E35]/60">
                <li><a href="#" className="hover:text-[#EE6983]">Privacy</a></li>
                <li><a href="#" className="hover:text-[#EE6983]">Terms</a></li>
                <li><a href="#" className="hover:text-[#EE6983]">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#FFC4C4]/30 text-center text-sm text-[#850E35]/60">
            © 2024 Link Shift. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}