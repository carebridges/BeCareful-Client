import { Button } from '@/components/common/Button/Button';
import { CareChcekBox } from '@/components/common/CheckBox/CareChcekBox';
import Modal from '@/components/common/Modal/Modal';
import {
  CaretypeModal,
  ModalTitleWrapper,
  ModalTitleLabel,
  ModalXImg,
  CareModalButtonWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { CARE_TYPE_DETAILS } from '@/constants/careTypes.socialWorker';
import { CareType } from '@/types/Elderly';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  careType: CareType | null;
  selectedDetails: string[];
  onToggleDetail: (item: string) => void;
}

export const CareDetailModal = ({
  isOpen,
  onClose,
  careType,
  selectedDetails,
  onToggleDetail,
}: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <CaretypeModal>
      <ModalTitleWrapper>
        <ModalTitleLabel>
          {careType || '케어 항목을 선택해주세요'}
        </ModalTitleLabel>
        <ModalXImg onClick={onClose}>
          <ModalClose />
        </ModalXImg>
      </ModalTitleWrapper>

      <CareModalButtonWrapper>
        {careType &&
          CARE_TYPE_DETAILS[careType]?.map((item) => (
            <CareChcekBox
              key={item}
              id={item}
              label={item}
              checked={selectedDetails.includes(item)}
              onChange={() => onToggleDetail(item)}
              width="auto"
              height="36px"
            />
          ))}
      </CareModalButtonWrapper>

      <Button variant="blue" height="52px" onClick={onClose}>
        선택하기
      </Button>
    </CaretypeModal>
  </Modal>
);
