import { create } from 'zustand';

interface SearchState {
  queries: Record<string, string>;
  setQuery: (pathname: string, query: string) => void;
  getQuery: (pathname: string) => string;
  clearQuery: (pathname: string) => void;
  clearAllQueries: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  queries: {},

  setQuery: (pathname: string, query: string) =>
    set(state => ({
      queries: {
        ...state.queries,
        [pathname]: query,
      },
    })),

  getQuery: (pathname: string) => get().queries[pathname] || '',

  clearQuery: (pathname: string) =>
    set(state => {
      const newQueries = { ...state.queries };
      delete newQueries[pathname];
      return { queries: newQueries };
    }),

  clearAllQueries: () => set({ queries: {} }),
}));
