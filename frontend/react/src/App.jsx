import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SmartFilter from './components/SmartFilter';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Temporary Dashboard UI (Isko hum next step mein faadu banayenge)
;

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page ka alag route (Isme Sidebar nahi dikhega) */}
        <Route path="/login" element={<Login />} />

        {/* Baaki saare pages ek layout ke andar jisme Sidebar hai */}
        <Route path="*" element={
          <div className="flex h-screen bg-[#0f172a] font-sans">
            <Sidebar />
            <div className="flex-1 p-10 overflow-y-auto">
              <Routes>
                
                {/* Sabke liye allowed - Dashboard */}
                <Route path="/" element={<Dashboard />} />
                
                {/* 🛑 YAHAN LAGA HAI BOUNCER (RBAC) 🛑 */}
                <Route 
                  path="/smart-filter" 
                  element={
                    localStorage.getItem('role') === 'HR' 
                      ? <SmartFilter /> 
                      : <div className="flex flex-col items-center justify-center h-full text-center">
                          <span className="text-6xl mb-4">🛑</span>
                          <h2 className="text-red-400 text-3xl font-bold">Access Denied!</h2>
                          <p className="text-gray-400 mt-2 text-lg">Bhai tu HR nahi hai, yeh page sirf Admin ke liye allowed hai.</p>
                        </div>
                  } 
                />
                
                {/* 404 Page */}
                <Route path="*" element={<div className="text-gray-400">Page under construction...</div>} />
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;