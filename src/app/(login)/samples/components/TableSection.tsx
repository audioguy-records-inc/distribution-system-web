import CustomTable, { Column } from "@/components/basic/CustomTable";

import Dsp from "@/components/basic/CustomTable/components/Dsp";
import ExpandButton from "@/components/basic/CustomTable/components/ExpandButton";
import styled from "styled-components";
import { useDspContractStore } from "@/stores/use-dsp-contract-store";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default function TableSection() {
  const { dspContracts, fetchDspContracts } = useDspContractStore();

  const columns: Column<(typeof data)[0]>[] = [
    {
      header: "이름",
      accessor: "name",
      width: 200,
      render: (value, record) => (
        <Dsp name={value as string} imagePath={record.imagePath!} />
      ),
    },
    { header: "나이", accessor: "age", width: 100, align: "center" },
    { header: "이메일", accessor: "email" },
  ];

  const data = [
    {
      name: "홍길동",
      age: 20,
      email: "hong@example.com",
      imagePath: "/uploads/images/64/dsps/2025/02/03/testDsp001.jpg",
    },
    { name: "김철수", age: 25, email: "kim@example.com" },
  ];

  const expandedRowRender = (record: (typeof data)[0]) => {
    return (
      <div>
        <h4>{record.name}님의 상세 정보</h4>
        <p>나이: {record.age}세</p>
        <p>연락처: {record.email}</p>
      </div>
    );
  };

  useEffect(() => {
    fetchDspContracts();
  }, [fetchDspContracts]);

  console.log("moonsae dspContracts", dspContracts[0]);

  return (
    <Container>
      <TableWrapper>
        <CustomTable columns={columns} data={data} />
        <CustomTable columns={columns} data={data} size="small" />
        <CustomTable
          columns={columns}
          data={data}
          expandable={{
            expandedRowRender: expandedRowRender,
          }}
        />
      </TableWrapper>
    </Container>
  );
}
