
export type Category = 'All' | 'Action' | 'Puzzle' | 'Arcade' | 'Retro' | 'Strategy' | 'Sports';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: Category;
  iframeUrl: string;
  featured?: boolean;
}
