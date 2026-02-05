
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const categories = ['All', 'Action', 'Arcade', 'Puzzle', 'Retro', 'Strategy', 'Sports'];

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  return html`
    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
      ${categories.map((cat) => html`
        <button
          key=${cat}
          onClick=${() => setActiveCategory(cat)}
          className=${`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
            activeCategory === cat
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/40 translate-y-[-1px]'
              : 'bg-slate-900 text-slate-500 border border-slate-800 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          ${cat}
        </button>
      `)}
    </div>
  `;
};

export default CategoryFilter;
