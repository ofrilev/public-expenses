import { createContext, ReactNode, useContext, useState } from "react";
import { ContextState } from "../ExpensesCategoryWidget/expensesCategoryContext";
import { CategoriesObjArr } from "../../models/models";

interface CategoriesContextType {
  categoriesContext: CategoriesObjArr;
  setCategoriesContext: (categories: any) => void;
}

// Create a new context
const CategoriesContext = createContext<CategoriesContextType | undefined | {}>(
  {}
);
export const useCategoriesContext = (): CategoriesContextType => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("no context was provided");
  }
  // @ts-ignore
  return context;
};

interface Props {
  children: ReactNode;
}

export const CategoriesContextProvider: React.FC<Props> = ({ children }) => {
  // Define your context value and any necessary state or functions
  const [state, setState] = useState<ContextState | undefined | {}>({});

  return (
    <CategoriesContext.Provider
      value={{ categoriesContext: state, setCategoriesContext: setState }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
