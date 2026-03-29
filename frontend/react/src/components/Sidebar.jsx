import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BrainCircuit, FolderGit2, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Browser storage se login wale user ki details nikalo
  const userRole = localStorage.getItem('role') || 'EMPLOYEE';
  const userName = localStorage.getItem('userName') || 'User';

  // Har menu item ko bata diya ki usko kon kon dekh sakta hai
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', allowedRoles: ['HR', 'EMPLOYEE'] },
    { name: 'Smart Filter', icon: BrainCircuit, path: '/smart-filter', allowedRoles: ['HR'] }, // Sirf HR dekhega
    { name: 'Employees', icon: Users, path: '/employees', allowedRoles: ['HR'] }, // Sirf HR naye launde add karega
    { name: 'Projects', icon: FolderGit2, path: '/projects', allowedRoles: ['HR', 'EMPLOYEE'] },
  ];

  // System sirf wahi menu filter karke layega jo is role ke liye allowed hain
  const visibleMenu = menuItems.filter(item => item.allowedRoles.includes(userRole));

  const handleLogout = () => {
    localStorage.clear(); // Token aur details browser se uda do
    navigate('/login'); // Wapas login page pe phek do
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">
      {/* Logo Section */}
      <div className="p-6">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-wider">
          ERIS
        </h2>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Intelligence</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-6">
        <ul>
          {visibleMenu.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.name} className="px-4 mb-2">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profile & Logout Section (Bottom) */}
      <div className="p-4 border-t border-gray-800 mt-auto">
        <div className="bg-gray-800/50 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 flex items-center justify-center text-sm font-bold">
              {userName.charAt(0)}
            </div>
            <div className="truncate pr-2">
              <p className="text-sm font-semibold truncate text-white">{userName}</p>
              <p className="text-xs text-blue-400 font-medium">{userRole}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors shrink-0"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;