/**
 * NFC Reader Module
 * Handles interactions with the NDEFReader Web API
 */

import type { NDEFReader, NDEFReadingEvent } from '../types/nfc';

interface NFCReaderOptions {
  onReading?: (serialNumber: string) => void;
  onError?: (error: Error) => void;
}

export class NFCReader {
  private reader: NDEFReader | null = null;
  private options: NFCReaderOptions;

  constructor(options: NFCReaderOptions = {}) {
    this.options = options;
  }

  static isSupported(): boolean {
    return 'NDEFReader' in window && typeof window.NDEFReader === 'function';
  }

  async init(options: NFCReaderOptions = {}): Promise<boolean> {
    this.options = options;

    try {
      // Check if NDEFReader is supported
      if (!NFCReader.isSupported()) {
        throw new Error('NFC reading is not supported in this browser');
      }

      // Request NFC permissions
      try {
        await (navigator.permissions as {
          query(descriptor: { name: string }): Promise<{ state: string }>
        }).query({ name: 'nfc' });
      } catch {
        console.warn('NFC permission query not supported');
      }

      this.reader = new window.NDEFReader();
      if (this.reader) {
        await this.reader.scan();
        
        this.reader.addEventListener('reading', (event: NDEFReadingEvent) => {
          if (this.options.onReading) {
            this.options.onReading(event.serialNumber);
          }
        });
      }

      return true;
    } catch (error) {
      if (this.options.onError) {
        this.options.onError(error as Error);
      }
      return false;
    }
  }

  async stop(): Promise<void> {
    if (this.reader) {
      // Currently there's no official way to stop scanning
      // This is a placeholder for when the API supports it
      this.reader = null;
    }
  }
}

export const nfcReader = new NFCReader(); 