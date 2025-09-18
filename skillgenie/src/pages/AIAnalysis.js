import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  MapPin, 
  Calendar, 
  ArrowRight,
  Brain,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import Sidebar from '../components/Sidebar';

const AIAnalysis = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Mock data for analysis
  const demandData = [
    { year: '2024', demand: 100, supply: 80 },
    { year: '2025', demand: 125, supply: 85 },
    { year: '2026', demand: 155, supply: 95 },
    { year: '2027', demand: 190, supply: 110 },
    { year: '2028', demand: 235, supply: 125 },
    { year: '2029', demand: 285, supply: 145 },
    { year: '2030', demand: 340, supply: 170 }
  ];

  const salaryData = [
    { experience: 'Entry Level', salary: 65000, percentile90: 85000 },
    { experience: '2-4 Years', salary: 85000, percentile90: 110000 },
    { experience: '5-7 Years', salary: 120000, percentile90: 150000 },
    { experience: '8+ Years', salary: 160000, percentile90: 200000 }
  ];

  const regionData = [
    { region: 'North America', opportunities: 45, color: '#3B82F6' },
    { region: 'Europe', opportunities: 30, color: '#8B5CF6' },
    { region: 'Asia Pacific', opportunities: 35, color: '#EC4899' },
    { region: 'Others', opportunities: 15, color: '#38B2AC' }
  ];

  const skillTrends = [
    { skill: 'Python', trend: '+45%', difficulty: 'Medium', timeToLearn: '3-4 months' },
    { skill: 'Machine Learning', trend: '+60%', difficulty: 'Hard', timeToLearn: '6-8 months' },
    { skill: 'Data Visualization', trend: '+35%', difficulty: 'Easy', timeToLearn: '2-3 months' },
    { skill: 'Deep Learning', trend: '+70%', difficulty: 'Hard', timeToLearn: '8-12 months' },
    { skill: 'Statistics', trend: '+25%', difficulty: 'Medium', timeToLearn: '4-5 months' }
  ];

  const competitorAnalysis = {
    totalProfessionals: 2500000,
    yearlyGrowth: 15,
    averageExperience: 3.2,
    topSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization']
  };

  useEffect(() => {
    // Simulate AI analysis loading
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setAnalysisComplete(true), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-primary flex">
        <Sidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="gradient-bg w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">AI is analyzing your profile...</h2>
            <p className="text-gray-400 mb-8">Processing market data, career trends, and growth projections</p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-neon-blue rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-neon-pink rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary flex">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-dark-secondary/50 border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1 flex items-center gap-3">
                <Brain className="w-8 h-8 text-neon-blue" />
                AI Career Analysis
                {analysisComplete && <CheckCircle className="w-6 h-6 text-green-500" />}
              </h1>
              <p className="text-gray-400">Data Science & Machine Learning Career Path</p>
            </div>
            <button 
              onClick={() => navigate('/roadmap')}
              className="btn-primary flex items-center gap-2"
            >
              Generate Roadmap
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Key Insights Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="light-card p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold text-green-600">+35%</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">5-Year Growth</h3>
              <p className="text-sm text-gray-600">Expected job market growth in Data Science</p>
            </div>

            <div className="light-card p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold text-blue-600">$120K</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Median Salary</h3>
              <p className="text-sm text-gray-600">Average salary for mid-level positions</p>
            </div>

            <div className="light-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-purple-500" />
                <span className="text-2xl font-bold text-purple-600">2.5M</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Professionals</h3>
              <p className="text-sm text-gray-600">Current professionals in the field</p>
            </div>

            <div className="light-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold text-orange-600">85%</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Match Score</h3>
              <p className="text-sm text-gray-600">Compatibility with your profile</p>
            </div>
          </motion.div>

          {/* Main Analysis Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Demand vs Supply Forecast */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="light-card p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Market Demand Forecast</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={demandData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1C1C1E', 
                          border: '1px solid #3B82F6',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="demand" 
                        stackId="1"
                        stroke="#3B82F6" 
                        fill="#3B82F6"
                        fillOpacity={0.6}
                        name="Job Demand"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="supply" 
                        stackId="2"
                        stroke="#EC4899" 
                        fill="#EC4899"
                        fillOpacity={0.6}
                        name="Talent Supply"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>AI Insight:</strong> Demand is growing 2.5x faster than supply, creating excellent opportunities for new entrants.
                  </p>
                </div>
              </motion.div>

              {/* Salary Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="light-card p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Salary Progression</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="experience" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1C1C1E', 
                          border: '1px solid #3B82F6',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        formatter={(value) => [`$${value.toLocaleString()}`, '']}
                      />
                      <Bar dataKey="salary" fill="#3B82F6" name="Median Salary" />
                      <Bar dataKey="percentile90" fill="#8B5CF6" name="90th Percentile" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Insights */}
            <div className="space-y-6">
              {/* Regional Opportunities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="light-card p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Regional Opportunities</h3>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        dataKey="opportunities"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {regionData.map((region, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: region.color }}
                        ></div>
                        <span className="text-sm text-gray-700">{region.region}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{region.opportunities}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skill Trends */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="light-card p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Trending Skills</h3>
                <div className="space-y-4">
                  {skillTrends.map((skill, index) => (
                    <div key={index} className="border-l-4 border-neon-blue pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-800">{skill.skill}</h4>
                        <span className="text-green-600 text-sm font-medium">{skill.trend}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className={`px-2 py-1 rounded text-xs ${
                          skill.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          skill.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {skill.difficulty}
                        </span>
                        <span>{skill.timeToLearn}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Competition Analysis */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="light-card p-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Competition Landscape</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Professionals</span>
                    <span className="font-semibold text-gray-800">{competitorAnalysis.totalProfessionals.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Yearly Growth</span>
                    <span className="font-semibold text-green-600">+{competitorAnalysis.yearlyGrowth}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Avg. Experience</span>
                    <span className="font-semibold text-gray-800">{competitorAnalysis.averageExperience} years</span>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-gray-800 mb-2">Most In-Demand Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {competitorAnalysis.topSkills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-neon-blue/10 text-neon-blue text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="light-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-800">AI Recommendations</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Optimal Learning Path</h4>
                <p className="text-gray-700 mb-4">
                  Based on your profile and market analysis, focus on Python and Machine Learning fundamentals first. 
                  This combination offers the highest ROI for career transition.
                </p>
                <div className="flex items-center gap-2 text-blue-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Estimated completion: 8-10 months</span>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Market Timing</h4>
                <p className="text-gray-700 mb-4">
                  Perfect timing to enter the field. Demand is at an all-time high with a projected 35% growth 
                  over the next 5 years, while talent supply remains limited.
                </p>
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Market opportunity score: 9.2/10</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <div className="text-center">
            <button 
              onClick={() => navigate('/roadmap')}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-3 mx-auto"
            >
              <Brain className="w-6 h-6" />
              Generate My Personalized Roadmap
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
