import { ElderlyDropDown } from '@/components/Elderly/ElderlyDropDown';
import { CareUnit } from '@/components/SocialWorker/ElderyRegister/CareTypeSection';
import {
  CareWrapper,
  CareButton,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { CARE_TYPES } from '@/constants/socialworker/careTypes.socialWorker';
import { CareType } from '@/types/Elderly';
import styled from 'styled-components';
import { ReactComponent as ButtonLeft } from '@/assets/icons/elderly/ButtonLeft.svg';
import { CareDetailModal } from '@/components/SocialWorker/ElderyRegister/CareDetailModal';

interface CareUnitCardProps {
  unit: CareUnit;
  onUpdate: (updated: Partial<CareUnit>) => void;
  onToggleDetail: (item: string) => void;
  onOpenModal: () => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const CareUnitCard = ({
  unit,
  onUpdate,
  onToggleDetail,
  onOpenModal,
  isModalOpen,
  onCloseModal,
}: CareUnitCardProps) => (
  <CareWrapper>
    <ElderlyDropDown
      title="항목선택"
      contents={[...CARE_TYPES]}
      selectedContents={unit.selectedCare ? [unit.selectedCare] : []}
      setSelectedContents={(items) =>
        onUpdate({ selectedCare: (items[0] as CareType) || null })
      }
      width="195px"
    />
    <CareButton onClick={onOpenModal}>
      <ButtonText>
        {unit.selectedDetails.length === 0 ? (
          '세부항목 선택'
        ) : (
          <>
            세부항목{' '}
            <span className="count">{unit.selectedDetails.length}</span>개 선택
          </>
        )}
      </ButtonText>
      <ButtonLeft />
    </CareButton>

    <CareDetailModal
      isOpen={isModalOpen}
      onClose={onCloseModal}
      careType={unit.selectedCare}
      selectedDetails={unit.selectedDetails}
      onToggleDetail={onToggleDetail}
    />
  </CareWrapper>
);

const ButtonText = styled.span`
  display: inline;
  white-space: nowrap;

  .count {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
