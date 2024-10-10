import { useEffect, useState, FC } from "react";
import { useTable } from "react-table";

import {
  generateTableBusinessProps,
  generateTableProps,
  GetBreakDownData,
  getInitialTableState,
  initialColumnState,
} from "./utils";
import { useBreakDownDataContext } from "../expensesCategoryContext";
import {
  ExpenseBreakDown,
  StyledTableITemWrapper,
  ToolTipWrapper,
} from "./StyledComponent";
import Tooltip from "../../../consts/icons/tooltip";
import ThreeDotsIcon from "../../../consts/icons/threeDots";
import CustomTooltip from "../../../consts/components/Tooltip";
import { ChangeExpenseCategoryModal } from "../../ChangeExpenseCategoryModal/ChangeExpenseCategoryModal";
import { Modal } from "../../ChangeExpenseCategoryModal/Modal";
import { CategoryMonthlyExpenses } from "../../../models/expensesCategoryWidget/pieChart";

interface tableColumn {
  Header: string;
  accessor: string; //
}

interface Props {
  data: CategoryMonthlyExpenses;
}

export const Table: FC<Props> = ({ data }: Props) => {
  const { contextState } = useBreakDownDataContext();
  const { month, category, subCategory } = contextState;
  //@ts-ignore
  const [tableData, setTableData] = useState<any[]>(
    //@ts-ignore
    getInitialTableState(data[month]?.["monthlyData"])
  );
  const [tableColumns, setTableColumns] =
    useState<tableColumn[]>(initialColumnState);
  const [expensesTableBreakDown, setExpensesTableBreakDown] =
    useState<any>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  //@ts-ignore
  const [modalProps, setModalProps] = useState<{
    businessName: "";
    amount: 0;
    date: "" | undefined;
    //@ts-ignore
  }>(undefined);
  const closeModal = () => {
    //@ts-ignore
    setModalProps(undefined);
    setModalOpen(false);
  };

  useEffect(() => {
    // if (month) {
    //     getMonthTableData(data[month], setTableData, setTableColumns)
    // }

    if (subCategory && category && month) {
      // @ts-ignore
      const tableData =
        data[month].monthlyData?.[category].categoryMonthData?.[subCategory]
          .subCategoryMonthData;
      if (tableData) {
        // @ts-ignore
        generateTableBusinessProps(
          //@ts-ignore
          Object.entries(tableData),
          setTableData,
          setTableColumns,
          setExpensesTableBreakDown,
          "Business Name"
        );
        return;
      }
    }
    if (category && month) {
      // @ts-ignore
      const tableData = data[month].monthlyData?.[category].categoryMonthData;
      if (tableData) {
        debugger;
        generateTableProps(
          Object.entries(tableData),
          setTableData,
          setTableColumns,
          "Sub Category"
        );
        return;
      }
    }
  }, [contextState]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data: tableData,
    });

  return (
    <>
      <table
        {...getTableProps()}
        style={{ border: "1px solid black", width: "100%", height: "100%" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{ height: "33px" }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ borderBottom: "2px solid black", fontWeight: 400 }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} style={{ height: "33px" }}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        borderBottom: "1px solid black",
                        height: "19px",
                        textAlign: index % 2 == 0 ? "start" : "center",
                      }}
                    >
                      {expensesTableBreakDown?.[cell.value] ? (
                        <StyledTableITemWrapper
                          className={"StyledTableITemWrapper"}
                        >
                          <ToolTipWrapper>
                            <CustomTooltip
                              icon={<Tooltip />}
                              contentId={`tooltip_${index}`}
                              ContentComponent={ExpenseBreakDown}
                              jsxContent={
                                <GetBreakDownData
                                  businessName={cell.value}
                                  data={expensesTableBreakDown?.[cell.value]}
                                />
                              }
                            />
                          </ToolTipWrapper>

                          {cell.render("Cell")}
                        </StyledTableITemWrapper>
                      ) : row.original.date &&
                        cell.column.Header === "Business Name" ? (
                        <StyledTableITemWrapper
                          onClick={() => {
                            setModalProps({
                              businessName: cell.value,
                              date: row.original.date,
                              amount: row.original.totalAmount,
                            });
                            setModalOpen(true);
                          }}
                        >
                          <CustomTooltip
                            icon={<ThreeDotsIcon />}
                            contentId={`threeDots_${index}`}
                            textContent={"change expense category"}
                          />

                          <Modal
                            isOpen={modalOpen}
                            onClose={closeModal}
                            contentWrapperHeight={0}
                          >
                            <ChangeExpenseCategoryModal
                              closeModal={closeModal}
                              businessName={modalProps?.businessName}
                              //@ts-ignore
                              date={modalProps?.date}
                              amount={modalProps?.amount}
                            />
                          </Modal>
                          {cell.render("Cell")}
                        </StyledTableITemWrapper>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
