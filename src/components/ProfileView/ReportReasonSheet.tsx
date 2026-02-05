import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/common/Button/Button';
import BottomSheet from '@/components/Community/common/BottomSheet';
import { RadioButton } from '@/components/common/Button/RadioButton';
import { ReportReason } from '@/types/common/profileReport';
import { REPORT_REASON_OPTIONS } from '@/constants/common/profileReport';

type ReportReasonSheetProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: (payload: { reason: ReportReason; detail?: string }) => void;
};

export const ReportReasonSheet = ({
  isOpen,
  setIsOpen,
  onConfirm,
}: ReportReasonSheetProps) => {
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(
    null,
  );
  const [detail, setDetail] = useState('');

  const isOther = selectedReason === 'OTHER';
  const isConfirmDisabled =
    selectedReason === null || (isOther && detail.trim().length === 0);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedReason(null);
    setDetail('');
  };

  const handleConfirm = () => {
    if (!selectedReason) return;

    const trimmed = detail.trim();
    onConfirm({
      reason: selectedReason,
      detail: isOther ? trimmed : undefined,
    });

    handleClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="신고사유를 선택해 주세요."
      titleStar={false}
    >
      <OptionList>
        {REPORT_REASON_OPTIONS.map((opt) => (
          <RadioButton
            key={opt.value}
            label={opt.label}
            checked={selectedReason === opt.value}
            onClick={() => setSelectedReason(opt.value)}
          />
        ))}

        {isOther && (
          <MemoFieldWrapper>
            <MemoField
              placeholder="상세사유를 작성해 주세요."
              value={detail}
              maxLength={500}
              onChange={(e) => setDetail(e.target.value)}
            />
            <MemoCount>{detail.length}/500</MemoCount>
          </MemoFieldWrapper>
        )}
      </OptionList>
      <GapLine />
      <SheetButtonRow>
        <Button height="52px" variant="gray50" onClick={handleClose}>
          취소
        </Button>
        <Button
          height="52px"
          variant="mainOrange"
          onClick={handleConfirm}
          disabled={isConfirmDisabled}
        >
          확인
        </Button>
      </SheetButtonRow>
    </BottomSheet>
  );
};

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 30px;
  margin-top: 5px;
`;

const SheetButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  bottom: 0;
  gap: 8px;
  padding-top: 12px;

  box-sizing: border-box;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
`;

const MemoFieldWrapper = styled.div`
  position: relative;
  margin-top: 8px;
`;

const MemoField = styled.textarea`
  width: 100%;
  height: 89px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
  resize: none;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    //border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const MemoCount = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;

  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const GapLine = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray50};

  margin-left: -20px;
  margin-right: -20px;
`;
