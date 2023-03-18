import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { MetaMaskInpageProvider } from "@metamask/providers";

interface AppState {
  showNew: boolean;
  ethereum: MetaMaskInpageProvider | undefined | null;
}

const initialState: AppState = {
  showNew: false,
  ethereum: undefined,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setEthereum: (state, action: PayloadAction<MetaMaskInpageProvider | null>) => {
      state.ethereum = action.payload;
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
