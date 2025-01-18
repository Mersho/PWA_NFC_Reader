import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NFCState {
  isSupported: boolean;
  isScanning: boolean;
  lastScannedSerial: string | null;
  convertedSerial: string | null;
  error: string | null;
  conversionSteps: {
    originalSerial: string;
    decimalValues: number[];
    binaryValues: string[];
    combinedBinary: string;
    significantBits: string;
    finalDecimal: number;
  } | null;
}

const initialState: NFCState = {
  isSupported: false,
  isScanning: false,
  lastScannedSerial: null,
  convertedSerial: null,
  error: null,
  conversionSteps: null,
};

const nfcSlice = createSlice({
  name: 'nfc',
  initialState,
  reducers: {
    setSupported: (state, action: PayloadAction<boolean>) => {
      state.isSupported = action.payload;
    },
    setScanning: (state, action: PayloadAction<boolean>) => {
      state.isScanning = action.payload;
    },
    setLastScannedSerial: (state, action: PayloadAction<string>) => {
      state.lastScannedSerial = action.payload;
    },
    setConvertedSerial: (state, action: PayloadAction<string>) => {
      state.convertedSerial = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setConversionSteps: (state, action: PayloadAction<NFCState['conversionSteps']>) => {
      state.conversionSteps = action.payload;
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setSupported,
  setScanning,
  setLastScannedSerial,
  setConvertedSerial,
  setError,
  setConversionSteps,
  resetState,
} = nfcSlice.actions;

export default nfcSlice.reducer; 