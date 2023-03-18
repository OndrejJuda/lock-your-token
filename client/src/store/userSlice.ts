import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { IEnvelope } from '@/interfaces';

interface UserState {
  envelopes: IEnvelope[];
}

const initialState: UserState = {
  envelopes: [
    { name: 'Retirement', id: 1, amount: 124.222544, lockEnd: new Date() },
    { name: 'New car', id: 2, amount: 0.5, lockEnd: new Date() },
    { name: 'Kid university', id: 3, amount: 2, lockEnd: new Date() },
    { name: 'Second kid university', id: 4, amount: 1, lockEnd: new Date() },
  ],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addEnvelope: (state, action: PayloadAction<IEnvelope>) => {
      (state.envelopes as any[]).push(action.payload);
    },
    updateEnvelope: (state, action: PayloadAction<{index: number, data: IEnvelope}>) => {
      (state.envelopes as any[])[action.payload.index] = action.payload.data;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export const { addEnvelope, updateEnvelope } = userSlice.actions;
export default userSlice.reducer;
