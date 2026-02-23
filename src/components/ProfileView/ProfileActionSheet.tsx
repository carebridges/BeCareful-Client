import { Button } from '@/components/common/Button/Button';
import BottomSheet from '@/components/Community/common/BottomSheet';
import { RecruitmentManageCheckCard } from '@/components/SocialWorker/RecruitmentDetail/RecruitmentManageCheckCard';
import { ProfileActionOption } from '@/types/common';
import styled from 'styled-components';

type ProfileActionSheetProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedOption: ProfileActionOption | null;
  onSelectOption: (option: ProfileActionOption) => void;
  onConfirm: () => void;
};

export const ProfileActionSheet = ({
  isOpen,
  setIsOpen,
  selectedOption,
  onSelectOption,
  onConfirm,
}: ProfileActionSheetProps) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="프로필 관리 옵션을 선택해 주세요."
      titleStar={false}
    >
      <OptionList>
        <RecruitmentManageCheckCard
          tone="orange"
          pressed={selectedOption === 'report'}
          text="신고하기"
          onClick={() => {
            onSelectOption('report');
          }}
        />
        <RecruitmentManageCheckCard
          tone="orange"
          pressed={selectedOption === 'block'}
          text="차단하기"
          onClick={() => onSelectOption('block')}
        />
      </OptionList>
      <GapLine />
      <SheetButtonRow>
        <Button height="52px" variant="gray50" onClick={() => setIsOpen(false)}>
          취소
        </Button>
        <Button height="52px" variant="mainOrange" onClick={onConfirm}>
          확인
        </Button>
      </SheetButtonRow>
    </BottomSheet>
  );
};

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 65px;
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

const GapLine = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray50};

  margin-left: -20px;
  margin-right: -20px;
`;
