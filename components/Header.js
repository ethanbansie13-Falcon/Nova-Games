
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const Header = ({ searchQuery, setSearchQuery }) => {
  return html`
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-violet-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tighter text-white hidden sm:block">
            SHADOW<span className="text-violet-500">GAMES</span>
          </span>
        </div>

        <div className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-800 rounded-xl leading-5 bg-slate-900 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all sm:text-sm"
            placeholder="Search the shadows..."
            value=${searchQuery}
            onChange=${(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-semibold text-slate-400 hover:text-violet-400 transition-colors">Portal</a>
          <a href="#" className="text-sm font-semibold text-slate-400 hover:text-violet-400 transition-colors">Trending</a>
          <a href="#" className="text-sm font-semibold text-slate-400 hover:text-violet-400 transition-colors">Eclipse</a>
        </div>
      </div>
    </nav>
  `;
};

export default Header;
