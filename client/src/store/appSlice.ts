import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { MetaMaskInpageProvider } from "@metamask/providers";

interface AppState {
  showNew: boolean;
  ethereum?: MetaMaskInpageProvider | null;
}

const initialState: AppState = {
  showNew: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setEthereum: (state, action: PayloadAction<MetaMaskInpageProvider | null>) => {
      const ethereum = action.payload;
      state.ethereum = ethereum;
    },
    toggleShowNew: (state) => {
      state.showNew = !state.showNew;
    },
    setShowNew: (state, action: PayloadAction<boolean>) => {
      state.showNew = action.payload;
    },
  }
});

export const { toggleShowNew, setShowNew, setEthereum } = appSlice.actions;
export default appSlice.reducer;
