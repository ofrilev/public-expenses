import { useState } from "react";

export const useDateChooser = (initialDate: Date) => {
  const [date, setDate] = useState(initialDate);

  const incrementMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const decrementMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const formatDate = () => {
    return `${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${date.getFullYear()}`;
  };

  return { date, incrementMonth, decrementMonth, formatDate };
};
