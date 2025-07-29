import { useState } from 'react';
import Modal from '@/components/common/Modal/Modal';
import { Button } from '@/components/common/Button/Button';
import { ReactComponent as CloseIcon } from '@/assets/icons/Close.svg';
import {
  ModalWrapper,
  AreaTitleWrapper,
  AreaTitleLabel,
  Close,
  AreasWrapper,
  AreaWrapper,
  AreaTitle,
  AreaAreaWrapper,
  AreaArea,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { AreaSelectData, AreaSocial } from '@/types/Elderly';

interface AreaSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  areaData: AreaSelectData[];
  onSelect: (area: AreaSocial) => void;
}

export const AreaSelectModal = ({
  isOpen,
  onClose,
  areaData,
  onSelect,
}: AreaSelectModalProps) => {
  const [city, setCity] = useState('');
  const [gu, setGu] = useState('');
  const [dong, setDong] = useState('');

  const currentCity = areaData.find((c) => c.name === city);
  const currentGu = currentCity?.gu.find((g) => g.name === gu);

  const handleSubmit = () => {
    if (city && gu && dong) {
      onSelect({
        siDo: city,
        siGuGun: gu,
        eupMyeonDong: dong,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalWrapper>
        <AreaTitleWrapper>
          <AreaTitleLabel>지역설정</AreaTitleLabel>
          <Close onClick={onClose}>
            <CloseIcon />
          </Close>
        </AreaTitleWrapper>

        <AreasWrapper>
          <AreaWrapper>
            <AreaTitle>시/도</AreaTitle>
            <AreaAreaWrapper>
              {areaData.map((cityData) => (
                <AreaArea
                  key={cityData.name}
                  onClick={() => {
                    setCity(cityData.name);
                    setGu('');
                    setDong('');
                  }}
                  color={city === cityData.name}
                >
                  {cityData.name}
                </AreaArea>
              ))}
            </AreaAreaWrapper>
          </AreaWrapper>

          {city && (
            <AreaWrapper>
              <AreaTitle>시/군/구</AreaTitle>
              <AreaAreaWrapper>
                {currentCity?.gu.map((guData) => (
                  <AreaArea
                    key={guData.name}
                    onClick={() => {
                      setGu(guData.name);
                      setDong('');
                    }}
                    color={gu === guData.name}
                  >
                    {guData.name}
                  </AreaArea>
                ))}
              </AreaAreaWrapper>
            </AreaWrapper>
          )}

          {gu && (
            <AreaWrapper>
              <AreaTitle>동/면/읍</AreaTitle>
              <AreaAreaWrapper>
                {currentGu?.dong.map((dongName) => (
                  <AreaArea
                    key={dongName}
                    onClick={() => setDong(dongName)}
                    color={dong === dongName}
                  >
                    {dongName}
                  </AreaArea>
                ))}
              </AreaAreaWrapper>
            </AreaWrapper>
          )}
        </AreasWrapper>

        <Button
          variant={city && gu && dong ? 'blue' : 'disabled'}
          height="52px"
          onClick={handleSubmit}
          disabled={!city || !gu || !dong}
        >
          선택하기
        </Button>
      </ModalWrapper>
    </Modal>
  );
};
