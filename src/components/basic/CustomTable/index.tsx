import React, { useState } from "react";

import ExpandButton from "./components/ExpandButton";
import styled from "styled-components";
import theme from "@/styles/theme";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  width?: number;
  align?: "left" | "center" | "right";
}

interface CustomTableProps<T> {
  columns: Column<T>[];
  data: T[];
  size?: "small" | "normal";
  expandable?: {
    expandedRowRender: (record: T) => React.ReactNode;
    // expandColumn?: number; // 추후 버튼 위치 정할 때 사용, 구현되어있지 않음. 지금은 맨 뒤에 위치
    expandColumnWidth?: number;
  };
}

const TableContainer = styled.div`
  width: 100%;
  border: none;
  border-radius: 0;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${theme.colors.white};
`;

const TableHeader = styled.thead`
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray[50]};
`;

const HeaderCell = styled.th<{
  $width?: number;
  $align?: "left" | "center" | "right";
  $size?: "small" | "normal";
}>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium}
  color: ${theme.colors.gray[400]};
  padding: ${({ $size }) => ($size === "small" ? "12px" : "16px")} 24px;
  text-align: ${({ $align }) => $align || "left"};
  width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ $isExpanded?: boolean }>`
  border-bottom: 1px solid ${theme.colors.gray[50]};
  background: ${({ $isExpanded }) =>
    $isExpanded ? theme.colors.gray[25] : theme.colors.white};

  &:hover {
    background: ${({ $isExpanded }) =>
      $isExpanded ? theme.colors.gray[25] : theme.colors.gray[25]};
  }
`;

const TableCell = styled.td<{
  $align?: "left" | "center" | "right";
  $size?: "small" | "normal";
}>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium}
  color: ${theme.colors.gray[800]};
  padding: ${({ $size }) => ($size === "small" ? "16px 12px" : "24px 20px")};
  text-align: ${({ $align }) => $align || "left"};
`;

const ExpandedContent = styled.tr`
  background: ${theme.colors.white};
`;

const ExpandedCell = styled.td`
  padding: 16px 24px;
`;

const CustomTable = <T extends Record<string, any>>({
  columns,
  data,
  size = "normal",
  expandable,
}: CustomTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (rowIndex: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowIndex)) {
      newExpandedRows.delete(rowIndex);
    } else {
      newExpandedRows.add(rowIndex);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            {columns.map((column, index) => (
              <HeaderCell
                key={index}
                $width={column.width}
                $align={column.align}
                $size={size}
              >
                {column.header}
              </HeaderCell>
            ))}
            {expandable && (
              <HeaderCell $width={expandable.expandColumnWidth ?? 40} />
            )}
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <TableRow $isExpanded={expandedRows.has(rowIndex)}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} $align={column.align} $size={size}>
                    {row[column.accessor]}
                  </TableCell>
                ))}
                {expandable && (
                  <TableCell
                    $size={size}
                    style={{
                      width: expandable.expandColumnWidth ?? 40,
                      padding: "0 8px",
                    }}
                  >
                    <ExpandButton
                      isExpanded={expandedRows.has(rowIndex)}
                      onClick={() => toggleRow(rowIndex)}
                    />
                  </TableCell>
                )}
              </TableRow>
              {expandable && expandedRows.has(rowIndex) && (
                <ExpandedContent>
                  <ExpandedCell colSpan={columns.length + 1}>
                    {expandable.expandedRowRender(row)}
                  </ExpandedCell>
                </ExpandedContent>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
