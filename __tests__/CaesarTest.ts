import { caesar } from "../src/utils/algorithms";

describe("caesar function", () => {
  // Тесты для украинского языка
  it("should encrypt Ukrainian text with positive key", () => {
    const text = "Привіт Світ";
    const key = 3;
    const alphabet =
      "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя";
    const result = caesar(text, key, alphabet, true, true, false);
    expect(result).toBe("Туйдкх Фдкх");
  });

  it("should decrypt Ukrainian text with negative key", () => {
    const text = "Туйдкх Фдкх";
    const key = -3;
    const alphabet =
      "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя";
    const result = caesar(text, key, alphabet, true, true, false);
    expect(result).toBe("Привіт Світ");
  });

  it("should decrypt Ukrainian text with negative key", () => {
    const text =
      "Вікно відкрите дивиться у сад, де від дощу піднялись буйно трави. І день, що розпочатий так, навгад, приносить спокій тихий і ласкавий. Марта КАЛИТОВСЬКА";
    const key = 26;
    const alphabet =
      "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя";
    const result = caesar(text, key, alphabet, true, true, false);
    expect(result).toBe(
      "ШҐЄИІ шҐюЄЙГЛя юГшГЛУКХ М Кцю, юя шҐю юІТМ ЇҐюИХЖГКУ чМЕИІ ЛЙцшГ. ґ юяИУ, ТІ ЙІВЇІРцЛГЕ ЛцЄ, Ицшщцю, ЇЙГИІКГЛУ КЇІЄҐЕ ЛГОГЕ Ґ ЖцКЄцшГЕ. зцЙЛц єЦжгліШкуєЦ"
    );
  });


  // Тесты для английского языка
  it("should encrypt English text with positive key", () => {
    const text = "Hello World";
    const key = 3;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const result = caesar(text, key, alphabet, true, true, false);
    expect(result).toBe("Khoor Zruog");
  });

  it("should decrypt English text with negative key", () => {
    const text = "Khoor Zruog";
    const key = -3;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const result = caesar(text, key, alphabet, true, true, false);
    expect(result).toBe("Hello World");
  });

  it("should encrypt and decrypt English text with the same key", () => {
    const text = "Hello World";
    const key = 5;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const encrypted = caesar(text, key, alphabet, true, true, false);
    const decrypted = caesar(encrypted, -key, alphabet, true, true, false);
    expect(decrypted).toBe(text);
  });
});
