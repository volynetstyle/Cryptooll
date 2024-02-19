import { Playfair } from "../src/utils/algorithms";

describe('Playfair Cipher', () => {
  it('should encrypt and decrypt text using Playfair cipher with English alphabet', () => {
    const key = 'Gravity falls';
    const playfair = new Playfair(key);

    // Encrypt
    const plaintext = 'hello world';
    const ciphertext = playfair.crypt(plaintext);
    expect(ciphertext).toEqual('cgpvtqfzht');

    // Decrypt
    const decryptedText = playfair.decrypt(ciphertext);
    expect(decryptedText).toEqual(plaintext);
  });

});
