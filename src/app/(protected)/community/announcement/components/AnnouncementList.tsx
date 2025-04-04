"use client";

import Announcement, { AnnouncementType } from "@/types/announcement";
import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";
import { useEffect, useState } from "react";

import { User } from "@/types/user";
import { UserInfo } from "os";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAnnouncementStore } from "@/stores/use-announcement-store";

const Container = styled.div``;

const Title = styled.div`
  ${theme.fonts.body1.medium}
  color: ${theme.colors.gray[800]};
`;

export default function AnnouncementList() {
  const { announcements, fetchAnnouncements } = useAnnouncementStore();

  const columns: Column<Announcement>[] = [
    {
      header: "날짜",
      accessor: "createdAt",
      type: "string",
      width: 132,
      align: "center",
      render: (value) => {
        const _value = value as Date;

        return <Title>{moment(_value).format("YYYY-MM-DD")}</Title>;
      },
    },
    {
      header: "제목",
      accessor: "title",
      type: "string",
      width: 553,
      align: "center",
    },
    {
      header: "작성자",
      accessor: "userInfo",
      type: "string",
      width: 140,
      align: "center",
      render: (value, row) => {
        const _value = value as User;

        return <Title>{_value?.displayName}</Title>;
      },
    },
    {
      header: "구분",
      accessor: "type",
      type: "string",
      width: 120,
      align: "center",
      render: (value) => {
        const _value = value as AnnouncementType;
        let _type = "";
        switch (_value) {
          case "TRANSMISSION":
            _type = "전송";
            break;
          case "SETTLEMENT":
            _type = "정산";
            break;
          case "ETC":
            _type = "기타";
            break;
        }
        return <Title>{_type}</Title>;
      },
    },
  ];

  useEffect(() => {
    fetchAnnouncements();
  }, []);
  console.log("moonsae announcements", announcements);
  return (
    <Container>
      <CustomTable columns={columns} data={announcements} />
    </Container>
  );
}
