
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
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200">
      <${Header} searchQuery=${searchQuery} setSearchQuery=${setSearchQuery} />

      <main className="flex-1 container mx-auto px-4 py-8">
        ${activeCategory === 'All' && !searchQuery && html`
          <section className="mb-16">
            <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-widest">
              <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse shadow-glow"></span>
              Eclipse Picks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              ${featuredGames.map(game => html`
                <div 
                  key=${game.id}
                  onClick=${() => setSelectedGame(game)}
                  className="group relative h-72 md:h-96 rounded-[2.5rem] overflow-hidden cursor-pointer border border-slate-900 hover:border-violet-500/40 transition-all duration-700 shadow-2xl"
                >
                  <img src=${game.thumbnail} alt=${game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-10">
                    <span className="px-4 py-1.5 bg-violet-600/90 text-white text-[10px] font-black tracking-widest rounded-full mb-4 inline-block backdrop-blur-md">SHADOW FEATURE</span>
                    <h3 className="text-4xl font-black text-white mb-3 tracking-tighter">${game.title}</h3>
                    <p className="text-slate-400 font-medium line-clamp-2 max-w-md mb-6">${game.description}</p>
                    <button className="px-8 py-3 bg-white text-black font-black rounded-2xl transform group-hover:scale-105 transition-all shadow-xl hover:bg-violet-500 hover:text-white uppercase text-xs tracking-widest">Enter Shadow</button>
                  </div>
                </div>
              `)}
            </div>
          </section>
        `}

        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-widest">
              <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
              ${activeCategory === 'All' ? 'The Vault' : `${activeCategory} Protocol`}
            </h2>
            <${CategoryFilter} activeCategory=${activeCategory} setActiveCategory=${setActiveCategory} />
          </div>

          ${filteredGames.length > 0 ? html`
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              ${filteredGames.map((game) => html`
                <${GameCard} 
                  key=${game.id} 
                  game=${game} 
                  onSelect=${setSelectedGame} 
                />
              `)}
            </div>
          ` : html`
            <div className="flex flex-col items-center justify-center py-24 bg-slate-950 rounded-[3rem] border-2 border-dashed border-slate-900 shadow-inner">
              <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-2xl border border-slate-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">Shadows empty</h3>
              <p className="text-slate-600 mt-2 font-medium">Try another frequency or search query.</p>
              <button 
                onClick=${() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-8 text-violet-500 hover:text-violet-400 font-black uppercase text-xs tracking-widest border-b-2 border-violet-500/20 pb-1"
              >
                Reset Connection
              </button>
            </div>
          `}
        </section>
      </main>

      <footer className="border-t border-slate-900 bg-black/40 py-16 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                SHADOW<span className="text-violet-500">GAMES</span>
              </span>
            </div>
            <p className="text-slate-600 text-sm font-medium">© 2024 ShadowGames Network. Encrypted connection active.</p>
          </div>
          
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-violet-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Support</a>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center cursor-pointer hover:bg-violet-600 hover:scale-110 transition-all border border-slate-800 shadow-xl">
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/></svg>
            </div>
          </div>
        </div>
      </footer>

      <${GameModal} game=${selectedGame} onClose=${() => setSelectedGame(null)} />
    </div>
  `;
};

export default App;
