import { useState } from 'react';
import { Link2, Zap, BarChart3, Shield, ArrowRight, Copy, Check } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = (e:any) => {
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
            <button className="px-5 py-2 bg-[#850E35] text-white rounded-lg hover:bg-[#EE6983] transition-colors">
              Sign In
            </button>
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
          <form onSubmit={handleShorten} className="flex gap-3 mb-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="flex-1 px-6 py-4 rounded-xl border-2 border-[#FFC4C4] focus:border-[#EE6983] focus:outline-none text-lg"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-linear-to-r from-[#EE6983] to-[#850E35] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              Shorten <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {shortened && (
            <div className="flex items-center gap-3 p-4 bg-[#FCF5EE] rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex-1 text-left">
                <p className="text-sm text-[#850E35]/60 mb-1">Your shortened link:</p>
                <p className="text-lg font-semibold text-[#850E35]">{shortened}</p>
              </div>
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-[#850E35] text-white rounded-lg hover:bg-[#EE6983] transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}

          <p className="text-sm text-[#850E35]/50 mt-4">
            No registration required • Free forever • Unlimited links
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#850E35] mb-4">Why Choose Link Shift?</h2>
            <p className="text-lg text-[#850E35]/70">Everything you need to manage your links effectively</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FCF5EE] border-2 border-[#FFC4C4] hover:border-[#EE6983] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#850E35] mb-3">Lightning Fast</h3>
              <p className="text-[#850E35]/70">
                Shorten your links in milliseconds with our optimized infrastructure. No waiting, no delays.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FCF5EE] border-2 border-[#FFC4C4] hover:border-[#EE6983] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#850E35] mb-3">Advanced Analytics</h3>
              <p className="text-[#850E35]/70">
                Track clicks, geographic data, devices, and referrers. Get insights that matter for your business.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FCF5EE] border-2 border-[#FFC4C4] hover:border-[#EE6983] transition-all hover:shadow-lg">
              <div className="w-14 h-14 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#850E35] mb-3">Secure & Reliable</h3>
              <p className="text-[#850E35]/70">
                Your links are protected with enterprise-grade security. 99.9% uptime guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-linear-to-r from-[#EE6983] to-[#850E35]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">10M+</div>
              <div className="text-[#FCF5EE] text-lg">Links Shortened</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">500K+</div>
              <div className="text-[#FCF5EE] text-lg">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">99.9%</div>
              <div className="text-[#FCF5EE] text-lg">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#850E35] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-[#850E35]/70">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FCF5EE] border-2 border-[#FFC4C4]">
              <h3 className="text-2xl font-bold text-[#850E35] mb-2">Free</h3>
              <div className="text-4xl font-bold text-[#850E35] mb-6">$0<span className="text-lg font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-[#850E35]/70">
                  <span className="text-[#EE6983] mt-1">✓</span>
                  <span>100 links per month</span>
                </li>
                <li className="flex items-start gap-2 text-[#850E35]/70">
                  <span className="text-[#EE6983] mt-1">✓</span>
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-start gap-2 text-[#850E35]/70">
                  <span className="text-[#EE6983] mt-1">✓</span>
                  <span>Standard support</span>
                </li>
              </ul>
              <button className="w-full py-3 border-2 border-[#850E35] text-[#850E35] rounded-xl font-semibold hover:bg-[#850E35] hover:text-white transition-colors">
                Get Started
              </button>
            </div>

            <div className="p-8 rounded-2xl bg-linear-to-br from-[#EE6983] to-[#850E35] border-2 border-[#850E35] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FCF5EE] text-[#850E35] rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-6">$12<span className="text-lg font-normal">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-white">
                  <span className="mt-1">✓</span>
                  <span>Unlimited links</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <span className="mt-1">✓</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <span className="mt-1">✓</span>
                  <span>Custom domains</span>
                </li>
                <li className="flex items-start gap-2 text-white">
                  <span className="mt-1">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-white text-[#850E35] rounded-xl font-semibold hover:bg-[#FCF5EE] transition-colors">
                Start Free Trial
              </button>
            </div>

            <div className="p-8 rounded-2xl bg-[#FCF5EE] border-2 border-[#FFC4C4]">
              <h3 className="text-2xl font-bold text-[#850E35] mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-[#850E35] mb-6">Custom</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-[#850E35]/70">
                  <span className="text-[#EE6983] mt-1">✓</span>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start gap-2 text-[#850E35]/70">
                  <span className="text-[#EE6983] mt-1">✓</span>
                  <span>API access</span>
                </li>
                <li className="flex items-start gap-2 text-[#850E35]/70">
                  <span className="text-[#EE6983] mt-1">✓</span>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-start gap-2 text-[#850E35]/70">
                  <span className="text-[#EE6983] mt-1">✓</span>
                  <span>SLA guarantee</span>
                </li>
              </ul>
              <button className="w-full py-3 border-2 border-[#850E35] text-[#850E35] rounded-xl font-semibold hover:bg-[#850E35] hover:text-white transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FCF5EE]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#850E35] mb-6">
            Ready to Shift Your Links?
          </h2>
          <p className="text-xl text-[#850E35]/70 mb-8">
            Join thousands of users who trust Link Shift for their URL shortening needs
          </p>
          <button className="px-10 py-4 bg-linear-to-r from-[#EE6983] to-[#850E35] text-white rounded-xl text-lg font-semibold hover:shadow-xl transition-all">
            Start Shortening for Free
          </button>
        </div>
      </section>

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