const basicNumbers = [
  "zéro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
];

const tensNumbersFrench = [
  "",
  "dix",
  "vingt",
  "trente",
  "quarante",
  "cinquante",
  "soixante",
  "soixante",
  "quatre-vingt",
  "quatre-vingt",
];

const tensNumbersBelgian = [
  "",
  "dix",
  "vingt",
  "trente",
  "quarante",
  "cinquante",
  "soixante",
  "septante",
  "huitante", // or "octante"
  "nonante",
];

export const convert = (number: number, lang: "fr" | "bg"): string => {
  if (number < 0 || number >= 1000000000000) {
    throw new Error("Number out of range");
  }

  if (number < 17) {
    return basicNumbers[number] as string;
  }

  const convertBelowHundred = (n: number): string => {
    if (n < 17) {
      return basicNumbers[n] as string;
    } else if (n < 70 || (lang === "bg" && n < 100)) {
      let tensNumbers;
      switch (lang) {
        case "fr":
          tensNumbers = tensNumbersFrench[Math.floor(n / 10)];
          break;
        case "bg":
          tensNumbers = tensNumbersBelgian[Math.floor(n / 10)];
          break;
        default:
          tensNumbers = tensNumbersFrench[Math.floor(n / 10)];
      }
      // Special case for numbers ending with 1 in French
      if (lang === "fr" && n % 10 === 1 && n !== 11) {
        return tensNumbers + "-et-un";
      }
      return tensNumbers + (n % 10 > 0 ? "-" + basicNumbers[n % 10] : "");
    } else if (n < 80) {
      return "soixante-" + convertBelowHundred(n - 60);
    } else {
      return (
        "quatre-vingt" +
        (n === 80 ? "s" : n % 10 > 0 ? "-" + convertBelowHundred(n - 80) : "")
      );
    }
  };

  const convertHundreds = (n: number): string => {
    if (n < 100) {
      return convertBelowHundred(n);
    } else if (n === 100) {
      return "cent";
    } else {
      return n % 100 === 0
        ? basicNumbers[Math.floor(n / 100)] + "-cents"
        : basicNumbers[Math.floor(n / 100)] +
            "-cent-" +
            convertBelowHundred(n % 100);
    }
  };

  const convertThousands = (n: number): string => {
    if (n < 1000) {
      return convertHundreds(n);
    } else if (n === 1000) {
      return "mille";
    } else {
      return n % 1000 === 0
        ? convertHundreds(Math.floor(n / 1000)) + "-mille"
        : convertHundreds(Math.floor(n / 1000)) +
            "-mille-" +
            convertHundreds(n % 1000);
    }
  };

  const convertMillions = (n: number): string => {
    if (n < 1000000) {
      return convertThousands(n);
    } else if (n === 1000000) {
      return "un million";
    } else {
      return n % 1000000 === 0
        ? convertThousands(Math.floor(n / 1000000)) + " millions"
        : convertThousands(Math.floor(n / 1000000)) +
            " millions " +
            convertThousands(n % 1000000);
    }
  };

  const convertBillions = (n: number): string => {
    if (n < 1000000000) {
      return convertMillions(n);
    } else if (n === 1000000000) {
      return "un milliard";
    } else {
      return n % 1000000000 === 0
        ? convertMillions(Math.floor(n / 1000000000)) + " milliards"
        : convertMillions(Math.floor(n / 1000000000)) +
            " milliards " +
            convertMillions(n % 1000000000);
    }
  };

  return convertBillions(number);
};
