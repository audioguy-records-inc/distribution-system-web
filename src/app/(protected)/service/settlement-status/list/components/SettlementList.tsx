import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";

import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { AuthLevel } from "@/types/user";
import { SettlementSummary } from "@/types/settlement-summary";
import { formatCurrency } from "@/utils/format-currency";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAuthStore } from "@/stores/use-auth-store";
import { useCurrencyStore } from "@/stores/use-currency-store";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Container = styled.div``;

const DetailButton = styled.button<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 5px;
  border-radius: 50%;
  border: 1px solid
    ${({ $isExpanded }) =>
      $isExpanded ? theme.colors.purple[600] : theme.colors.gray[50]};
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "rotate(180deg)" : "rotate(0)"};
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: ${({ $isExpanded }) =>
      $isExpanded ? theme.colors.purple[50] : theme.colors.gray[50]};
  }
`;

const ArrowIcon = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const ExpandedContent = styled.div`
  padding: 20px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

const ExpandedTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
`;

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

const ServiceName = styled.span`
  font-weight: 600;
  color: #374151;
  min-width: 120px;
`;

const ServiceAmounts = styled.div`
  display: flex;
  gap: 24px;
`;

const AmountItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AmountLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const AmountValue = styled.span`
  font-weight: 600;
  color: #374151;
`;

const ExpandedRow = styled.div`
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

type SortField = "settlementFee" | "userSettlementFee";
type SortDirection = "asc" | "desc";

interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 8px;
`;

const ServiceHeaderLeft = styled.div`
  min-width: 120px;
`;

const ServiceHeaderRight = styled.div`
  display: flex;
  gap: 24px;
`;

const SortButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ $active }) => ($active ? theme.colors.purple[50] : "#f3f4f6")};
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? theme.colors.purple[600] : "#6b7280")};
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ $active }) => ($active ? theme.colors.purple[100] : "#e5e7eb")};
  }
`;

const SortIndicator = styled.span<{ $active: boolean; $direction: SortDirection }>`
  display: inline-flex;
  flex-direction: column;
  font-size: 10px;
  line-height: 1;
  gap: 1px;
  color: ${({ $active }) => ($active ? theme.colors.purple[600] : "#9ca3af")};
`;

export default function SettlementList() {
  const t = useTranslations("settlement");
  const { settlementSummaries } = useSettlementStore();
  const user = useAuthStore((state) => state.user);
  const { currency, exchangeRates } = useCurrencyStore();
  const [sortState, setSortState] = useState<SortState>({
    field: null,
    direction: "desc",
  });

  const toggleSort = (field: SortField) => {
    setSortState((prev) => {
      if (prev.field === field) {
        return { field, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { field, direction: "desc" };
    });
  };

  const columns: Column<SettlementSummary>[] = [
    {
      header: t("licensorName"),
      accessor: "userDisplayName",
      type: "string",
      align: "center",
    },
    {
      header: t("period"),
      accessor: "settlementStartMonth",
      type: "string",
      align: "center",
      render: (value, record) => {
        const startMonth = record.settlementStartMonth;
        const endMonth = record.settlementEndMonth;
        const startYear = Math.floor(startMonth / 100);
        const startMonthNum = startMonth % 100;
        const endYear = Math.floor(endMonth / 100);
        const endMonthNum = endMonth % 100;
        return `${startYear}.${startMonthNum
          .toString()
          .padStart(2, "0")} ~ ${endYear}.${endMonthNum
          .toString()
          .padStart(2, "0")}`;
      },
    },
    {
      header: t("serviceSales"),
      accessor: "settlementFee",
      type: "string",
      align: "center",
      render: (value) => {
        const _value = value as number;
        return formatCurrency(_value, currency, exchangeRates);
      },
    },
    {
      header: t("settlementAmount"),
      accessor: "userSettlementFee",
      type: "string",
      align: "center",
      render: (value) => {
        const _value = value as number;
        return formatCurrency(_value, currency, exchangeRates);
      },
    },
  ];

  const renderExpandedContent = (summary: SettlementSummary) => {
    const isAdmin = user?.authLevel === AuthLevel.ADMIN;

    const sortedServiceList = [...summary.serviceList].sort((a, b) => {
      if (!sortState.field) return 0;
      const diff = a[sortState.field] - b[sortState.field];
      return sortState.direction === "asc" ? diff : -diff;
    });

    const renderSortArrow = (field: SortField) => {
      const isActive = sortState.field === field;
      return (
        <SortIndicator $active={isActive} $direction={sortState.direction}>
          <span style={{ opacity: isActive && sortState.direction === "asc" ? 1 : 0.5 }}>▲</span>
          <span style={{ opacity: isActive && sortState.direction === "desc" ? 1 : 0.5 }}>▼</span>
        </SortIndicator>
      );
    };

    return (
      <ExpandedContent>
        <ExpandedTitle>{t("platformDetail")}</ExpandedTitle>
        <ServiceHeader>
          <ServiceHeaderLeft />
          <ServiceHeaderRight>
            <SortButton
              $active={sortState.field === "settlementFee"}
              onClick={() => toggleSort("settlementFee")}
            >
              {t("salesAmount")} {renderSortArrow("settlementFee")}
            </SortButton>
            {isAdmin && <div style={{ width: 120 }} />}
            <SortButton
              $active={sortState.field === "userSettlementFee"}
              onClick={() => toggleSort("userSettlementFee")}
            >
              {t("settlementAmount")} {renderSortArrow("userSettlementFee")}
            </SortButton>
          </ServiceHeaderRight>
        </ServiceHeader>
        <ServiceList>
          {sortedServiceList.map((service, index) => (
            <ServiceItem key={index}>
              <ServiceName>{service.service}</ServiceName>
              <ServiceAmounts>
                <AmountItem>
                  <AmountLabel>{t("salesAmountLabel")}</AmountLabel>
                  <AmountValue>
                    {formatCurrency(service.settlementFee, currency, exchangeRates)}
                  </AmountValue>
                </AmountItem>
                {isAdmin && (
                  <AmountItem>
                    <AmountLabel>{t("distributionFeeLabel")}</AmountLabel>
                    <AmountValue>
                      {formatCurrency(service.distributionFee, currency, exchangeRates)}
                    </AmountValue>
                  </AmountItem>
                )}
                <AmountItem>
                  <AmountLabel>{t("settlementAmountLabel")}</AmountLabel>
                  <AmountValue>
                    {formatCurrency(service.userSettlementFee, currency, exchangeRates)}
                  </AmountValue>
                </AmountItem>
              </ServiceAmounts>
            </ServiceItem>
          ))}
        </ServiceList>
      </ExpandedContent>
    );
  };

  return (
    <Container>
      <CustomTable
        columns={columns}
        data={settlementSummaries}
        expandable={{
          expandedRowRender: renderExpandedContent,
          expandColumnWidth: 50,
        }}
      />
    </Container>
  );
}
