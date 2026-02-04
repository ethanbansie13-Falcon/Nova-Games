
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            NOVA<span className="text-indigo-500">GAMES</span>
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Popular</a>
          <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">New</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
