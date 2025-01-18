import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NFCReader } from './components/NFCReader';
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    installPWA: () => Promise<string>;
  }
}

function App() {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleInstallable = () => setIsInstallable(true);
    document.addEventListener('pwaInstallable', handleInstallable);
    return () => document.removeEventListener('pwaInstallable', handleInstallable);
  }, []);

  const handleInstall = async () => {
    const outcome = await window.installPWA();
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-b from-background to-background-darker">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold heading-gradient mb-4">
              NFC Serial Converter
            </h1>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              A modern tool for reading NFC tags and converting their serial numbers to decimal format.
              Simply tap your NFC tag to get started.
            </p>
            {isInstallable && (
              <button
                onClick={handleInstall}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Install App
              </button>
            )}
          </header>

          <main className="max-w-2xl mx-auto">
            <div className="card mb-8">
              <NFCReader />
            </div>

            <div className="text-center text-sm text-neutral-500">
              <p>
                Compatible with Chrome for Android 89+ and Chrome OS 89+.
                Your device must have NFC capabilities enabled.
              </p>
            </div>
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;
