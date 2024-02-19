export enum Language {
  en = 0,
  ua = 1,
}

function caesar(
  text: string,
  key: number,
  alphabet: string,
  b_encrypt: boolean,
  b_keep_chars: boolean,
  b_block_of_five: boolean
): string {
  const alphabetLength = alphabet.length;
  let ciphertext = "";
  let adjustedKey = b_encrypt ? key : (alphabetLength - key) % alphabetLength;

  for (let oldCharacter of text) {
    let newCharacter = "";

    const index = alphabet.indexOf(oldCharacter);

    if (index !== -1) {
      const new_index = (index + adjustedKey) % alphabetLength;
      newCharacter = alphabet.charAt(new_index);
    } else if (
      b_keep_chars &&
      !(b_block_of_five && b_encrypt && oldCharacter === " ")
    ) {
      newCharacter = oldCharacter;
    } else {
      continue;
    }

    ciphertext += newCharacter;

    if (
      b_block_of_five &&
      b_encrypt &&
      ciphertext.replace(/\s/g, "").length % 5 === 0
    ) {
      ciphertext += " ";
    }
  }

  return ciphertext;
}

// Пример использования:
// const encryptedTextEn = caesarCipher("Hello World", 3, "en");
// console.log(encryptedTextEn); // Вывод: Khoor Zruog

// const encryptedTextUa = caesarCipher("Привіт Світ", 3, "ua");
// console.log(encryptedTextUa); // Вывод: Супем Узлф

class Playfair {
  private alph: string;

  constructor(key: string) {
    key = this.replace(key);
    if (this.check_bad_lang(key)) {
      throw new Error("Only English characters should be used!");
    }
    key = this.edit_key(key);
    this.alph = this.make_alph(key);
  }

  private replace(text: string): string {
    return text.replace(/[^a-zA-Z]/g, "").toLowerCase();
  }

  private check_bad_lang(text: string): boolean {
    return /[а-яА-ЯёЁ]/.test(text);
  }

  private edit_key(key: string): string {
    return key;
  }

  private make_alph(key: string): string {
    const alph = "abcdefghiklmnopqrstuvwxyz";
    let res = key;
    for (let i = 0; i < alph.length; i++) {
      if (!res.includes(alph[i])) {
        res += alph[i];
      }
    }
    return res;
  }

  public crypt(text: string): string {
    text = this.replace(text);
    if (this.check_bad_lang(text)) {
      throw new Error();
    }
    if (text.length % 2 === 1) {
      text += "x";
    }
    let ctext = "";
    let length = ctext.length;
    while (length < text.length) {
      if (text[length] === text[length + 1]) {
        text = text.slice(0, length + 1) + "x" + text.slice(length + 1);
      }
      ctext += this.crypt_b(text.slice(length, length + 2));
      length = ctext.length;
    }
    return ctext;
  }

  private crypt_b(bigr: string): string {
    let first_x = Math.floor(this.alph.indexOf(bigr[0]) / 5);
    let first_y = this.alph.indexOf(bigr[0]) % 5;
    let second_x = Math.floor(this.alph.indexOf(bigr[1]) / 5);
    let second_y = this.alph.indexOf(bigr[1]) % 5;

    if (first_x === second_x) {
      first_y = (first_y + 1) % 5;
      second_y = (second_y + 1) % 5;
    } else if (first_y === second_y) {
      first_x = (first_x + 1) % 5;
      second_x = (second_x + 1) % 5;
    } else {
      [first_y, second_y] = [second_y, first_y];
    }

    return (
      this.alph[first_x * 5 + first_y] + this.alph[second_x * 5 + second_y]
    );
  }

  public decrypt(text: string): string {
    text = this.replace(text);
    if (this.check_bad_lang(text)) {
      throw new Error();
    }
    let dtext = "";
    for (let i = 0; i < text.length; i += 2) {
      dtext += this.decrypt_b(text.slice(i, i + 2));
    }
    return dtext;
  }

  private decrypt_b(bigr: string): string {
    let first_x = Math.floor(this.alph.indexOf(bigr[0]) / 5);
    let first_y = this.alph.indexOf(bigr[0]) % 5;
    let second_x = Math.floor(this.alph.indexOf(bigr[1]) / 5);
    let second_y = this.alph.indexOf(bigr[1]) % 5;

    if (first_x === second_x) {
      first_y = (first_y - 1 + 5) % 5;
      second_y = (second_y - 1 + 5) % 5;
    } else if (first_y === second_y) {
      first_x = (first_x - 1 + 5) % 5;
      second_x = (second_x - 1 + 5) % 5;
    } else {
      [first_y, second_y] = [second_y, first_y];
    }

    return (
      this.alph[first_x * 5 + first_y] + this.alph[second_x * 5 + second_y]
    );
  }
}

export { caesar, Playfair };
