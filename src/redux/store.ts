import { configureStore } from '@reduxjs/toolkit';
import nfcSlice from './slices/nfcSlice';

export const store = configureStore({
  reducer: {
    nfc: nfcSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 