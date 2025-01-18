import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NFCReader } from './components/NFCReader';

function App() {
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
