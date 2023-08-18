const PERSIAN_NUMBERS = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const ARABIC_NUMBERS = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
const ENGLISH_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const toEnglishTokenize = (str: string): string[] => {
  const persianNumbers: Array<string> = PERSIAN_NUMBERS;
  const arabicNumbers: Array<string> = ARABIC_NUMBERS;
  const englishNumbers: Array<string> = ENGLISH_NUMBERS;
  return str
    .trim()
    .toLowerCase()
    .split("")
    .map(
      (c) =>
        englishNumbers[persianNumbers.indexOf(c)] ||
        englishNumbers[arabicNumbers.indexOf(c)] ||
        c
    )
    .join("")
    .replace(/[^a-zA-Z0-9,.${}_\u0621-\u064A ]/g, "")
    .split(" ");
};
export const checkIfArabic = (text: string): boolean => {
  var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
  return pattern.test(text);
};
export const findTextLang = (text: string): LangToken => {
  if (checkIfArabic(text)) {
    return {
      id: 1,
      value: "ar",
    };
  } else {
    return {
      id: 2,
      value: "en",
    };
  }
};




// types
enum LangId {
  en = 2,
  ar = 1,
}
type LangToken = {
  id: LangId;
  value: string;
};


