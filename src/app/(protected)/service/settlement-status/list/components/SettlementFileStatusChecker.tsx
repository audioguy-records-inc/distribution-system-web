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

const getStatusText = (status: SettlementFileState): string => {
  switch (status) {
    case SETTLEMENT_FILE_STATE.PENDING:
      return "대기 중...";
    case SETTLEMENT_FILE_STATE.CONVERTING:
      return "변환 중...";
    case SETTLEMENT_FILE_STATE.CONVERTING_SUCCESS:
      return "변환 완료";
    case SETTLEMENT_FILE_STATE.CONVERTING_ERROR:
      return "변환 실패";
    case SETTLEMENT_FILE_STATE.MATCHING:
      return "매칭 중...";
    case SETTLEMENT_FILE_STATE.MATCHING_SUCCESS:
      return "매칭 완료";
    case SETTLEMENT_FILE_STATE.MATCHING_ERROR:
      return "매칭 실패";
    default:
      return "알 수 없음";
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

function SettlementFileStatusChecker() {
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
      text={getStatusText(status)}
      color={getStatusColor(status)}
      isLoading={isLoading}
    />
  );
}

export default React.memo(SettlementFileStatusChecker);
