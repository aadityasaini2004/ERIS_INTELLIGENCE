import React, { useState, useEffect } from 'react';
import { X, Code, Users, BookOpen, ExternalLink, RefreshCw } from 'lucide-react';

const EmployeeModal = ({ employee, onClose }) => {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  // Password setup (Same as SmartFilter)
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        // Fetch Stats
        const statsRes = await fetch(`http://localhost:8080/api/users/${employee.userId}/github-stats`, { headers });
        if (statsRes.ok) setStats(await statsRes.json());

        // Fetch Repos
        const reposRes = await fetch(`http://localhost:8080/api/users/${employee.userId}/github-repos`, { headers });
        if (reposRes.ok) setRepos(await reposRes.json());
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [employee.userId]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      const res = await fetch(`http://localhost:8080/api/users/${employee.userId}/sync-github`, { 
        method: 'POST', 
        headers 
      });
      const data = await res.text();
      setSyncMessage(data); // "Bawaal! X skills automatically sync ho gayi."
    } catch (error) {
      setSyncMessage("Sync failed! Check console.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-800/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code className="text-blue-400" /> Developer Profile
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-red-500/20 hover:text-red-400">
            <X size={20} />
          </button>
        </div>

        {/* Body Section */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {loading ? (
            <div className="flex justify-center py-10">
              <RefreshCw className="animate-spin text-blue-500" size={32} />
            </div>
          ) : (
            <>
              {/* Profile Card */}
              {stats && (
                <div className="flex items-center gap-6 bg-gray-800/40 p-5 rounded-xl border border-gray-700/50">
                  <img src={stats.avatar_url} alt="Profile" className="w-20 h-20 rounded-full border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{stats.name || employee.fullName}</h3>
                    <a href={stats.html_url} target="_blank" rel="noreferrer" className="text-blue-400 text-sm hover:underline flex items-center gap-1 mt-1">
                      @{stats.login} <ExternalLink size={12} />
                    </a>
                    <div className="flex gap-4 mt-3 text-sm text-gray-300">
                      <span className="flex items-center gap-1 bg-gray-900 px-3 py-1 rounded-full"><Users size={14} className="text-emerald-400"/> {stats.followers} Followers</span>
                      <span className="flex items-center gap-1 bg-gray-900 px-3 py-1 rounded-full"><BookOpen size={14} className="text-purple-400"/> {stats.public_repos} Repos</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Repositories List */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                   Recent Open Source Work
                </h4>
                <div className="space-y-3">
                  {repos.length > 0 ? repos.map((repo, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-800/30 p-4 rounded-lg border border-gray-700/30 hover:border-blue-500/50 transition-colors">
                      <div>
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-blue-300 font-medium hover:underline text-lg">
                          {repo.name}
                        </a>
                        <p className="text-xs text-gray-500 mt-1">Updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
                      </div>
                      {repo.language && (
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
                          {repo.language}
                        </span>
                      )}
                    </div>
                  )) : <p className="text-gray-400 text-sm">No recent repositories found.</p>}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer & Sync Button */}
        <div className="p-6 border-t border-gray-800 bg-gray-800/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm font-medium text-emerald-400 animate-pulse">
            {syncMessage && `✨ ${syncMessage}`}
          </div>
          
          <button 
            onClick={handleSync}
            disabled={syncing || loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50"
          >
            <RefreshCw size={18} className={syncing ? "animate-spin" : ""} />
            {syncing ? 'Scanning GitHub...' : 'Auto-Sync New Skills'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmployeeModal;