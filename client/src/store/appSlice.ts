import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface AppState {
  showExisting: boolean;
}

const initialState: AppState = {
  showExisting: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleShowExisting: (state) => {
      state.showExisting = !state.showExisting;
    },
    setShowExisting: (state, action: PayloadAction<boolean>) => {
      state.showExisting = action.payload;
    },
  }
});

export const { toggleShowExisting, setShowExisting } = appSlice.actions;
export default appSlice.reducer;
