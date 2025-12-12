import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectPage = () => {
  const { shortCode } = useParams(); // Gets the short code from URL
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const redirectUser = async () => {
      try {
        // 1. Call your backend API
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/short-links/redirect/${shortCode}`
        );
        console.log(response)
        console.log(response.data)
        
        // 2. If link found, redirect
        if (response.data) {
          // Optional: Show "Redirecting..." for 1 second
          setStatus('redirecting');
          
          setTimeout(() => {
            // This triggers browser navigation
            window.location.href = response.data;
          }, 1000);
          
        } else {
          setStatus('error');
          setError('Link not found');
        }
        
      } catch (err:any) {
        setStatus('error');
        if (err.response?.status === 404) {
          setError('Short link not found');
        } else {
          setError('Something went wrong. Please try again.');
        }
      }
    };

    redirectUser();
  }, [shortCode, navigate]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            Processing your link...
          </h2>
          <p className="mt-2 text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

//   // Redirecting state
//   if (status === 'redirecting') {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="text-green-500 text-5xl mb-4">✓</div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Redirecting...
//           </h2>
//           <p className="mt-2 text-gray-600">
//             Taking you to your destination
//           </p>
//           <div className="mt-6">
//             <div className="w-64 bg-gray-200 rounded-full h-2">
//               <div className="bg-blue-500 h-2 rounded-full animate-pulse"></div>
//             </div>
//           </div>
//           <p className="mt-4 text-sm text-gray-500">
//             If you are not redirected in a few seconds,{' '}
//             <button
//               onClick={() => window.location.reload()}
//               className="text-blue-500 hover:underline"
//             >
//               click here
//             </button>
//           </p>
//         </div>
//       </div>
//     );
//   }

  // Error state
  if (status === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">✗</div>
          <h1 className="text-3xl font-bold text-gray-800">
            Link Not Found
          </h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <p className="mt-4 text-gray-500">
            The short link <code className="bg-gray-100 px-2 py-1 rounded">
              {shortCode}
            </code> doesn't exist or has expired.
          </p>
          <div className="mt-8 space-x-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Go to Homepage
            </button>
            <button
              onClick={() => navigate('/create')}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Create New Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default RedirectPage;