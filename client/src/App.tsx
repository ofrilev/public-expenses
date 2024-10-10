import { FC, useEffect, useState } from "react";
import { Platform } from "./platform/Platform";
import { fetchData } from "./utils/useFetch";
import {
  ItemsHierarchy,
  useCategoriesContext,
} from "./global/globalStates/CategoriesContext";
import LoaderGif from "../consts/components/LoaderGif";
import { CategoriesObjArr } from "./models/models";

const getCategoriesHierarchy = (categoriesObjArr: CategoriesObjArr) => {
  const itemsHierarchy: ItemsHierarchy = {};
  categoriesObjArr.Categories.map((item) => {
    if (item.parent == null) {
      itemsHierarchy[item.id] = {
        name: item.category,
        children: [],
      };
    } else {
      itemsHierarchy[item.parent].children.push({
        id: item.id,
        name: item.category,
      });
    }
  });
  return itemsHierarchy;
};

export const App: FC = () => {
  const { setCategoriesContext, setCategoriesHierarchy } =
    useCategoriesContext();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      console.log("fetching categories");
      const categoriesData = await fetchData(
        "categories?&sort=id&page_size=100"
      );
      setCategoriesContext(categoriesData);
      setCategoriesHierarchy(
        getCategoriesHierarchy(categoriesData as CategoriesObjArr)
      );
      setIsFetching(false);
      console.log("categories fetched");
    };
    fetchCategories();
  }, [setCategoriesContext]);

  if (isFetching) {
    //todo make a main loader here
    return <LoaderGif />;
  }

  return <Platform />;
};
