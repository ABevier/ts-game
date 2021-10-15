export const range = (n: number): number[] => {
  return Array(n)
    .fill(0)
    .map((_, i) => i);
};
