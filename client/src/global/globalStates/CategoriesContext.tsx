import { createContext, ReactNode, useContext, useState } from "react";
import { CategoriesObj } from "../../models/models";

export type ItemsHierarchy = {
  [id: number]: {
    name: string;
    children: { id: number; name: string }[];
  };
};
interface CategoriesContextType {
  categoriesContext: CategoriesObj[];
  setCategoriesContext: (categories: any) => void;
  categoriesHierarchy: ItemsHierarchy;
  setCategoriesHierarchy: (categories: any) => void;
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
  return context as CategoriesContextType;
};

interface Props {
  children: ReactNode;
}

export const CategoriesContextProvider: React.FC<Props> = ({ children }) => {
  // Define your context value and any necessary state or functions
  const [categoriesContext, setCategoriesContext] = useState<
    CategoriesObj[] | undefined | {}
  >({});
  const [categoriesHierarchy, setCategoriesHierarchy] = useState<
    ItemsHierarchy | undefined | {}
  >({});

  return (
    <CategoriesContext.Provider
      value={{
        categoriesContext,
        setCategoriesContext,
        categoriesHierarchy,
        setCategoriesHierarchy,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
