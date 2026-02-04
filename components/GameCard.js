
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const GameCard = ({ game, onSelect }) => {
  return html`
    <div 
      onClick=${() => onSelect(game)}
      className="group relative flex flex-col bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 cursor-pointer hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src=${game.thumbnail} 
          alt=${game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-md">
            ${game.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
          ${game.title}
        </h3>
        <p className="mt-1 text-sm text-slate-400 line-clamp-2">
          ${game.description}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        </div>
      </div>
    </div>
  `;
};

export default GameCard;
