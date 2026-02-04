
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/95 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden border border-slate-700 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="absolute top-4 right-4 z-[110] flex items-center gap-2">
          <button 
            onClick=${onClose}
            className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none">
          <h2 className="text-2xl font-bold text-white">${game.title}</h2>
          <p className="text-slate-300 text-sm max-w-2xl">${game.description}</p>
        </div>
      </div>
    </div>
  `;
};

export default GameModal;
