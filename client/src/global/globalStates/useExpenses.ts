import React, { FC, useEffect, useState } from "react";
import { Expenses } from "../../models/fetch/expense";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expenses>();
  return { expenses, setExpenses };
};
