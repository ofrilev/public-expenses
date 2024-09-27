import { useTable, Column } from "react-table";
import "./styles.css";

interface ITableProps {
  data: any[];
  //   columns: Column<any>[]
}

const columns: Column<any>[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Name",
    accessor: "name",
  },
];

const ExpensesTable: React.FC<ITableProps> = (props) => {
  const { data } = props;
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="bar-chart grid-item">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <th {...cell.getCellProps()}> {cell.render("Cell")} </th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
