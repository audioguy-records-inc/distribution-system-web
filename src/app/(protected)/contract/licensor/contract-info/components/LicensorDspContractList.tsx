import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";
import { useEffect, useState } from "react";

import ButtonOutlinedAssistive from "@/components/basic/buttons/ButtonOutlinedAssistive";
import CenterSpinner from "@/components/CenterSpinner";
import CustomCheckbox from "@/components/basic/CustomCheckbox";
import CustomDropdown from "@/components/basic/CustomDropdown";
import { Dsp } from "@/types/dsp";
import DspContract from "@/types/dsp-contract";
import Gap from "@/components/basic/Gap";
import LoadIcon from "@/components/icons/LoadIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  ${theme.fonts.heading2.medium}
  color: ${theme.colors.gray[800]};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

interface LicensorDspContractListProps {
  value: DspContract[];
  onChange: (data: DspContract[]) => void;
  readOnly?: boolean;
  isEdit: boolean;
}

const LicensorDspContractList = ({
  value,
  onChange,
  readOnly,
  isEdit,
}: LicensorDspContractListProps) => {
  const {
    dspContracts,
    isLoading,
    error,
    searchDspContract,
    fetchDspContracts,
  } = useDspContractStore();

  const dropdownList = dspContracts.map((dspContract) => ({
    key: dspContract._id,
    value: dspContract.dspContractName,
  }));
  console.log("moonsae dspContracts", dspContracts);
  const columns: Column<DspContract>[] = [
    {
      header: "계약명",
      accessor: "dspContractName",
      type: "component",
      width: 220,
      align: "center",

      render: (_value) => {
        return <>{_value}</>;
      },
    },
    {
      header: "계약 요율",
      accessor: "contractRate",
      type: "string",
      width: 150,
      align: "center",
      dropdownOptions: [
        { key: "domestic", value: "국내" },
        { key: "international", value: "해외" },
      ],
      render: (value) => {
        const rate = (value as number) * 100;
        return <>{rate}%</>;
      },
    },
    {
      header: "상품",
      accessor: "contractItemList",
      type: "component",
      width: 439,
      align: "center",
      render: (_value, record) => {
        if (!record) return null;

        // 기존 계약의 전체 contractItemList를 표시
        const allContractItems = dspContracts.filter(
          (contract) => contract._id === record._id,
        )[0].contractItemList;

        return (
          <CheckboxWrapper>
            {allContractItems.map((item) => {
              // 현재 선택된 항목인지 확인
              const isChecked = _value?.includes(item) || false;

              return (
                <CustomCheckbox
                  key={item}
                  label={item}
                  checked={isChecked}
                  onChange={(_isChecked) => {
                    const newValue = [...value];
                    const contractIndex = newValue.findIndex(
                      (contract) => contract._id === record._id,
                    );

                    if (contractIndex === -1) return;

                    if (_isChecked) {
                      // 체크: 아이템 추가
                      newValue[contractIndex].contractItemList = [
                        ...(newValue[contractIndex].contractItemList || []),
                        item,
                      ];
                    } else {
                      // 체크 해제: 아이템 제거
                      newValue[contractIndex].contractItemList = (
                        newValue[contractIndex].contractItemList || []
                      ).filter((i) => i !== item);
                    }

                    onChange(newValue);
                  }}
                  size="small"
                />
              );
            })}
          </CheckboxWrapper>
        );
      },
    },
    {
      header: "",
      accessor: "action" as keyof DspContract,
      type: "button",
      width: 72,
      icon: <TrashIcon />,
      onClick: (record, rowIndex) => {
        const newValue = [...value];
        newValue.splice(rowIndex, 1);
        onChange(newValue);
      },
    },
  ];

  useEffect(() => {
    const _fetchDspContract = async () => {
      const response = await fetchDspContracts();
    };
    _fetchDspContract();
  }, [fetchDspContracts]);

  return (
    <Container>
      <Header>공급 범위</Header>
      {isEdit && (
        <ButtonWrapper>
          <ButtonOutlinedAssistive
            label="전체 DSP 불러오기"
            leftIcon={<LoadIcon />}
            onClick={async () => {
              const response = await searchDspContract("", "");

              onChange(response);
            }}
            size="small"
          />
          <ButtonOutlinedAssistive
            label="국내 DSP 불러오기"
            leftIcon={<LoadIcon />}
            onClick={async () => {
              const response = await searchDspContract(
                "domestic",
                "regionType",
              );

              onChange(response);
            }}
            size="small"
          />
          <ButtonOutlinedAssistive
            label="해외 DSP 불러오기"
            leftIcon={<LoadIcon />}
            onClick={async () => {
              const response = await searchDspContract(
                "international",
                "regionType",
              );

              onChange(response);
            }}
            size="small"
          />
        </ButtonWrapper>
      )}
      <CustomTable
        columns={columns}
        data={value}
        onChange={onChange}
        size="small"
        readOnly={readOnly}
      />
      {isLoading && <CenterSpinner />}
    </Container>
  );
};

export default LicensorDspContractList;
