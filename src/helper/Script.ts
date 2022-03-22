import { Countries } from "./json/Countries";

export const formatDate = (date: Date) => {
  let d = date;
  let ye = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}/${mo}/${ye}`;
};

export const ERROR404 = "/error";
export const ERROR500 = "/error";

export const handleErrorResponse = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 500: {
        window.location.href = ERROR500;
        break;
      }
      case 404: {
        window.location.href = ERROR404;
        break;
      }
      default:
        break;
    }
  }
};

export const countries: string[] = Countries.map((item: any) => {
  return item.name;
});

export function convertToInternationalCurrencySystem(labelValue: any) {
  // Nine Zeroes for Billions
  return labelValue
    ? +labelValue === Infinity
      ? Infinity
      : Math.abs(+labelValue) >= 1.0e9
      ? (Math.abs(+labelValue) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(+labelValue) >= 1.0e6
      ? (Math.abs(+labelValue) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(+labelValue) >= 1.0e3
      ? (Math.abs(+labelValue) / 1.0e3).toFixed(2) + "K"
      : Math.abs(+labelValue)
    : "N/A";
}
