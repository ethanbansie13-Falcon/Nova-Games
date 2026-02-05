
import React, { useEffect } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const GameModal = ({ game, onClose }) => {
  useEffect(() => {
    if (game) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [game]);

  if (!game) return null;

  return html`
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/98 backdrop-blur-xl">
      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl shadow-violet-500/10 animate-in zoom-in-95 duration-300">
        <div className="absolute top-4 right-4 z-[110] flex items-center gap-2">
          <button 
            onClick=${onClose}
            className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-800 hover:bg-red-600 hover:border-red-500 text-white flex items-center justify-center transition-all duration-300 group shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <iframe
          src=${game.iframeUrl}
          className="w-full h-full border-none"
          title=${game.title}
          allowFullScreen
          loading="lazy"
        />

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter bg-violet-600 text-white rounded">LIVE</span>
            <h2 className="text-3xl font-black text-white tracking-tight">${game.title}</h2>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl font-medium">${game.description}</p>
        </div>
      </div>
    </div>
  `;
};

export default GameModal;
