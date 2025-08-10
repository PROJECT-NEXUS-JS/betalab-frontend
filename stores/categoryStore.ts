import { create } from 'zustand';
import { MAIN_CATEGORIES } from '@/app/category/const';

type MainCategory = (typeof MAIN_CATEGORIES)[number];

interface CategoryState {
  mainCategory: MainCategory;
  genreCategory: string;
  platformCategory: string;
  setMainCategory: (category: MainCategory) => void;
  setGenreCategory: (category: string) => void;
  setPlatformCategory: (category: string) => void;
  initializeFromURL: (searchParams: URLSearchParams) => void;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  mainCategory: '앱',
  genreCategory: '전체',
  platformCategory: '무관',
  setMainCategory: category => {
    set({
      mainCategory: category,
      genreCategory: '전체',
      platformCategory: '무관',
    });
  },
  setGenreCategory: category => {
    set({ genreCategory: category });
  },
  setPlatformCategory: category => {
    set({ platformCategory: category });
  },
  initializeFromURL: searchParams => {
    const categoryFromURL = searchParams.get('category') as MainCategory;
    const genreFromURL = searchParams.get('genre');
    const platformFromURL = searchParams.get('platform');

    if (categoryFromURL && MAIN_CATEGORIES.includes(categoryFromURL)) {
      set({ mainCategory: categoryFromURL });
    }
    if (genreFromURL) {
      set({ genreCategory: genreFromURL });
    }
    if (platformFromURL) {
      set({ platformCategory: platformFromURL });
    }
  },
}));
