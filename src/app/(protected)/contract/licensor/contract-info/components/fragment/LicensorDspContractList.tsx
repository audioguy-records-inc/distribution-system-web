import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";
import { useEffect, useState } from "react";

import ButtonOutlinedAssistive from "@/components/basic/buttons/ButtonOutlinedAssistive";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import CenterSpinner from "@/components/CenterSpinner";
import CustomCheckbox from "@/components/basic/CustomCheckbox";
import CustomDropdown from "@/components/basic/CustomDropdown";
import DspContract from "@/types/dsp-contract";
import LoadIcon from "@/components/icons/LoadIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import { toast } from "react-hot-toast";
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
    searchDspContracts,
    fetchDspContracts,
  } = useDspContractStore();

  const dropdownList = dspContracts.map((dspContract) => ({
    key: dspContract._id,
    value: dspContract.dspContractName,
  }));

  const columns: Column<DspContract>[] = [
    {
      header: "계약명",
      accessor: "dspContractName",
      type: "component",
      width: 220,
      align: "center",
      render: (_value, record) => {
        const _selectedKey = record._id;

        return (
          <CustomDropdown
            width={180}
            size="small"
            placeholder="계약명 선택"
            selectedKey={_selectedKey}
            items={dropdownList}
            onSelectKey={(key) => {
              // 이미 선택된 계약인지 확인
              const isAlreadySelected = value.some(
                (contract) =>
                  contract._id === key && contract._id !== record._id,
              );

              if (isAlreadySelected) {
                toast.error("해당 계약은 이미 선택되었습니다");
                return;
              }

              const selectedContract = dspContracts.find(
                (contract) => contract._id === key,
              );
              if (!selectedContract) return;

              const newValue = [...value];
              const contractIndex = newValue.findIndex(
                (contract) => contract._id === record?._id,
              );

              if (contractIndex !== -1) {
                newValue[contractIndex] = {
                  ...selectedContract,
                };
                onChange(newValue);
              }
            }}
            readOnly={readOnly}
          />
        );
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
        const rate = ((value as number) * 100).toFixed(0);
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
        if (!record || !record._id) return null;

        // 기존 계약의 전체 contractItemList를 표시
        const contract = dspContracts.find(
          (contract) => contract._id === record._id,
        );

        if (!contract) return null;

        const allContractItems = contract.contractItemList;
        const currentItems = _value as string[];

        return (
          <CheckboxWrapper>
            {allContractItems.map((item) => {
              // 현재 선택된 항목인지 확인
              const isChecked = currentItems?.includes(item) || false;

              return (
                <CustomCheckbox
                  key={item}
                  label={item}
                  checked={isChecked}
                  readOnly={!isEdit}
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
              const response = await searchDspContracts("", "");

              onChange(response);
            }}
            size="small"
          />
          <ButtonOutlinedAssistive
            label="국내 DSP 불러오기"
            leftIcon={<LoadIcon />}
            onClick={async () => {
              const response = await searchDspContracts(
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
              const response = await searchDspContracts(
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

      {!readOnly && (
        <>
          <ButtonOutlinedSecondary
            size="medium"
            expand
            leftIcon={<PlusIcon />}
            label="추가"
            onClick={() => {
              if (readOnly) return;
              const newValue = [...value];
              newValue.push({
                _id: "",
                dspContractName: "",
                contractRate: 0,
                contractItemList: [],
                dspId: "",
                dspContractUniqueId: "",
                regionType: "domestic",
                countryCode: "",
                isContractEnabled: false,
                isTimeReleaseEnabled: false,
                contactPersonList: [],
                fileList: [],
              } as DspContract);
              onChange(newValue);
            }}
          />
        </>
      )}
      {isLoading && <CenterSpinner />}
    </Container>
  );
};

export default LicensorDspContractList;
