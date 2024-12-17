import { Dispatch, FC, useEffect, useState } from "react";
import { PageWrapper } from "./StyledComponents";
import { Dashboard } from "./Dashboard/Dashboard";
import { MonthlyProgressLoaderComponent } from "./MonthlyProgress/CategoriesBudget/LoaderComponent";
import { DashboardLoaderComponent } from "./Dashboard/LoaderComponent";
import { MonthlyProgress } from "./MonthlyProgress/MonthlyProgress";
import {
  fetchMonthlyData,
  fetchMonthlyProgress,
  RootState,
} from "../global/globalStates/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useCategoriesContext } from "../global/globalStates/CategoriesContext";
import { CategoriesObj } from "../models/models";
import { Toast } from "../components/toastBar/ToastBar";
import { ToastBarComponent } from "./MonthlyProgress/ProgressBreakDown/SubcategoriesProgress/ToastBarComponent";

export const DashboardPage: FC = () => {
  const { categoriesContext } = useCategoriesContext();
  const loading = useSelector((state: RootState) => state?.data?.loading);
  const monthlyExpensesData = useSelector(
    (state: RootState) => state?.data?.data?.monthlyExpenses
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMonthlyData(categoriesContext));
  }, [dispatch]);
  return (
    <PageWrapper>
      {monthlyExpensesData?.length && !loading ? (
        <Dashboard monthlyExpenses={monthlyExpensesData} />
      ) : (
        <DashboardLoaderComponent />
      )}
    </PageWrapper>
  );
};

export const MonthlyProgressPage: FC = () => {
  const { categoriesContext } = useCategoriesContext();
  const dispatch = useDispatch();
  const { monthlyProgress: monthlyProgressData } = useSelector(
    (state: RootState) => state.data.data
  );
  const { loading } = useSelector((state: RootState) => state.data);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    dispatch(fetchMonthlyProgress(categoriesContext));
  }, [dispatch]);
  document.addEventListener("show-monthly-progress-toast-bar", (event) => {
    console.log(event);
    setShowToast(true);
  });
  return (
    <PageWrapper>
      {monthlyProgressData?.length && !loading ? (
        <>
          <MonthlyProgress monthlyProgress={monthlyProgressData} />
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            duration={4000}
            renderCustomComponent={() => <ToastBarComponent />}
          />
        </>
      ) : (
        <MonthlyProgressLoaderComponent />
      )}
    </PageWrapper>
  );
};
export const updateMonthlyProgress = async (
  promises: any[],
  dispatch: Dispatch<any>,
  categoriesContext: CategoriesObj[]
) => {
  const ids = await Promise.all(promises);
  if (ids.length > 0) {
    dispatch(fetchMonthlyProgress(categoriesContext, false));
    document.dispatchEvent(new CustomEvent("show-monthly-progress-toast-bar"));
  }
};

// ExpensesTable Component
export const ExpensesTable: FC = () => {
  return <PageWrapper>ExpensesTable</PageWrapper>;
};

// NoPage Component (404)
export const NoPage: FC = () => {
  return <h1>404 Sorry mate...</h1>;
};
