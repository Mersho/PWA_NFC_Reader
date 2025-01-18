# NFC Serial Converter PWA

A Progressive Web Application for reading NFC tags and converting their serial numbers to decimal format according to the MIFARE Classic 1K card standard.

## Features

- Read NFC tags using the Web NFC API
- Convert NFC serial numbers to decimal format
- View detailed conversion steps
- Works offline (PWA)
- Modern, responsive UI
- Cross-browser support (where Web NFC API is available): https://caniuse.com/?search=NDEFReader

## Prerequisites

- Node.js 18 or higher
- A device with NFC capabilities
- A modern browser that supports the Web NFC API (Chrome for Android 89+)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nfc-serial-converter.git
cd nfc-serial-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For production build:
```bash
npm run build
```

## Usage

1. Open the application in a supported browser
2. Click "Start Scanning" to begin NFC detection
3. Hold an NFC tag near your device
4. View the original serial number and its decimal conversion
5. (Optional) View the detailed conversion steps

## Technical Details

### NFC Serial Conversion

The application converts NFC serial numbers following these steps:

1. Read the 4-byte (32-bit) UID from the NFC tag
2. Convert hex bytes to decimal values
3. Convert decimals to binary (8 bits each)
4. Combine binary values in reverse order
5. Take the last 24 significant bits
6. Convert to decimal and format as 10 digits

### Technologies Used

- React.js with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Workbox for PWA features
- Web NFC API for NFC reading

## Browser Support

The Web NFC API is currently supported in:
- Chrome for Android 89+
- Chrome OS 89+

Other browsers may not support NFC reading, but the conversion functionality will still work with manually entered serial numbers.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MIFARE Classic documentation for the serial number format specifications
- Web NFC API documentation and examples
