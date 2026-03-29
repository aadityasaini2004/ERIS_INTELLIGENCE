import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Invalid Email or Password ❌');

      const data = await response.json();
      
      // JADOO YAHAN HAI: Token aur details browser mein save kar lo
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userName', data.fullName);
      localStorage.setItem('userId', data.userId);

      // Login hote hi Dashboard pe phek do
      navigate('/');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.1)] w-full max-w-md relative overflow-hidden">
        
        {/* Glowing Background Effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="text-center mb-8 relative z-10">
          <ShieldCheck className="mx-auto text-blue-500 mb-3" size={48} />
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            ERIS Intelligence
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Sign in to access the portal</p>
        </div>

        {error && <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-center text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
              <input 
                type="email" 
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="rahul.sharma@eris.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
              <input 
                type="password" 
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;