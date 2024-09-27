import { HeaderProps } from "react-table";
import { Dispatch, FC, useState } from "react";
import {
  BreakDownColumn,
  BreakDownContainer,
  BreakDownTitle,
  StyledItem,
} from "./StyledComponent";
import ThreeDotsIcon from "../../../consts/icons/threeDots";
import CustomTooltip from "../../../consts/components/Tooltip";
import { ChangeExpenseCategoryModal } from "../../ChangeExpenseCategoryModal/ChangeExpenseCategoryModal";
import { Modal } from "../../ChangeExpenseCategoryModal/Modal";
import {
  Expense,
  MonthlyData,
  SubCategoryMonthData,
} from "../../../models/expensesCategoryWidget/pieChart";

export const initialColumnState = () => [
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Total Amount",
    accessor: "totalAmount",
  },
];
export const getInitialTableState = (data: MonthlyData) => {
  return Object.entries(data).map(([category, categoryData]) => ({
    category,
    totalAmount:
      category !== "totalAmount" ? categoryData.totalAmount : categoryData,
  }));
};

export const generateTableProps = (
  data: any[],
  setTableData: Dispatch<any>,
  setTableColumns: Dispatch<any>,
  headerLabel: string
) => {
  debugger;
  const tableData = data?.map(([key, value]) => ({
    [headerLabel]: key,
    totalAmount: key !== "totalAmount" ? value.totalAmount : value,
  }));

  const tableColumns: HeaderProps<any>[] = [
    {
      // @ts-ignore
      Header: headerLabel,
      accessor: headerLabel,
    },
    {
      // @ts-ignore
      Header: "Total Amount",
      accessor: "totalAmount",
    },
  ];

  setTableData(tableData);
  setTableColumns(tableColumns);
};

export const generateTableBusinessProps = (
  data: SubCategoryMonthData[],
  setTableData: Dispatch<any>,
  setTableColumns: Dispatch<any>,
  setExpensesTableBreakDown: Dispatch<any>,
  headerLabel: string
) => {
  // @ts-ignore
  const tableData = data?.map(([key, value]) => ({
    [headerLabel]: key,
    totalAmount: key !== "totalAmount" ? value.totalAmount : value,
    // @ts-ignore
    ...(key !== "totalAmount" &&
      getExpensesBreakDown(
        key,
        value?.business_nameMonthData,
        setExpensesTableBreakDown
      )),
  }));
  const tableColumns: HeaderProps<any>[] = [
    {
      // @ts-ignore
      Header: headerLabel,
      accessor: headerLabel,
    },
    {
      // @ts-ignore
      Header: "Date",
      accessor: "date",
    },

    {
      // @ts-ignore
      Header: "Total Amount",
      accessor: "totalAmount",
    },
  ];

  setTableData(tableData);
  setTableColumns(tableColumns);
};

const getExpensesBreakDown = (
  key: string,
  expense: Expense[],
  setExpensesBreakDown: Dispatch<any>
): {} => {
  if (expense.length == 1) {
    return {
      date: expense[0].date,
      totalAmount: expense[0].amount,
    };
  }
  setExpensesBreakDown({
    [key]: expense.map((expense) => ({
      date: expense.date,
      amount: expense.amount,
    })),
  });
  return {};
};

interface IGetBreakDownData {
  businessName: string;
  data: Expense[];
}

export const GetBreakDownData: FC<IGetBreakDownData> = ({
  data,
  businessName,
}: IGetBreakDownData) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<{
    businessName: string;
    amount: number;
    date: string;
  }>();
  const closeModal = () => setModalOpen(false);

  return (
    <BreakDownContainer>
      <BreakDownColumn>
        <BreakDownTitle>Date</BreakDownTitle>
        {data?.map((item: any, index: any) => (
          <StyledItem
            onClick={() => {
              setModalProps({
                businessName: businessName,
                date: item.date,
                amount: item.amount,
              });
              setModalOpen(true);
            }}
          >
            <CustomTooltip
              icon={<ThreeDotsIcon />}
              textContent={"change expense category"}
              contentId={`threeDots_${index}`}
            />

            {item.date}
          </StyledItem>
        ))}

        <Modal isOpen={modalOpen} onClose={closeModal} contentWrapperHeight={0}>
          <ChangeExpenseCategoryModal
            //@ts-ignore
            businessName={modalProps?.businessName}
            //@ts-ignore
            date={modalProps?.date}
            //@ts-ignore
            amount={modalProps?.amount}
            closeModal={closeModal}
          />
        </Modal>
      </BreakDownColumn>
      <BreakDownColumn>
        <BreakDownTitle>Amount</BreakDownTitle>
        {data?.map((item: any) => (
          <div>{item.amount}</div>
        ))}
      </BreakDownColumn>
    </BreakDownContainer>
  );
};
