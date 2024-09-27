import styled from 'styled-components';

export const Table = styled.table`
  width: 251px;
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 18px;
  text-align: left;
  border: 1px solid #e0e0e0;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const TableHeader = styled.th`
  padding: 12px 20px;
  background-color: #f2f2f2;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  border: 1px solid #e0e0e0;
`;

export const TableCell = styled.td`
  padding: 10px 20px;
  text-align: center;
  border: 1px solid #e0e0e0;

`;