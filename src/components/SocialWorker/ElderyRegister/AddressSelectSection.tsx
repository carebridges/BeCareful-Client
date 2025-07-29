import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import { PlainInputBox } from '@/components/common/InputBox/PlainInputBox';

import { AreaSelectData, AreaSocial } from '@/types/Elderly';
import {
  AreaSelectWrapper,
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { AreaSelectModal } from '@/components/SocialWorker/ElderyRegister/AreaSelectModal';

interface AddressSelectSectionProps {
  areaData: AreaSelectData[];
  selectedArea: AreaSocial | null;
  detailAddress: string;
  onSelect: (area: AreaSocial) => void;
  onDetailChange: (value: string) => void;
}

export const AddressSelectSection = ({
  areaData,
  selectedArea,
  detailAddress,
  onSelect,
  onDetailChange,
}: AddressSelectSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">근무지역</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>

      <AreaSelectWrapper>
        <PlainInputBox
          width="100%"
          state="default"
          placeholder="근무지역 선택"
          guide=""
          value={selectedArea?.eupMyeonDong ?? ''}
          onChange={() => {}}
          onKeyDown={(e) => e.preventDefault()}
          suffix={null}
        />
        <Button
          variant="blue2"
          width="37.5%"
          height="52px"
          onClick={() => setIsModalOpen(true)}
        >
          지역 선택
        </Button>
      </AreaSelectWrapper>

      <PlainInputBox
        width="100%"
        state="default"
        placeholder="상세주소"
        guide=""
        value={detailAddress}
        onChange={(e) => onDetailChange(e.target.value)}
      />

      <AreaSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        areaData={areaData}
        onSelect={(area) => {
          onSelect(area);
          setIsModalOpen(false);
        }}
      />
    </SectionWrapper>
  );
};
