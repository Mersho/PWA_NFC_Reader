interface NDEFReaderEventHandlerNonNull {
  (this: NDEFReader, event: NDEFReadingEvent): void;
}

interface NDEFReadingEvent extends Event {
  serialNumber: string;
}

interface NDEFReader extends EventTarget {
  scan(): Promise<void>;
  addEventListener(type: 'reading', listener: NDEFReaderEventHandlerNonNull): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
}

declare global {
  interface Window {
    NDEFReader: {
      new(): NDEFReader;
      prototype: NDEFReader;
    };
  }
}

// Export the interfaces so they can be imported
export type { NDEFReader, NDEFReadingEvent, NDEFReaderEventHandlerNonNull }; 