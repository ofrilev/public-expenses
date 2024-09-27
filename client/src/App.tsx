import { FC, useEffect, useState } from "react";
import { Platform } from "./platform/Platform";
import { fetchData } from "./utils/useFetch";
import { useCategoriesContext } from "./global/globalStates/CategoriesContext";
import LoaderGif from "../consts/components/LoaderGif";
import { MonthExpensesContextProvider } from "./global/globalStates/MonthExpensesContext";

export const App: FC = () => {
  const { setCategoriesContext } = useCategoriesContext();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      console.log("fetching categories");
      const categoriesData = await fetchData("categories?page_size=100");
      setCategoriesContext(categoriesData);
      setIsFetching(false);
      console.log("categories fetched");
    };
    fetchCategories();
  }, [setCategoriesContext]);

  if (isFetching) {
    //todo make a main loader here
    return <LoaderGif />;
  }

  return (
    <MonthExpensesContextProvider>
      <Platform />
    </MonthExpensesContextProvider>
  );
};
