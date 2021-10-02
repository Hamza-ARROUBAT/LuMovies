export const numberFormat = (number) => {
  if (Math.floor(number / 1000000000) >= 1) {
    return Math.floor(number / 1000000000)
      .toString()
      .concat('B');
  } else if (Math.floor(number / 1000000) >= 1) {
    return Math.floor(number / 1000000)
      .toString()
      .concat('M');
  } else if (Math.floor(number / 1000) >= 1) {
    return Math.floor(number / 1000)
      .toString()
      .concat('K');
  } else {
    return number;
  }
};
