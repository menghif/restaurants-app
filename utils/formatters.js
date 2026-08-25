export const formatAddress = (address) =>
  `${address.building} ${address.street}`;

export const capitalizeWords = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const truncate = (str, maxLength) => {
  if (!str) return "";
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};
