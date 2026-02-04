
import React, { useState, useMemo } from 'react';
import htm from 'htm';
import { GAMES } from './data/games.js';
import Header from './components/Header.js';
import CategoryFilter from './components/CategoryFilter.js';
import GameCard from './components/GameCard.js';
import GameModal from './components/GameModal.js';

const html = htm.bind(React.createElement);

const App = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredGames = useMemo(() => GAMES.filter(g => g.featured), []);

  return html`
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <${Header} searchQuery=${searchQuery} setSearchQuery=${setSearchQuery} />

      <main className="flex-1 container mx-auto px-4 py-8">
        ${activeCategory === 'All' && !searchQuery && html`
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Featured Games
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${featuredGames.map(game => html`
                <div 
                  key=${game.id}
                  onClick=${() => setSelectedGame(game)}
                  className="group relative h-64 md:h-80 rounded-3xl overflow-hidden cursor-pointer border border-slate-800 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <img src=${game.thumbnail} alt=${game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-3 inline-block">FEATURED</span>
                    <h3 className="text-3xl font-bold text-white mb-2">${game.title}</h3>
                    <p className="text-slate-300 line-clamp-2 max-w-lg mb-4">${game.description}</p>
                    <button className="px-6 py-2 bg-white text-slate-900 font-bold rounded-full transform group-hover:scale-105 transition-all">Play Now</button>
                  </div>
                </div>
              `)}
            </div>
          </section>
        `}

        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              ${activeCategory === 'All' ? 'All Games' : `${activeCategory} Games`}
            </h2>
            <${CategoryFilter} activeCategory=${activeCategory} setActiveCategory=${setActiveCategory} />
          </div>

          ${filteredGames.length > 0 ? html`
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              ${filteredGames.map((game) => html`
                <${GameCard} 
                  key=${game.id} 
                  game=${game} 
                  onSelect=${setSelectedGame} 
                />
              `)}
            </div>
          ` : html`
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-400">No games found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query.</p>
              <button 
                onClick=${() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-6 text-indigo-500 hover:text-indigo-400 font-medium"
              >
                Clear all filters
              </button>
            </div>
          `}
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/50 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                NOVA<span className="text-indigo-500">GAMES</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm">© 2024 NovaGames. All rights reserved.</p>
          </div>
          
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <${GameModal} game=${selectedGame} onClose=${() => setSelectedGame(null)} />
    </div>
  `;
};

export default App;
