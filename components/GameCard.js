
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const GameCard = ({ game, onSelect }) => {
  return html`
    <div 
      onClick=${() => onSelect(game)}
      className="group relative flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 cursor-pointer hover:border-violet-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src=${game.thumbnail} 
          alt=${game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-80"></div>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-[9px] font-black uppercase tracking-widest bg-slate-950/80 text-violet-400 border border-violet-500/30 rounded-lg backdrop-blur-md">
            ${game.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
          ${game.title}
        </h3>
        <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          ${game.description}
        </p>
      </div>

      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
        <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/40">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
        </div>
      </div>
    </div>
  `;
};

export default GameCard;
