import { create } from 'zustand';

interface ScreenerState {
  isScreenerOpen: boolean;
  setIsScreenerOpen: (nextState: boolean) => void;
}

const useScreenerStore = create<ScreenerState>(set => ({
  isScreenerOpen: false,
  setIsScreenerOpen: nextState => {
    set({
      isScreenerOpen: nextState,
    });
  },
}));

export default useScreenerStore;
