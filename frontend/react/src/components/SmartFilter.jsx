import React, { useState } from 'react';
import { Search, Award, Briefcase, Star, Code } from 'lucide-react';
import EmployeeModal from "./EmployeeModal"; // Typo fix kar diya hai (Model ki jagah Modal)

const SmartFilter = () => {
  const [skill, setSkill] = useState('');
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectEmployee, setSelectEmployee] = useState(null);

  const findTeam = async (e) => {
    e.preventDefault();
    if (!skill) return;
    
    setLoading(true);
    setError('');

    try {
      // Yahan apna Spring Boot wala lamba password daal de
      const token = localStorage.getItem('token')

      const response = await fetch(`http://localhost:8080/api/engine/filterTeam?skillName=${skill}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('No team found or Backend is not responding.');
      
      const data = await response.json();
      setTeam(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Smart Resource Allocation
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Type a technology (e.g., Java) to find the best experts in your company.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={findTeam} className="relative flex items-center w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={24} />
        </div>
        <input
          type="text"
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-lg"
          placeholder="Enter skill required..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Find Experts'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500/50 text-red-400 rounded-xl">
          ⚠️ {error}
        </div>
      )}

      {/* Results Grid (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {team.map((record, index) => (
          <div 
            key={record.id}
            onClick={() => setSelectEmployee(record.user)}
            className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] relative overflow-hidden cursor-pointer"
          >
            {/* Top Rank Badge */}
            {index === 0 && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Recommended TL 👑
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xl font-bold border-2 border-emerald-500/30">
                {record.user.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{record.user.fullName}</h3>
                <p className="text-blue-400 flex items-center gap-1 text-sm mt-1">
                  <Code size={14} /> {record.user.githubUsername}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <span className="flex items-center gap-2"><Star size={16} className="text-yellow-500"/> Skill Level</span>
                <span className={`font-bold ${record.proficiencyLevel === 'EXPERT' ? 'text-emerald-400' : 'text-blue-400'}`}>
                  {record.proficiencyLevel}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <span className="flex items-center gap-2"><Briefcase size={16} className="text-blue-400"/> Experience</span>
                <span className="font-bold text-white">{record.user.experienceYears} Years</span>
              </div>
              <div className="flex items-center justify-between text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <span className="flex items-center gap-2"><Award size={16} className="text-purple-400"/> Projects Delivered</span>
                <span className="font-bold text-white">{record.projectsCompleted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* YEH RAHA TERA MODAL JO TUNE ADD KARNE KO BOLA THA */}
      {selectEmployee && (
        <EmployeeModal 
          employee={selectEmployee} 
          onClose={() => setSelectEmployee(null)} 
        />
      )}
      
    </div>
  );
};

export default SmartFilter;