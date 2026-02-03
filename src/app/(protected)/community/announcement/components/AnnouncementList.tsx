"use client";

import Announcement, { AnnouncementType } from "@/types/announcement";
import CustomTable, {
  Column,
} from "@/components/basic/custom-table/CustomTable";
import { useEffect, useState } from "react";

import Link from "next/link";
import { User } from "@/types/user";
import { UserInfo } from "os";
import moment from "moment";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useAnnouncementStore } from "@/stores/use-announcement-store";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Container = styled.div``;

const Title = styled.div`
  ${theme.fonts.body1.medium}
  color: ${theme.colors.gray[800]};
`;

export default function AnnouncementList() {
  const t = useTranslations("announcement");
  const { announcements, fetchAnnouncements } = useAnnouncementStore();
  const router = useRouter();
  const columns: Column<Announcement>[] = [
    {
      header: t("date"),
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
      header: t("subject"),
      accessor: "title",
      type: "string",
      width: 553,
      align: "center",
    },
    {
      header: t("author"),
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
      header: t("type"),
      accessor: "type",
      type: "string",
      width: 120,
      align: "center",
      render: (value) => {
        const _value = value as AnnouncementType;
        let _type = "";
        switch (_value) {
          case "TRANSMISSION":
            _type = t("typeTransmission");
            break;
          case "SETTLEMENT":
            _type = t("typeSettlement");
            break;
          case "ETC":
            _type = t("typeEtc");
            break;
        }
        return <Title>{_value}</Title>;
      },
    },
  ];

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return (
    <Container>
      <CustomTable
        columns={columns}
        data={announcements}
        onClick={(record) => {
          router.push(`/community/announcement/${record._id}`);
        }}
      />
    </Container>
  );
}
