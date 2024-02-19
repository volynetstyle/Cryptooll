import VigenereCipher from "../src/utils/Vizhener";

describe("VigenereCipher", () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  it("decrypts a message using Vigenere cipher", () => {
    const cipherText = "ATTACKATDAWN";
    const key = "LEMON";
    const expectedMessage = "LXFOPVEFRNHR";
    expect(VigenereCipher(cipherText, key, alphabet, "encrypt")).toBe(
      expectedMessage
    );
  });
});
