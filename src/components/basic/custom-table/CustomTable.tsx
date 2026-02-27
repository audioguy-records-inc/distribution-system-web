import React, { useState } from "react";

import CustomDropdown from "../CustomDropdown";
import CustomInput from "../CustomInput";
import ExpandButton from "./components/ExpandButton";
import styled from "styled-components";
import theme from "@/styles/theme";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  width?: number;
  align?: "left" | "center" | "right";
  type: "string" | "input" | "dropdown" | "component" | "button";
  render?: (
    value: T[keyof T] | null,
    record: T,
    rowIndex?: number,
  ) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  dropdownOptions?: { key: string; value: string }[];
  icon?: React.ReactNode;
  onClick?: (record: T, rowIndex: number) => void;
  sortable?: boolean;
}

interface CustomTableProps<T> {
  columns: Column<T>[];
  data: T[];
  size?: "small" | "normal";
  expandable?: {
    expandedRowRender: (record: T, index?: number) => React.ReactNode;
    // expandColumn?: number; // 추후 버튼 위치 정할 때 사용, 구현되어있지 않음. 지금은 맨 뒤에 위치
    expandColumnWidth?: number;
  };
  onChange?: (value: T[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: (record: T) => void;
  multiSort?: boolean;
  onSortChange?: (sortConfigs: { key: keyof T; order: "asc" | "desc" }[]) => void;
}

const TableContainer = styled.div`
  width: 100%;
  border: none;
  border-radius: 0;
  overflow: visible;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${theme.colors.white};
  table-layout: fixed;
`;

const TableHeader = styled.thead`
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray[50]};
`;

const HeaderCell = styled.th<{
  $width?: number;
  $align?: "left" | "center" | "right";
  $size?: "small" | "normal";
  $sortable?: boolean;
}>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium}
  color: ${theme.colors.gray[400]};
  padding: ${({ $size }) => ($size === "small" ? "12px" : "16px")} 24px;
  text-align: ${({ $align }) => $align || "center"};
  width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  min-width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  max-width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: ${({ $sortable }) => ($sortable ? "pointer" : "default")};
  user-select: ${({ $sortable }) => ($sortable ? "none" : "auto")};
`;

const SortBadge = styled.div<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ $active }) => ($active ? theme.colors.purple[50] : "#f3f4f6")};
  color: ${({ $active }) => ($active ? theme.colors.purple[600] : "#6b7280")};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    background-color: ${({ $active }) => ($active ? theme.colors.purple[100] : "#e5e7eb")};
  }
`;

const SortArrowGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 1px;
`;

const SortArrow = styled.span<{ $active?: boolean; $sortActive?: boolean }>`
  font-size: 10px;
  line-height: 1;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  color: ${({ $sortActive }) => ($sortActive ? theme.colors.purple[600] : "#9ca3af")};
`;

const SortPriority = styled.span<{ $active?: boolean }>`
  font-size: 10px;
  line-height: 1;
  color: ${({ $active }) => ($active ? theme.colors.purple[600] : "#6b7280")};
  font-weight: 600;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ $isExpanded?: boolean; $clickable?: boolean }>`
  border-bottom: 1px solid ${theme.colors.gray[50]};
  background: ${({ $isExpanded }) =>
    $isExpanded ? theme.colors.gray[25] : theme.colors.white};
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  &:hover {
    background: ${({ $isExpanded }) =>
      $isExpanded ? theme.colors.gray[25] : theme.colors.gray[25]};
  }
`;

const TableCell = styled.td<{
  $align?: "left" | "center" | "right";
  $size?: "small" | "normal";
  $width?: number;
}>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium}
  color: ${theme.colors.gray[800]};
  padding: ${({ $size }) => ($size === "small" ? "6px 12px" : "22px 20px")};
  text-align: ${({ $align }) => $align || "left"};
  width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  min-width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  max-width: ${({ $width }) => ($width ? `${$width}px` : "auto")};
  overflow: visible;
`;

const ExpandedContent = styled.tr`
  background: ${theme.colors.white};
