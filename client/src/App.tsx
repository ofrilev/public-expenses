import { FC, useEffect, useState } from "react";
import { Platform } from "./platform/Platform";
import { useCategoriesContext } from "./global/globalStates/CategoriesContext";
import LoaderGif from "../consts/components/LoaderGif";
import { fetchCategories } from "./utils/fetch/categories";
import { getCategoriesHierarchy } from "./utils/fetch/format/getCategoriesHierarchy";

export const App: FC = () => {
  const { setCategoriesContext, setCategoriesHierarchy } =
    useCategoriesContext();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetchCategories();
      if (categoriesData && categoriesData.length > 0) {
        setCategoriesContext(categoriesData);
        setCategoriesHierarchy(getCategoriesHierarchy(categoriesData));
        setIsFetching(false);
      }
    };
    getCategories();
  }, [setCategoriesContext]);

  if (isFetching) {
    //todo make a main loader here
    return <LoaderGif />;
  }

  return <Platform />;
};
