import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Code, Activity, TrendingUp, GitBranch, UserCircle, Star, Target } from 'lucide-react';

const Dashboard = () => {
  const role = localStorage.getItem('role') || 'EMPLOYEE';
  const userName = localStorage.getItem('userName') || 'User';
  const userId = localStorage.getItem('userId');

  // ==========================================
  // VIEW 1: EMPLOYEE DASHBOARD (Personalized)
  // ==========================================
  const EmployeeDashboard = () => {
    const [myStats, setMyStats] = useState({
      projects: 0,
      skills: 0,
      level: 'Loading...'
    });

    useEffect(() => {
      const fetchMyStats = async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/dashboard/employee/${userId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          if (res.ok) {
            const data = await res.json();
            setMyStats(data);
          }
        } catch (error) {
          console.error("Failed to fetch employee stats", error);
        }
      };
      
      // Agar userId hai tabhi API hit karo
      if (userId) {
        fetchMyStats();
      }
    }, [userId]);

    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-end bg-gray-800/40 p-8 rounded-3xl border border-gray-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{userName}</span>! 🚀
            </h1>
            <p className="text-gray-400 text-lg">Here is your personal work summary and current assignments.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800/80 transition-all">
            <div className="p-3 w-12 rounded-xl bg-blue-500/10 mb-4"><Target className="text-blue-400" /></div>
            <h3 className="text-3xl font-bold text-white mb-1">{myStats.projects}</h3>
            <p className="text-gray-400 font-medium">My Active Projects</p>
          </div>
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800/80 transition-all">
            <div className="p-3 w-12 rounded-xl bg-purple-500/10 mb-4"><Code className="text-purple-400" /></div>
            <h3 className="text-3xl font-bold text-white mb-1">{myStats.skills}</h3>
            <p className="text-gray-400 font-medium">Mapped Skills</p>
          </div>
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800/80 transition-all">
            <div className="p-3 w-12 rounded-xl bg-yellow-500/10 mb-4"><Star className="text-yellow-400" /></div>
            <h3 className="text-xl font-bold text-white mb-1 mt-2">{myStats.level}</h3>
            <p className="text-gray-400 font-medium">Current Role Level</p>
          </div>
        </div>

        {/* Employee's Personal Activity */}
        <div className="bg-gray-800/40 rounded-3xl border border-gray-700/50 overflow-hidden p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <UserCircle className="text-emerald-400" /> My Recent Updates
          </h2>
          <p className="text-gray-400">Your profile is up to date and syncing with ERIS servers.</p>
        </div>
      </div>
    );
  };

  // ==========================================
  // VIEW 2: HR / ADMIN DASHBOARD (Company Wide)
  // ==========================================
  const HRDashboard = () => {
    const [adminStats, setAdminStats] = useState({
      totalEmployees: '...',
      activeProjects: '...',
      skillsTracked: '...'
    });

    useEffect(() => {
      const fetchAdminStats = async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/dashboard/admin`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          if (res.ok) {
            const data = await res.json();
            setAdminStats(data);
          }
        } catch (error) {
          console.error("Failed to fetch admin stats", error);
        }
      };
      fetchAdminStats();
    }, []);

    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-end bg-gray-800/40 p-8 rounded-3xl border border-gray-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{userName}</span>! 👋
            </h1>
            <p className="text-gray-400 text-lg">Here is what's happening in your engineering team today.</p>
          </div>
          <div className="hidden md:flex relative z-10 bg-gray-900/50 p-4 rounded-2xl border border-gray-700/50 items-center gap-4">
            <div className="bg-blue-500/20 p-3 rounded-xl"><TrendingUp className="text-blue-400" /></div>
            <div>
              <p className="text-sm text-gray-400">Team Efficiency</p>
              <p className="text-2xl font-bold text-white">+14.5% <span className="text-sm text-emerald-400 font-normal">this week</span></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800/80 transition-all">
            <div className="p-3 w-12 rounded-xl bg-blue-500/10 mb-4"><Users className="text-blue-400" /></div>
            <h3 className="text-3xl font-bold text-white mb-1">{adminStats.totalEmployees}</h3>
            <p className="text-gray-400 font-medium">Total Employees</p>
          </div>
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800/80 transition-all">
            <div className="p-3 w-12 rounded-xl bg-emerald-500/10 mb-4"><Briefcase className="text-emerald-400" /></div>
            <h3 className="text-3xl font-bold text-white mb-1">{adminStats.activeProjects}</h3>
            <p className="text-gray-400 font-medium">Active Projects</p>
          </div>
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50 hover:bg-gray-800/80 transition-all">
            <div className="p-3 w-12 rounded-xl bg-purple-500/10 mb-4"><Code className="text-purple-400" /></div>
            <h3 className="text-3xl font-bold text-white mb-1">{adminStats.skillsTracked}</h3>
            <p className="text-gray-400 font-medium">Skills Tracked</p>
          </div>
        </div>
      </div>
    );
  };

  // Main Return Logic: Role ke hisaab se component render karo
  return role === 'HR' ? <HRDashboard /> : <EmployeeDashboard />;
};

export default Dashboard;