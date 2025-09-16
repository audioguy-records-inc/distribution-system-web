"use client";

import React from "react";
import styled from "styled-components";
import { STATUS_COLORS } from "@/constants/status-colors";

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
`;

const StatusIndicator = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const StatusText = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;

interface StatusDisplayProps {
  status: string;
  text: string;
  color: string;
  isLoading?: boolean;
}

export default function StatusDisplay({ 
  status, 
  text, 
  color, 
  isLoading = false 
}: StatusDisplayProps) {
  return (
    <StatusContainer>
      <StatusIndicator color={color} />
      <StatusText color={color}>{text}</StatusText>
      {isLoading && <span>로딩 중...</span>}
    </StatusContainer>
  );
}