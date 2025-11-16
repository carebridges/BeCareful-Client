import { Button } from '@/components/common/Button/Button';
import BottomSheet from '@/components/Community/common/BottomSheet';
import { RecruitmentManageCheckCard } from '@/components/SocialWorker/RecruitmentDetail/RecruitmentManageCheckCard';
import styled from 'styled-components';

type SheetOption = 'edit' | 'close' | 'delete';

type RecruitmentManageSheetProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedOption: SheetOption | null;
  onSelectOption: (option: SheetOption) => void;
  onConfirm: () => void;
};

export const RecruitmentManageSheet = ({
  isOpen,
  setIsOpen,
  selectedOption,
  onSelectOption,
  onConfirm,
}: RecruitmentManageSheetProps) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="공고 관리 옵션을 선택해 주세요."
      titleStar={false}
    >
      <OptionList>
        <RecruitmentManageCheckCard
          option="edit"
          pressed={selectedOption === 'edit'}
          text="공고 수정"
          onClick={() => onSelectOption('edit')}
        />
        <RecruitmentManageCheckCard
          option="close"
          pressed={selectedOption === 'close'}
          text="공고 마감"
          onClick={() => onSelectOption('close')}
        />
        <RecruitmentManageCheckCard
          option="delete"
          pressed={selectedOption === 'delete'}
          text="공고 삭제"
          onClick={() => onSelectOption('delete')}
        />
      </OptionList>

      <SheetButtonRow>
        <Button
          height="52px"
          variant="subBlue"
          onClick={() => setIsOpen(false)}
        >
          취소
        </Button>
        <Button height="52px" variant="blue" onClick={onConfirm}>
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
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
`;
