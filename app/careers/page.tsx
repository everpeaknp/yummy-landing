"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/layout";
import { useTheme } from "@/hooks/useTheme";
import { FiSearch, FiBriefcase, FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";
import { jobPositions, jobCategories } from "@/lib/data";

export default function CareersPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering Logic
  const filteredJobs = jobPositions.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || job.department === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <main 
        className="min-h-screen pt-32 pb-20 px-6 animate-pop-in"
        style={{ backgroundColor: isDark ? '#0a0a0a' : '#ffffff' }}
      >
        <div className="max-w-6xl mx-auto">
           {/* Hero Section */}
           <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm mb-4 tracking-wider shadow-sm">
                  WE ARE HIRING
              </span>
              <h1 className="text-4xl md:text-5xl font-black font-display mb-6" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                 Join the Revolution
              </h1>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                 Help us build the operating system for modern restaurants. We are looking for dreamers, doers, and food lovers.
              </p>
           </div>

           {/* Filter & Search Bar */}
           <div className="mb-12 space-y-6">
              {/* Search */}
              <div className="relative max-w-2xl mx-auto">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400 text-xl" />
                 </div>
                 <input 
                    type="text"
                    placeholder="Search for roles (e.g. Engineer, Design)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all focus:ring-2 focus:ring-primary/20"
                    style={{ 
                        backgroundColor: isDark ? '#171717' : '#ffffff',
                        borderColor: isDark ? '#262626' : '#e2e8f0',
                        color: isDark ? '#ffffff' : '#0f172a'
                    }}
                 />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-3">
                 {jobCategories.map((cat) => (
                    <button
                       key={cat}
                       onClick={() => setSelectedCategory(cat)}
                       className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          selectedCategory === cat 
                            ? 'bg-primary text-white shadow-lg shadow-orange-500/20' 
                            : (isDark ? 'bg-zinc-800 text-gray-400 hover:bg-zinc-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                       }`}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
           </div>

           {/* Job Grid */}
           {filteredJobs.length > 0 ? (
               <div className="grid md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                      <div 
                        key={job.id}
                        className="p-8 rounded-3xl border transition-all hover:shadow-xl group relative overflow-hidden"
                        style={{ 
                            backgroundColor: isDark ? '#171717' : '#ffffff',
                            borderColor: isDark ? '#262626' : '#e2e8f0'
                        }}
                      >
                         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                            <FiBriefcase size={80} />
                         </div>

                         <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                                    {job.department}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-3" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                                {job.title}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm" style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                                <div className="flex items-center gap-1.5">
                                    <FiClock />
                                    <span>{job.type}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <FiMapPin />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                            
                            <p className="mb-8 line-clamp-2" style={{ color: isDark ? '#737373' : '#94a3b8' }}>
                                {job.description}
                            </p>

                            <button className="flex items-center gap-2 text-primary font-bold group-hover:translate-x-1 transition-transform">
                                Apply Now <FiArrowRight />
                            </button>
                         </div>
                      </div>
                  ))}
               </div>
           ) : (
               /* Empty State */
               <div className="text-center py-20">
                   <div className="inline-flex items-center justify-center p-6 rounded-full bg-slate-100 dark:bg-zinc-900 mb-6">
                       <FiSearch className="text-4xl text-gray-400" />
                   </div>
                   <h3 className="text-xl font-bold mb-2" style={{ color: isDark ? '#ffffff' : '#0f172a' }}>
                       No positions found
                   </h3>
                   <p style={{ color: isDark ? '#a3a3a3' : '#64748b' }}>
                       We couldn't find any open roles matching your search "{searchQuery}" in {selectedCategory}.
                       <br/>Try adjusting your filters or check back later!
                   </p>
               </div>
           )}
        </div>
      </main>
      <Footer />
    </>
  );
}
