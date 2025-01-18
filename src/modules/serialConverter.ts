/**
 * Serial Converter Module
 * Converts NFC serial numbers to decimal representation based on MIFARE Classic 1K standard
 */

interface ConversionSteps {
  originalSerial: string;
  decimalValues: number[];
  binaryValues: string[];
  combinedBinary: string;
  significantBits: string;
  finalDecimal: number;
}

export class SerialConverter {
  /**
   * Convert an NFC serial number to its decimal representation.
   * 
   * For MIFARE Classic 1K cards:
   * - Uses 4-byte (32-bit) UIDs
   * - Standard format is 10 digits for decimal representation
   * - Leading zeros are used to maintain consistent field width
   * 
   * @param serial NFC serial number in format "XX:XX:XX:XX" where X is hex digit
   * @returns Object containing the result and detailed conversion steps
   */
  static convert(serial: string): { result: string; steps: ConversionSteps } {
    // Step 1: Convert hex bytes to decimal values
    const bytesStr = serial.replace(/:/g, '');
    const decimalValues: number[] = [];
    
    for (let i = 0; i < bytesStr.length; i += 2) {
      const hexByte = bytesStr.slice(i, i + 2);
      const decimal = parseInt(hexByte, 16);
      decimalValues.push(decimal);
    }

    // Step 2: Convert each decimal to binary and ensure 8 bits
    const binaryValues = decimalValues.map(decimal => 
      decimal.toString(2).padStart(8, '0')
    );

    // Step 3: Combine binary values in reverse order and take specific bits
    const combinedBinary = binaryValues.reverse().join('');
    const significantBits = combinedBinary.slice(-24); // Take last 24 bits

    // Step 4: Convert significant bits to decimal
    const finalDecimal = parseInt(significantBits, 2);

    // Step 5: Format as 10-digit number (MIFARE standard format)
    const result = finalDecimal.toString().padStart(10, '0');

    return {
      result,
      steps: {
        originalSerial: serial,
        decimalValues,
        binaryValues,
        combinedBinary,
        significantBits,
        finalDecimal
      }
    };
  }
}

export default new SerialConverter(); 