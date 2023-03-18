import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface AppState {
  showNew: boolean;
}

const initialState: AppState = {
  showNew: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleShowNew: (state) => {
      state.showNew = !state.showNew;
    },
    setShowNew: (state, action: PayloadAction<boolean>) => {
      state.showNew = action.payload;
    },
  }
});

export const { toggleShowNew, setShowNew } = appSlice.actions;
export default appSlice.reducer;
