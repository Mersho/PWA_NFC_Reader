# PWA NFC Reader: Project Structure and Design Documentation

## Project Overview

The goal of this project is to create a Progressive Web Application (PWA) for reading NFC (Near Field Communication) data using the `NDEFReader` Web API. The implementation focuses on decoding NFC serial numbers into their decimal representation based on the MIFARE Classic 1K card standard. This document provides a detailed project structure and the core components needed to build the application, using modern best practices, libraries, and tools.

## Sample Code

The following code snippet illustrates the logic for converting an NFC serial number to its decimal representation:

```
def convert_nfc_serial(serial):
    """
    Convert an NFC serial number to its decimal representation.
    
    For MIFARE Classic 1K cards:
    - Uses 4-byte (32-bit) UIDs
    - Standard format is 10 digits for decimal representation
    - Leading zeros are used to maintain consistent field width
    
    Args:
        serial (str): NFC serial number in format "XX:XX:XX:XX" where X is hex digit
        
    Returns:
        str: 10-digit decimal number (standard MIFARE format)
    """
    # Step 1: Convert hex bytes to decimal values
    bytes_str = serial.replace(':', '')
    decimal_values = []
    for i in range(0, len(bytes_str), 2):
        hex_byte = bytes_str[i:i+2]
        decimal = int(hex_byte, 16)
        decimal_values.append(decimal)
    
    # Step 2: Convert each decimal to binary and ensure 8 bits
    binary_values = []
    for decimal in decimal_values:
        binary = format(decimal, '08b')
        binary_values.append(binary)
    
    # Step 3: Combine binary values in reverse order and take specific bits
    # MIFARE Classic uses 32-bit UIDs, but we only need 24 bits for conversion
    combined_binary = ''.join(binary_values[::-1])
    significant_bits = combined_binary[-24:]  # Take last 24 bits
    
    # Step 4: Convert significant bits to decimal
    final_decimal = int(significant_bits, 2)
    
    # Step 5: Format as 10-digit number (MIFARE standard format)
    result = str(final_decimal).zfill(10)
    
    # Print detailed steps for verification
    print(f"\nDetailed conversion steps:")
    print(f"1. Original serial: {serial}")
    print(f"2. Decimal values: {decimal_values}")
    print(f"3. Binary values: {binary_values}")
    print(f"4. Combined binary (reversed): {combined_binary}")
    print(f"5. Significant bits (24 bits): {significant_bits}")
    print(f"6. Final decimal: {final_decimal}")
    
    return result
```

## Project Structure

### 1. Core Modules

#### a. NFC Reader Module

This module will handle interactions with the `NDEFReader` Web API. It will:

- Detect NFC devices.
    
- Retrieve NFC tag data in a format compatible with the conversion logic.
    
- Provide error handling for unsupported devices or permissions issues.
    

#### b. Serial Conversion Module

The `convert_nfc_serial` function will form the core of this module. It will:

- Parse NFC tag data retrieved by the reader module.
    
- Convert the raw NFC serial number into its standardized decimal representation.
    
- Provide validation for input formats.
    

#### c. UI Module

This module will:

- Display instructions for using the NFC reader.
    
- Show the results of NFC scans, including intermediate steps for transparency (optional).
    
- Handle error messages, such as unsupported browsers or denied permissions.
    

### 2. Modern Tools and Libraries

#### a. Frontend Framework

- **React.js**: For building a responsive, modular user interface.
    
- **Shadcn**: For consistent and accessible UI components.
    

#### b. State Management

- **Redux Toolkit**: For managing global state, such as NFC read status and scanned data.
    

#### c. Build Tools

- **Vite.js**: A fast build tool optimized for modern web applications.
    

#### d. PWA Tools

- **Workbox**: For adding offline support and caching strategies.
    
- **Lighthouse**: For auditing and improving PWA performance and compliance.

### 3. Directory Structure

```
project-root/
├── public/               # Static assets (icons, manifest, etc.)
├── src/
│   ├── components/       # React components (e.g., NFCReader, ResultDisplay)
│   ├── hooks/            # Custom hooks (e.g., useNDEFReader)
│   ├── modules/          # Core modules (e.g., nfcReader.js, serialConverter.js)
│   ├── redux/            # Redux slices and store setup
│   ├── styles/           # Global and component-specific styles
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
├── package.json          # Project dependencies and scripts
└── vite.config.js        # Vite configuration
```

### 4. Key Features

- **Real-time NFC Scanning**: Automatically detects NFC tags and reads data.
    
- **Accurate Conversion**: Converts NFC serial numbers to decimal format using the provided algorithm.
    
- **Cross-Browser Support**: Leverages the `NDEFReader` API with fallback mechanisms for unsupported browsers.
    
- **Offline Support**: Allows users to view previously scanned NFC data when offline.
    
- **Responsive Design**: Ensures usability on both mobile and desktop devices.
    

## Core Development Steps

1. **Set Up Project Environment**
    
    - Initialize the project with Vite and install necessary dependencies.
        
    - Configure ESLint, Prettier, and TypeScript (optional) for code quality and type safety.
        
2. **Implement NFC Reader Module**
    
    - Use the `NDEFReader` API to detect NFC tags and retrieve serial numbers.
        
    - Implement error handling for permissions and unsupported devices.
        
3. **Integrate Serial Conversion Logic**
    
    - Adapt the `convert_nfc_serial` function into a reusable module.
        
4. **Develop User Interface**
    
    - Build components for scanning instructions, real-time results, and error messages.
        
    - Ensure accessibility and responsiveness using Shadcn.
        
5. **Add PWA Features**
    
    - Configure a service worker using Workbox.
        
    - Add a manifest file for PWA compliance.
        
    - Use Lighthouse to audit and improve performance.
        
6. **Testing and Deployment**
    
    - Write comprehensive tests for all modules.
        
    - Deploy using modern hosting platforms such as Vercel or Netlify.
        

## Conclusion

This document outlines a robust structure and best practices for implementing a PWA NFC reader. Following these guidelines will ensure a maintainable, performant, and user-friendly application.