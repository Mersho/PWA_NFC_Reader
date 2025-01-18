import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { nfcReader, NFCReader } from '../modules/nfcReader';
import { SerialConverter } from '../modules/serialConverter';
import {
  setSupported,
  setScanning,
  setLastScannedSerial,
  setConvertedSerial,
  setError,
  setConversionSteps,
} from '../redux/slices/nfcSlice';

export const useNFCReader = () => {
  const dispatch = useDispatch();

  const handleNFCReading = useCallback((serialNumber: string) => {
    dispatch(setLastScannedSerial(serialNumber));
    
    try {
      const { result, steps } = SerialConverter.convert(serialNumber);
      dispatch(setConvertedSerial(result));
      dispatch(setConversionSteps(steps));
      dispatch(setError(null));
    } catch {
      dispatch(setError('Failed to convert serial number'));
    }
  }, [dispatch]);

  const handleNFCError = useCallback((error: Error) => {
    dispatch(setError(error.message));
    dispatch(setScanning(false));
  }, [dispatch]);

  const startScanning = useCallback(async () => {
    try {
      const isInitialized = await nfcReader.init({
        onReading: handleNFCReading,
        onError: handleNFCError,
      });

      dispatch(setScanning(isInitialized));
      
      if (!isInitialized) {
        dispatch(setError('Failed to start NFC scanning. Please make sure NFC is enabled on your device.'));
      }
    } catch {
      dispatch(setError('Failed to initialize NFC reader'));
      dispatch(setScanning(false));
    }
  }, [dispatch, handleNFCReading, handleNFCError]);

  const stopScanning = useCallback(async () => {
    await nfcReader.stop();
    dispatch(setScanning(false));
  }, [dispatch]);

  // Check NFC support on mount
  useEffect(() => {
    dispatch(setSupported(NFCReader.isSupported()));
  }, [dispatch]);

  return {
    startScanning,
    stopScanning,
  };
}; 