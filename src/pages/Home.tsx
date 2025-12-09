import { ArrowRight, Check, Copy, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install: npm install axios
import { useAuth } from '@clerk/clerk-react'; // If using Clerk for auth

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const { userId } = useAuth();

  // If not using auth yet, you can use a placeholder or make userId optional
  // const userId = "demo-user"; // Replace with actual auth later

  const generateUniqueShortCode = () => {
    return Math.random().toString(36).substr(2, 8); // Longer code to reduce collisions
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);

    try {
      // Generate short code
      const shortCode = generateUniqueShortCode();
      
      console.log(shortCode)
      console.log(shortCode)
      console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
      console.log('Full URL:', `${import.meta.env.VITE_BACKEND_URL}/api/short-links`);
      // Call your backend API
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/short-links`, {
        userId: userId, 
        originalUrl: url,
        shortCode: shortCode
      });

      console.log(response)
      if (response.data.success) {
        // Construct the full short URL
        // const baseUrl = window.location.origin; // e.g., http://localhost:3000
        const shortUrl = `${import.meta.env.VITE_BACKEND_URL}/${response.data.data.shortCode}`;
        setShortened(shortUrl);
      } else {
        setError(response.data.message || 'Failed to shorten URL');
      }
    } catch (err: any) {
      console.error('Error shortening URL:', err);
      
      // Handle different error cases
      if (err.response) {
        if (err.response.status === 409) {
          // Short code collision - try again with a new code
          setError('Please try again. Code already exists.');
          // You could implement auto-retry here
        } else if (err.response.status === 400) {
          setError('Invalid URL format');
        } else {
          setError(err.response.data?.message || 'Server error occurred');
        }
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortened) return;
    
    navigator.clipboard.writeText(shortened)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setError('Failed to copy to clipboard');
      });
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#850E35] mb-2">
          Paste Your Link Here
        </h1>
        <p className="text-lg text-[#850E35]/70">
          Enter a long URL and instantly generate a short, shareable one.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-3 border-2 border-[#FFC4C4]">
        <form onSubmit={handleShorten} className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(''); // Clear error when user types
            }}
            placeholder="Paste your long URL here..."
            className="flex-1 px-6 py-4 rounded-xl border-2 border-[#FFC4C4] focus:border-[#EE6983] focus:outline-none text-lg disabled:opacity-50"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !url}
            className="px-8 py-4 bg-linear-to-r from-[#EE6983] to-[#850E35] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Shorten <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Success Result */}
        {shortened && !loading && (
          <div className="mt-4 flex items-center gap-3 p-4 bg-[#FCF5EE] rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex-1 text-left">
              <p className="text-sm text-[#850E35]/60 mb-1">Your shortened link:</p>
              <p className="text-lg font-semibold text-[#850E35] break-all">{shortened}</p>
            </div>
            <button
              onClick={handleCopy}
              className="px-6 py-3 bg-[#850E35] text-white rounded-lg hover:bg-[#EE6983] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}

        {/* Optional: Loading state indicator */}
        {loading && !shortened && (
          <div className="mt-4 p-4 bg-[#FCF5EE] rounded-xl flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#EE6983]" />
            <span className="ml-2 text-[#850E35]">Creating your short link...</span>
          </div>
        )}
      </div>
    </>
  );
}