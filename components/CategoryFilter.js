
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
          className=${`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            activeCategory === cat
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          ${cat}
        </button>
      `)}
    </div>
  `;
};

export default CategoryFilter;
