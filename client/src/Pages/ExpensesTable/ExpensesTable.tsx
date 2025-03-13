import { useState } from "react";
import { Expense } from "../../models/fetch/expense";
import { Columns } from "./Columns";

import {
  MainSection,
  PageWrapper,
  TableWrapper,
  UpperSection,
} from "./StyledComponents";
import { Items } from "./items/Items";
import { Actions } from "./useActions/Actions";

export const ExpensesTable = (props: { expenses: Expense[] }) => {
  const { expenses } = props;
  const [showExpenses, setShowExpenses] = useState<Expense[]>(expenses);
  const changeExpenses = (expenses: Expense[]) => {
    setShowExpenses(expenses);
  };
  console.log("render expense table");
  return (
    <PageWrapper>
      Monthly Expense Management
      <TableWrapper className="TableWrapper">
        <UpperSection>
          <div>Expenses</div>
          <Actions />
        </UpperSection>
        <MainSection>
          <Columns expenses={showExpenses} changeExpenses={changeExpenses} />
          <Items expenses={showExpenses} />
        </MainSection>
      </TableWrapper>
    </PageWrapper>
  );
};
