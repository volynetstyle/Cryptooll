function VigenereCipher(
  message: string,
  key: string,
  alphabet: string,
  mode: "encrypt" | "decrypt" | "shifted_atbash" | "gronsfeld" = "encrypt"
): string {
  const maxLength = Math.max(message.length, key.length);
  let result = "";
  const isGronsfeldDecrypt = mode === "decrypt" || mode === "gronsfeld";

  const getIndexByPosition = (str: string, i: number) => i % str.length;

  for (let i = 0; i < maxLength; i++) {
    const messageIndex = alphabet.indexOf(
      message[getIndexByPosition(message, i)]
    );
    const keyIndex = alphabet.indexOf(key[getIndexByPosition(key, i)]);
    const shift = (isGronsfeldDecrypt ? -1 : 1) * keyIndex;

    let encryptedChar =
      alphabet[(alphabet.length + messageIndex + shift) % alphabet.length];

    if (mode === "shifted_atbash") {
      encryptedChar =
        alphabet[alphabet.length - 1 - alphabet.indexOf(encryptedChar)];
    }

    result += encryptedChar;
  }

  return result;
}

export default VigenereCipher;
