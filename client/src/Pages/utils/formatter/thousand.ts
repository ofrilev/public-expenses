export const toThousandK = (value: string) => {
  const n = Number(value);
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : value.toString();
};

export const toThousandComma = (value: number) => {
  return value >= 1000 ? value.toLocaleString() : value.toString();
};
