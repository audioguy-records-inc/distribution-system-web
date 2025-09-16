"use client";

import React from "react";
import { ALBUM_FILE_STATE, AlbumFileState } from "@/constants/album-file-state";
import { STATUS_COLORS } from "@/constants/status-colors";
import StatusDisplay from "@/components/common/StatusDisplay";
import { useFileStatusChecker } from "@/hooks/useFileStatusChecker";
import { useAlbumStore } from "@/stores/use-album-store";

const getStatusColor = (status: AlbumFileState): string => {
  switch (status) {
    case ALBUM_FILE_STATE.PENDING:
      return STATUS_COLORS.PENDING;
    case ALBUM_FILE_STATE.IN_PROGRESS:
      return STATUS_COLORS.IN_PROGRESS;
    case ALBUM_FILE_STATE.COMPLETED:
      return STATUS_COLORS.SUCCESS;
    case ALBUM_FILE_STATE.FAILED:
      return STATUS_COLORS.ERROR;
    default:
      return STATUS_COLORS.DEFAULT;
  }
};

const getStatusText = (status: AlbumFileState): string => {
  switch (status) {
    case ALBUM_FILE_STATE.PENDING:
      return "대기 중...";
    case ALBUM_FILE_STATE.IN_PROGRESS:
      return "처리 중...";
    case ALBUM_FILE_STATE.COMPLETED:
      return "완료";
    case ALBUM_FILE_STATE.FAILED:
      return "실패";
    default:
      return "알 수 없음";
  }
};

// 진행 중인 상태인지 확인
const isProgressState = (status: string): boolean => {
  return (
    status === ALBUM_FILE_STATE.PENDING ||
    status === ALBUM_FILE_STATE.IN_PROGRESS
  );
};

function AlbumFileStatusChecker() {
  const { albumFiles, fetchAlbumFiles, isLoading } = useAlbumStore();

  const currentStatus = useFileStatusChecker({
    files: albumFiles,
    fetchFiles: fetchAlbumFiles,
    isProgressState,
  });

  // 상태가 없으면 표시하지 않음
  if (!currentStatus) {
    return null;
  }

  const status = currentStatus as AlbumFileState;
  
  return (
    <StatusDisplay
      status={status}
      text={getStatusText(status)}
      color={getStatusColor(status)}
      isLoading={isLoading}
    />
  );
}

export default React.memo(AlbumFileStatusChecker);
