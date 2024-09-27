import { JSX } from "react";
import { Table, TableCell, TableHeader, TableRow } from "./StyledComponents";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
type DataTableProps = {
  columnNames: string[];
  data: Object[];
};
/**
 * Renders a simple react-table.
 *
 * @param {string[]} columnNames - The table columns
 * @param {Object[]} data - the cell values, should be declared, as same order as the columns
 * @returns {JSX.Element} The rendered table.
 *  */
const DataTable = ({ columnNames, data }: DataTableProps): JSX.Element => {
  return (
    <Table>
      <thead>
        <TableRow>
          {columnNames.map((column) => {
            return <TableHeader>{capitalize(column)}</TableHeader>;
          })}
        </TableRow>
      </thead>
      <tbody>
        {data?.map((entry, index) => (
          <TableRow key={index}>
            {columnNames?.map((column) => (
              //@ts-ignore
              <TableCell>{entry[column]}</TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
