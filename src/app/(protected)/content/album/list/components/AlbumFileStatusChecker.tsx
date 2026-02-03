"use client";

import React from "react";
import { ALBUM_FILE_STATE, AlbumFileState } from "@/constants/album-file-state";
import { STATUS_COLORS } from "@/constants/status-colors";
import StatusDisplay from "@/components/common/StatusDisplay";
import { useFileStatusChecker } from "@/hooks/useFileStatusChecker";
import { useAlbumStore } from "@/stores/use-album-store";
import { useTranslations } from "next-intl";

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

const getStatusTextKey = (status: AlbumFileState): string => {
  switch (status) {
    case ALBUM_FILE_STATE.PENDING:
      return "statusPending";
    case ALBUM_FILE_STATE.IN_PROGRESS:
      return "statusInProgress";
    case ALBUM_FILE_STATE.COMPLETED:
      return "statusCompleted";
    case ALBUM_FILE_STATE.FAILED:
      return "statusFailed";
    default:
      return "statusUnknown";
  }
};

// 진행 중인 상태인지 확인
const isProgressState = (status: string): boolean => {
  return (
    status === ALBUM_FILE_STATE.PENDING ||
    status === ALBUM_FILE_STATE.IN_PROGRESS
  );
};

const ALBUM_UPLOAD_STORAGE_KEY = "album_upload_in_progress";

function AlbumFileStatusChecker() {
  const { albumFiles, fetchAlbumFiles, isLoading } = useAlbumStore();
  const t = useTranslations("content");

  const currentStatus = useFileStatusChecker({
    files: albumFiles,
    fetchFiles: fetchAlbumFiles,
    isProgressState,
    storageKey: ALBUM_UPLOAD_STORAGE_KEY,
  });

  // 상태가 없으면 표시하지 않음
  if (!currentStatus) {
    return null;
  }

  const status = currentStatus as AlbumFileState;
  
  return (
    <StatusDisplay
      status={status}
      text={t(getStatusTextKey(status))}
      color={getStatusColor(status)}
      isLoading={isLoading}
    />
  );
}

export default React.memo(AlbumFileStatusChecker);
