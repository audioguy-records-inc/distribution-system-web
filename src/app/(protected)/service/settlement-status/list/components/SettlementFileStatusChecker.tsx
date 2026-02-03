"use client";

import {
  SETTLEMENT_FILE_STATE,
  SettlementFileState,
} from "@/constants/settlement-file-state";

import { AuthLevel } from "@/types/user";
import React from "react";
import { STATUS_COLORS } from "@/constants/status-colors";
import StatusDisplay from "@/components/common/StatusDisplay";
import { useAuthStore } from "@/stores/use-auth-store";
import { useFileStatusChecker } from "@/hooks/useFileStatusChecker";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useTranslations } from "next-intl";

const getStatusColor = (status: SettlementFileState): string => {
  switch (status) {
    case SETTLEMENT_FILE_STATE.PENDING:
      return STATUS_COLORS.PENDING;
    case SETTLEMENT_FILE_STATE.CONVERTING:
      return STATUS_COLORS.IN_PROGRESS;
    case SETTLEMENT_FILE_STATE.CONVERTING_SUCCESS:
      return STATUS_COLORS.SUCCESS;
    case SETTLEMENT_FILE_STATE.CONVERTING_ERROR:
      return STATUS_COLORS.ERROR;
    case SETTLEMENT_FILE_STATE.MATCHING:
      return STATUS_COLORS.MATCHING;
    case SETTLEMENT_FILE_STATE.MATCHING_SUCCESS:
      return STATUS_COLORS.SUCCESS;
    case SETTLEMENT_FILE_STATE.MATCHING_ERROR:
      return STATUS_COLORS.ERROR;
    default:
      return STATUS_COLORS.DEFAULT;
  }
};

const getStatusTextKey = (status: SettlementFileState): string => {
  switch (status) {
    case SETTLEMENT_FILE_STATE.PENDING:
      return "statusPending";
    case SETTLEMENT_FILE_STATE.CONVERTING:
      return "statusConverting";
    case SETTLEMENT_FILE_STATE.CONVERTING_SUCCESS:
      return "statusConvertingSuccess";
    case SETTLEMENT_FILE_STATE.CONVERTING_ERROR:
      return "statusConvertingError";
    case SETTLEMENT_FILE_STATE.MATCHING:
      return "statusMatching";
    case SETTLEMENT_FILE_STATE.MATCHING_SUCCESS:
      return "statusMatchingSuccess";
    case SETTLEMENT_FILE_STATE.MATCHING_ERROR:
      return "statusMatchingError";
    default:
      return "statusUnknown";
  }
};

// 진행 중인 상태인지 확인
const isProgressState = (status: string): boolean => {
  return (
    status === SETTLEMENT_FILE_STATE.PENDING ||
    status === SETTLEMENT_FILE_STATE.CONVERTING ||
    status === SETTLEMENT_FILE_STATE.MATCHING
  );
};

const SETTLEMENT_UPLOAD_STORAGE_KEY = "settlement_upload_in_progress";

function SettlementFileStatusChecker() {
  const t = useTranslations("settlement");
  const user = useAuthStore((state) => state.user);
  const { settlementFiles, fetchSettlementFiles, isLoading } =
    useSettlementStore();

  const currentStatus = useFileStatusChecker({
    files: user?.authLevel === AuthLevel.ADMIN ? settlementFiles : [],
    fetchFiles:
      user?.authLevel === AuthLevel.ADMIN
        ? fetchSettlementFiles
        : async () => {},
    isProgressState,
    storageKey: SETTLEMENT_UPLOAD_STORAGE_KEY,
  });

  // 관리자가 아닌 경우 컴포넌트 렌더링하지 않음
  if (user?.authLevel !== AuthLevel.ADMIN) {
    return null;
  }

  // 상태가 없으면 표시하지 않음
  if (!currentStatus) {
    return null;
  }

  const status = currentStatus as SettlementFileState;

  return (
    <StatusDisplay
      status={status}
      text={t(getStatusTextKey(status))}
      color={getStatusColor(status)}
      isLoading={isLoading}
    />
  );
}

export default React.memo(SettlementFileStatusChecker);
