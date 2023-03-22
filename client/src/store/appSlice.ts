import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { MetaMaskInpageProvider } from "@metamask/providers";

interface AppState {
  showNew: boolean;
  depositToId?: string;
  withdrawId?: string;
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
      state.depositToId = '';
      state.withdrawId = '';
    },
    setShowNew: (state, action: PayloadAction<boolean>) => {
      state.showNew = action.payload;
      state.depositToId = '';
      state.withdrawId = '';
    },
    setDepositToId: (state, action: PayloadAction<string>) => {
      if (action.payload === state.depositToId) {
        state.depositToId = '';
      } else {
        state.depositToId = action.payload;
      }
      state.showNew = false;
      state.withdrawId = '';
    },
    setWithdrawId: (state, action: PayloadAction<string>) => {
      if (action.payload === state.withdrawId) {
        state.withdrawId = '';
      } else {
        state.withdrawId = action.payload;
      }
      state.showNew = false;
      state.depositToId = '';
    },
  }
});

export const { toggleShowNew, setShowNew, setEthereum, setDepositToId, setWithdrawId } = appSlice.actions;
export default appSlice.reducer;