`;

const ExpandedCell = styled.td``;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Text = styled.div<{ $size?: "small" | "normal" }>`
  ${({ $size }) =>
    $size === "small" ? theme.fonts.body2.medium : theme.fonts.body1.medium};
  color: ${theme.colors.gray[800]};
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const RenderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTable = <T extends Record<string, any>>({
  columns,
  data,
  size = "normal",
  expandable,
  onChange,
  disabled = false,
  readOnly = false,
  onClick,
  multiSort = true,
  onSortChange,
}: CustomTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [sortConfigs, setSortConfigs] = useState<
    { key: keyof T; order: "asc" | "desc" }[]
  >([]);

  // columns나 data가 undefined이거나 배열이 아닌 경우를 처리
  const safeColumns = Array.isArray(columns) ? columns : [];
  const safeData = Array.isArray(data) ? data : [];

  const handleSort = (accessor: keyof T) => {
    let nextConfigs: { key: keyof T; order: "asc" | "desc" }[] = [];
    setSortConfigs((prev) => {
      const idx = prev.findIndex((s) => s.key === accessor);
      if (multiSort) {
        if (idx === -1) {
          nextConfigs = [...prev, { key: accessor, order: "asc" }];
        } else if (prev[idx].order === "asc") {
          const next = [...prev];
          next[idx] = { key: accessor, order: "desc" };
          nextConfigs = next;
        } else {
          nextConfigs = prev.filter((_, i) => i !== idx);
        }
      } else {
        if (idx === -1) {
          nextConfigs = [{ key: accessor, order: "asc" }];
        } else if (prev[idx].order === "asc") {
          nextConfigs = [{ key: accessor, order: "desc" }];
        } else {
          nextConfigs = [];
        }
      }
      return nextConfigs;
    });
    if (onSortChange) {
      onSortChange(nextConfigs);
    }
  };

  const compareValues = (aVal: unknown, bVal: unknown): number => {
    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    if (typeof aVal === "number" && typeof bVal === "number") return aVal - bVal;
    if (Array.isArray(aVal) && Array.isArray(bVal))
      return aVal.join(", ").localeCompare(bVal.join(", "));
    return String(aVal).localeCompare(String(bVal));
  };

  const sortedData = (() => {
    if (onSortChange) return safeData;
    if (sortConfigs.length === 0) return safeData;
    return [...safeData].sort((a, b) => {
      for (const { key, order } of sortConfigs) {
        const comparison = compareValues(a[key], b[key]);
        if (comparison !== 0) return order === "asc" ? comparison : -comparison;
      }
      return 0;
    });
  })();

  const getSortIndex = (accessor: keyof T): number =>
    sortConfigs.findIndex((s) => s.key === accessor);

  const getSortOrder = (accessor: keyof T): "asc" | "desc" | null => {
    const config = sortConfigs.find((s) => s.key === accessor);
    return config ? config.order : null;
  };

  const toggleRow = (rowIndex: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowIndex)) {
      newExpandedRows.delete(rowIndex);
    } else {
      newExpandedRows.add(rowIndex);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleInputChange = (
    rowIndex: number,
    accessor: keyof T,
    value: string,
  ) => {
    if (!onChange) return;

    const newData = [...data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [accessor]: value,
    };

    onChange(newData);
  };

  const handleDropdownChange = (
    rowIndex: number,
    accessor: keyof T,
    selectedKey: string,
  ) => {
    if (!onChange) return;

    const newData = [...data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [accessor]: selectedKey,
    };

    onChange(newData);
  };

  const renderCellContent = (column: Column<T>, row: T, rowIndex: number) => {
    // row가 null이거나 undefined인 경우 처리
    if (!row) return null;

    // value가 null이거나 undefined인 경우를 안전하게 처리
    const value = row[column.accessor] ?? null;

    if (column.render) {
      return (
        <RenderContainer>{column.render(value, row, rowIndex)}</RenderContainer>
      );
    }

    switch (column.type) {
      case "input":
        return (
          <CustomInput
            value={(value as string) || ""}
            onChange={(e) =>
              handleInputChange(rowIndex, column.accessor, e.target.value)
            }
            size={size}
            width={(column.width || 150) - 24}
            disabled={disabled}
            readOnly={readOnly}
          />
        );
      case "dropdown":
        return (
          <CustomDropdown
            selectedKey={value as string}
            onSelectKey={(selectedKey) =>
              handleDropdownChange(
                rowIndex,
                column.accessor,
                selectedKey as string,
              )
            }
            items={column.dropdownOptions || []}
            size={size}
            width={(column.width || 150) - 24}
            disabled={disabled}
            placeholder="선택"
            readOnly={readOnly}
          />
        );
      case "button":
        if (readOnly || disabled) return;
        return (
          <Button
            onClick={() => column.onClick?.(row, rowIndex)}
            disabled={disabled}
          >
            {column.icon}
          </Button>
        );
      default:
        return <Text $size={size}>{value}</Text>;
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            {safeColumns.map((column, index) => (
              <HeaderCell
                key={index}
                $width={column.width}
                $align={column.align}
                $size={size}
                $sortable={column.sortable}
                onClick={column.sortable ? () => handleSort(column.accessor) : undefined}
              >
                {column.renderHeader ? (
                  column.renderHeader()
                ) : column.sortable ? (
                  <SortBadge $active={getSortOrder(column.accessor) !== null}>
                    {column.header}
                    <SortArrowGroup>
                      <SortArrow
                        $active={getSortOrder(column.accessor) === "asc"}
                        $sortActive={getSortOrder(column.accessor) !== null}
                      >▲</SortArrow>
                      <SortArrow
                        $active={getSortOrder(column.accessor) === "desc"}
                        $sortActive={getSortOrder(column.accessor) !== null}
                      >▼</SortArrow>
                    </SortArrowGroup>
                    {sortConfigs.length > 1 && getSortIndex(column.accessor) !== -1 && (
                      <SortPriority $active>{getSortIndex(column.accessor) + 1}</SortPriority>
                    )}
                  </SortBadge>
                ) : (
                  column.header
                )}
              </HeaderCell>
            ))}
            {expandable && (
              <HeaderCell $width={expandable.expandColumnWidth ?? 40} />
            )}
          </tr>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <TableRow
                $isExpanded={expandedRows.has(rowIndex)}
                $clickable={!!onClick}
                onClick={() => onClick?.(row)}
              >
                {safeColumns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    $align={column.align}
                    $size={size}
                    $width={column.width}
                  >
                    {renderCellContent(column, row, rowIndex)}
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
                  <ExpandedCell colSpan={safeColumns.length + 1}>
                    {expandable.expandedRowRender(row, rowIndex)}
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
