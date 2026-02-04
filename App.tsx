
import React, { useState, useMemo } from 'react';
import { GAMES } from './data/games';
import { Game, Category } from './types';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredGames = useMemo(() => GAMES.filter(g => g.featured), []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Featured Section */}
        {activeCategory === 'All' && !searchQuery && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Featured Games
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredGames.map(game => (
                <div 
                  key={game.id}
                  onClick={() => setSelectedGame(game)}
                  className="group relative h-64 md:h-80 rounded-3xl overflow-hidden cursor-pointer border border-slate-800 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-3 inline-block">FEATURED</span>
                    <h3 className="text-3xl font-bold text-white mb-2">{game.title}</h3>
                    <p className="text-slate-300 line-clamp-2 max-w-lg mb-4">{game.description}</p>
                    <button className="px-6 py-2 bg-white text-slate-900 font-bold rounded-full transform group-hover:scale-105 transition-all">Play Now</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Filter & Grid */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              {activeCategory === 'All' ? 'All Games' : `${activeCategory} Games`}
            </h2>
            <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onSelect={setSelectedGame} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-400">No games found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-6 text-indigo-500 hover:text-indigo-400 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/50 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-indigo-600 transition-all">
              <span className="sr-only">Discord</span>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/></svg>
            </div>
          </div>
        </div>
      </footer>

      {/* Game Modal */}
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
};

export default App;
