import { FC, lazy } from "react";
import { PageWrapper } from "./StyledComponents";
import { Dashboard } from "./Dashboard/Dashboard";
import { MonthlyProgressLoaderComponent } from "./MonthlyProgress/CategoriesBudget/LoaderComponent";
import { DashboardLoaderComponent } from "./Dashboard/LoaderComponent";
import { MonthlyProgres } from "../models/fetch/monthlyProgress";
import { MonthlyProgress } from "./MonthlyProgress/MonthlyProgress";
import { MonthDataBreakDown } from "../models/expensesCategoryWidget/pieChart";

// DashboardPage Component with Suspense
interface IDashboardPage {
  monthlyExpenses: MonthDataBreakDown[] | undefined;
}
export const DashboardPage: FC<IDashboardPage> = ({
  monthlyExpenses,
}: IDashboardPage) => {
  return (
    <PageWrapper>
      {monthlyExpenses?.length ? (
        <Dashboard monthlyExpenses={monthlyExpenses} />
      ) : (
        <DashboardLoaderComponent />
      )}
    </PageWrapper>
  );
};

// MonthlyProgressPage Component with Suspense
interface IMonthlyProgressPage {
  monthlyProgress: MonthlyProgres[] | undefined;
}
export const MonthlyProgressPage: FC<IMonthlyProgressPage> = ({
  monthlyProgress,
}: IMonthlyProgressPage) => {
  // If data is still loading, use Suspense to show a fallback

  // const MonthlyProgress = React.lazy(() =>
  //   import("./MonthlyProgress/MonthlyProgress").then((m) => ({
  //     default: m.MonthlyProgress,
  //   }))
  // );
  return (
    <PageWrapper>
      {/* <Suspense fallback={<MonthlyProgressLoaderComponent />}> */}
      {monthlyProgress ? (
        <MonthlyProgress monthlyProgress={monthlyProgress} />
      ) : (
        <MonthlyProgressLoaderComponent />
      )}
      {/* </Suspense> */}
    </PageWrapper>
  );
};

// ExpensesTable Component
export const ExpensesTable: FC = () => {
  return <PageWrapper>ExpensesTable</PageWrapper>;
};

// NoPage Component (404)
export const NoPage: FC = () => {
  return <h1>404 Sorry mate...</h1>;
};
function Lazy(
  arg0: () => Promise<typeof import("./MonthlyProgress/MonthlyProgress")>
) {
  throw new Error("Function not implemented.");
}
