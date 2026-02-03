import { useEffect, useState } from "react";

import ButtonFilledPrimary from "@/components/basic/buttons/ButtonFilledPrimary";
import ButtonOutlinedSecondary from "@/components/basic/buttons/ButtonOutlinedSecondary";
import Modal from "react-modal";
import { SettlementFile } from "@/types/settlement-file";
import TrashIcon from "@/components/icons/TrashIcon";
import XIcon from "@/components/icons/XIcon";
import styled from "styled-components";
import theme from "@/styles/theme";
import { useSettlementStore } from "@/stores/use-settlement-store";
import { useTranslations } from "next-intl";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 80vh;
  min-height: 80vh;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    padding: "16px 20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Title = styled.div`
  ${theme.fonts.title2.medium};
  color: ${theme.colors.gray[800]};
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
`;

const FileItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 8px;
  background-color: ${theme.colors.white};
`;

const FileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.red[500]};

  &:hover {
    background-color: ${theme.colors.red[50]};
  }
`;

const ConfirmModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const ConfirmContent = styled.div`
  ${theme.fonts.body1.medium};
  color: ${theme.colors.gray[800]};
  text-align: center;
  margin-bottom: 24px;
`;

const ConfirmButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const FileName = styled.div`
  ${theme.fonts.body1.medium};
  color: ${theme.colors.gray[800]};
`;

const FileInfo = styled.div`
  display: flex;
  gap: 16px;
  ${theme.fonts.body2.regular};
  color: ${theme.colors.gray[600]};
`;

const StatusBadge = styled.div<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  ${theme.fonts.caption1.medium};
  color: white;
  background-color: ${(props) => {
    switch (props.status) {
      case "PENDING":
        return theme.colors.blue[500];
      case "CONVERTING":
        return theme.colors.blue[500];
      case "CONVERTING_SUCCESS":
        return theme.colors.green[600];
      case "CONVERTING_ERROR":
        return theme.colors.red[500];
      case "MATCHING":
        return theme.colors.blue[600];
      case "MATCHING_SUCCESS":
        return theme.colors.green[600];
      case "MATCHING_ERROR":
        return theme.colors.red[600];
      default:
        return theme.colors.gray[500];
    }
  }};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  ${theme.fonts.body1.regular};
  color: ${theme.colors.gray[500]};
`;

const getStatusTextKey = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "statusPendingShort";
    case "CONVERTING":
      return "statusConvertingShort";
    case "CONVERTING_SUCCESS":
      return "statusConvertingSuccessShort";
    case "CONVERTING_ERROR":
      return "statusConvertingErrorShort";
    case "MATCHING":
      return "statusMatchingShort";
    case "MATCHING_SUCCESS":
      return "statusMatchingSuccessShort";
    case "MATCHING_ERROR":
      return "statusMatchingErrorShort";
    default:
      return "";
  }
};

interface SettlementFileListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettlementFileListModal({
  isOpen,
  onClose,
}: SettlementFileListModalProps) {
  const t = useTranslations("settlement");
  const tCommon = useTranslations("common");
  const {
    settlementFiles,
    fetchSettlementFiles,
    deleteSettlementFile,
    isLoading,
  } = useSettlementStore();
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    isOpen: boolean;
    fileId: string | null;
    fileName: string | null;
  }>({
    isOpen: false,
    fileId: null,
    fileName: null,
  });

  useEffect(() => {
    if (isOpen) {
      fetchSettlementFiles({ __limit: 10000 });
    }
  }, [isOpen, fetchSettlementFiles]);

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteClick = (fileId: string, fileName: string) => {
    setDeleteConfirmModal({
      isOpen: true,
      fileId,
      fileName,
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmModal.fileId) {
      await deleteSettlementFile({
        settlementFileId: deleteConfirmModal.fileId,
      });
      setDeleteConfirmModal({
        isOpen: false,
        fileId: null,
        fileName: null,
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmModal({
      isOpen: false,
      fileId: null,
      fileName: null,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <Container>
        <CloseButton onClick={onClose}>
          <XIcon />
        </CloseButton>
        <Title>{t("uploadedFileList")}</Title>
        {isLoading ? (
          <EmptyState>{t("loadingFileList")}</EmptyState>
        ) : settlementFiles.length === 0 ? (
          <EmptyState>{t("noUploadedFiles")}</EmptyState>
        ) : (
          <FileList>
            {settlementFiles.map((file) => (
              <FileItem key={file._id}>
                <FileContent>
                  <FileName>{file.filename}</FileName>
                  <FileInfo>
                    <StatusBadge status={file.state}>
                      {getStatusTextKey(file.state) ? t(getStatusTextKey(file.state)) : file.state}
                    </StatusBadge>
                    <span>{t("uploadDate")} {formatDate(file.createdAt)}</span>
                    {file.isMissingTrackMatchingField && (
                      <span style={{ color: theme.colors.red[500] }}>
                        {t("matchingFieldMissing")}
                      </span>
                    )}
                  </FileInfo>
                </FileContent>
                <DeleteButton
                  onClick={() => handleDeleteClick(file._id!, file.filename)}
                  title={t("deleteFileTitle")}
                >
                  <TrashIcon />
                </DeleteButton>
              </FileItem>
            ))}
          </FileList>
        )}
      </Container>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={deleteConfirmModal.isOpen}
        onRequestClose={handleDeleteCancel}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            padding: "24px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
        ariaHideApp={false}
      >
        <ConfirmModalContainer>
          <ConfirmContent>
            {t("deleteConfirm")}
            <br />
            <strong>{deleteConfirmModal.fileName}</strong>
          </ConfirmContent>
          <ConfirmButtonContainer>
            <ButtonOutlinedSecondary
              label={tCommon("cancel")}
              onClick={handleDeleteCancel}
            />
            <ButtonFilledPrimary label={tCommon("delete")} onClick={handleDeleteConfirm} />
          </ConfirmButtonContainer>
        </ConfirmModalContainer>
      </Modal>
    </Modal>
  );
}
