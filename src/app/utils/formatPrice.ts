export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
};
