import { Dispatch, FC, useEffect, useState } from "react";

import {
  fetchMonthlyData,
  fetchMonthlyProgress,
  RootState,
} from "../global/globalStates/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useCategoriesContext } from "../global/globalStates/CategoriesContext";
import { CategoriesObj } from "../models/models";
import { Toast } from "../components/toastBar/ToastBar";

import { Expense } from "../models/fetch/expense";
import { Dashboard } from "./Dashboard/Dashboard";
import { DashboardLoaderComponent } from "./Dashboard/LoaderComponent";
import { ExpensesTable } from "./ExpensesTable/ExpensesTable";
import { MonthlyProgressLoaderComponent } from "./MonthlyProgress/CategoriesBudget/LoaderComponent";
import { MonthlyProgress } from "./MonthlyProgress/MonthlyProgress";
import { ToastBarComponent } from "./MonthlyProgress/ProgressBreakDown/SubcategoriesProgress/ToastBarComponent";
import { PageWrapper } from "./StyledComponents";

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
  promises: Promise<number>[],
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
export const ExpensesTablePage: FC = () => {
  const expenses: Expense[] = [
    {
      id: 1,
      amount: 100,
      business_name: "Workiz",
      date: "02/01/2024",
      card_number: 2344,
      category: 28,
      special: 0,
    },
    {
      id: 2,
      amount: 250,
      business_name: "Amazon",
      date: "03/15/2024",
      card_number: 5678,
      category: 15,
      special: 1,
    },
    {
      id: 3,
      amount: 75,
      business_name: "Netflix",
      date: "04/10/2024",
      card_number: 1234,
      category: 5,
      special: 0,
    },
    {
      id: 4,
      amount: 320,
      business_name: "Uber",
      date: "05/20/2024",
      card_number: 7890,
      category: 12,
      special: 0,
    },
    {
      id: 5,
      amount: 45,
      business_name: "Starbucks",
      date: "01/28/2024",
      card_number: 1111,
      category: 8,
      special: 1,
    },
    {
      id: 6,
      amount: 560,
      business_name: "Apple",
      date: "06/02/2024",
      card_number: 4321,
      category: 18,
      special: 0,
    },
    {
      id: 7,
      amount: 135,
      business_name: "Walmart",
      date: "07/15/2024",
      card_number: 8765,
      category: 20,
      special: 0,
    },
    {
      id: 8,
      amount: 90,
      business_name: "Spotify",
      date: "08/05/2024",
      card_number: 2222,
      category: 5,
      special: 1,
    },
    {
      id: 9,
      amount: 410,
      business_name: "Best Buy",
      date: "09/12/2024",
      card_number: 3456,
      category: 25,
      special: 0,
    },
    {
      id: 10,
      amount: 230,
      business_name: "Target",
      date: "10/30/2024",
      card_number: 6543,
      category: 10,
      special: 1,
    },
    {
      id: 11,
      amount: 65,
      business_name: "Panera Bread",
      date: "11/22/2024",
      card_number: 7777,
      category: 8,
      special: 0,
    },
    {
      id: 12,
      amount: 120,
      business_name: "Lyft",
      date: "12/10/2024",
      card_number: 8888,
      category: 12,
      special: 1,
    },
    {
      id: 13,
      amount: 500,
      business_name: "Home Depot",
      date: "01/18/2025",
      card_number: 9999,
      category: 22,
      special: 0,
    },
    {
      id: 14,
      amount: 290,
      business_name: "Costco",
      date: "02/25/2025",
      card_number: 5555,
      category: 15,
      special: 0,
    },
    {
      id: 15,
      amount: 80,
      business_name: "Chipotle",
      date: "03/03/2025",
      card_number: 6666,
      category: 8,
      special: 1,
    },
  ];

  return (
    <PageWrapper>
      <ExpensesTable expenses={expenses} />
    </PageWrapper>
  );
};

// NoPage Component (404)
export const NoPage: FC = () => {
  return <h1>404 Sorry mate...</h1>;
};
