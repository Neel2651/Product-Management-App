// Convert a string to title case
export const titleCase = (str: string): string => {
  const words = str.toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
};

// Formatted Number Values
export const getFormattedNumberValue = (
  value: number, // Value to format
  currency: string = "INR", // Default currency
  mode: boolean = false, // If true, formats with suffixes (k, M, B)
  currencySign: boolean = true, // If true, uses currency symbol; otherwise uses currency code
  isCurrency: boolean = true // If true, formats as currency; otherwise as decimal
): string => {

  let formatter = "";

  if (mode) {
    // If mode is true, format the number with appropriate suffix
    if (Number(value) >= 1000000000) {
      value = value / 1000000000;
      formatter = "B";
    } else if (Number(value) >= 1000000) {
      value = value / 1000000;
      formatter = "M";
    } else if (Number(value) >= 1000) {
      value = value / 1000;
      formatter = "k";
    }
  }

  // Format the number using Intl.NumberFormat
  return `${new Intl.NumberFormat("en-US", {
    style: isCurrency ? "currency" : "decimal",
    currency: currency,
    currencyDisplay: currencySign ? "symbol" : "code",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value)}${formatter}`;
};
