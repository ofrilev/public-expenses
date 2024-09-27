import { FC, useState } from "react";
import LoaderGif from "../../../../consts/components/LoaderGif";

export const useLoader = (
  isLoading: boolean,
  setIsLoading: (b: boolean) => void
) => {
  const startLoading = () => {
    setIsLoading(true);
  };
  const stopLoading = () => {
    setIsLoading(false);
  };
  const renderLoader = (Component: FC<any>, props?: any) => {
    if (isLoading) {
      return <LoaderGif />;
    } else {
      return <Component {...props} />;
    }
  };
  return { startLoading, stopLoading, renderLoader };
};
