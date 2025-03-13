import CustomTable, { Column } from "@/components/basic/CustomTable";

import ExpandButton from "@/components/basic/CustomTable/components/ExpandButton";
import styled from "styled-components";

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
  const columns: Column<(typeof data)[0]>[] = [
    { header: "이름", accessor: "name", width: 200 },
    { header: "나이", accessor: "age", width: 100, align: "center" },
    { header: "이메일", accessor: "email" },
  ];

  const data = [
    { name: "홍길동", age: 20, email: "hong@example.com" },
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
