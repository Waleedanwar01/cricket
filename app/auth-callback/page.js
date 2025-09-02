'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Function to extract JWT tokens from URL parameters
    const extractTokens = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access');
      const refreshToken = urlParams.get('refresh');

      if (accessToken) {
        localStorage.setItem('access', accessToken);
      }
      
      if (refreshToken) {
        localStorage.setItem('refresh', refreshToken);
      }

      // Redirect to home page after storing tokens
      router.push('/');
    };

    extractTokens();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}