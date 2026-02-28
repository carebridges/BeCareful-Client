import {
  CaretypeModal,
  ModalTitleWrapper,
  ModalTitleLabel,
  ModalXImg,
  CareModalButtonWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { CARE_TYPE_DETAILS } from '@/constants/domain/care';
import { ReactComponent as ModalClose } from '@repo/ui/src/assets/icons/signup/ModalClose.svg';
import { CareTypeKey } from '@repo/common';
import { Button, CareChcekBox, Modal } from '@repo/ui';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  careType: CareTypeKey | null;
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
