import React from 'react';
import { useSelector } from 'react-redux';
import { useNFCReader } from '../hooks/useNFCReader';
import type { RootState } from '../redux/store';

export const NFCReader: React.FC = () => {
  const { startScanning, stopScanning } = useNFCReader();
  const {
    isSupported,
    isScanning,
    lastScannedSerial,
    convertedSerial,
    error,
    conversionSteps,
  } = useSelector((state: RootState) => state.nfc);

  if (!isSupported) {
    return (
      <div className="card border-error-500/50 bg-error-500/5">
        <h2 className="text-lg font-semibold text-error-500 mb-2">
          NFC is not supported on this device
        </h2>
        <p className="text-neutral-300">
          This application requires a device with NFC capabilities and Chrome for Android 89+ or Chrome OS 89+.
          Please ensure your device has NFC hardware and you're using a supported browser.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={isScanning ? stopScanning : startScanning}
          className={`button-${isScanning ? 'secondary' : 'primary'} w-full sm:w-auto`}
        >
          {isScanning ? 'Stop Scanning' : 'Start Scanning'}
        </button>
        {!isScanning && !error && (
          <p className="text-neutral-400 text-sm">
            Click 'Start Scanning' and hold an NFC tag near your device
          </p>
        )}
      </div>

      {error && (
        <div className="card border-error-500/50 bg-error-500/5">
          <p className="text-error-500 font-medium">{error}</p>
          {error.includes('Failed to start NFC scanning') && (
            <div className="mt-2 text-sm text-neutral-300">
              <p className="mb-2">Please check that:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>NFC is enabled in your device settings</li>
                <li>You've granted NFC permissions to this website</li>
                <li>Your device has NFC capabilities</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {lastScannedSerial && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-sm font-medium text-neutral-400 mb-1">Last Scanned Serial:</h3>
            <p className="font-mono text-lg text-primary-400">{lastScannedSerial}</p>
          </div>

          {convertedSerial && (
            <div className="card border-success-500/20 bg-success-500/5">
              <h3 className="text-sm font-medium text-neutral-400 mb-1">Converted Serial:</h3>
              <p className="font-mono text-lg text-success-400">{convertedSerial}</p>
            </div>
          )}

          {conversionSteps && (
            <div className="card bg-background/50">
              <h3 className="text-sm font-medium text-neutral-400 mb-3">Conversion Steps:</h3>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-neutral-500">1.</span>
                  <div>
                    <span className="text-neutral-400">Original:</span>
                    <span className="text-primary-400 ml-2">{conversionSteps.originalSerial}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-neutral-500">2.</span>
                  <div>
                    <span className="text-neutral-400">Decimal:</span>
                    <span className="text-secondary-400 ml-2">[{conversionSteps.decimalValues.join(', ')}]</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-neutral-500">3.</span>
                  <div>
                    <span className="text-neutral-400">Binary:</span>
                    <span className="text-secondary-400 ml-2">[{conversionSteps.binaryValues.join(', ')}]</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-neutral-500">4.</span>
                  <div>
                    <span className="text-neutral-400">Combined:</span>
                    <span className="text-primary-400 ml-2">{conversionSteps.combinedBinary}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-neutral-500">5.</span>
                  <div>
                    <span className="text-neutral-400">Significant:</span>
                    <span className="text-primary-400 ml-2">{conversionSteps.significantBits}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-neutral-500">6.</span>
                  <div>
                    <span className="text-neutral-400">Final:</span>
                    <span className="text-success-400 ml-2">{conversionSteps.finalDecimal}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 