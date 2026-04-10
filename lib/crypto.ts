import CryptoJS from 'crypto-js';

export function encryptPassword(password: string, hexKey: string): string {
    // Parse the 64-character (32-byte) hex string into a WordArray
    const key = CryptoJS.enc.Hex.parse(hexKey);

    // Encrypt the password using AES-256-ECB. CryptoJS automatically handles ECB with no IV.
    const encrypted = CryptoJS.AES.encrypt(password, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    // Return the Base64 representation of the encrypted data
    return encrypted.toString();
}
