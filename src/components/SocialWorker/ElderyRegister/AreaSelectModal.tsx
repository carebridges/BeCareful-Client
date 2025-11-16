import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@/components/common/Modal/Modal';
import { Button } from '@/components/common/Button/Button';
import { ReactComponent as ModalClose } from '@/assets/icons/Close.svg';
import { AreaSelectData, AreaSocial } from '@/types/common/matching';

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
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedCity('');
      setSelectedGu('');
      setSelectedDong('');
    }
  }, [isOpen]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedGu('');
    setSelectedDong('');
  };

  const handleGuSelect = (gu: string) => {
    setSelectedGu(gu);
    setSelectedDong('');
  };

  const handleDongSelect = (dong: string) => {
    setSelectedDong(dong);
  };

  const handleSelectBtn = () => {
    if (!selectedCity || !selectedGu || !selectedDong) return;

    onSelect({
      siDo: selectedCity,
      siGuGun: selectedGu,
      eupMyeonDong: selectedDong,
    });

    onClose();
  };

  const currentCity = areaData.find((city) => city.name === selectedCity);
  const currentGu = currentCity?.gu.find((gu) => gu.name === selectedGu);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AreaModal>
        <AreaModalTitle>
          <label className="title">지역설정</label>
          <Close onClick={onClose} />
        </AreaModalTitle>

        <AreaWrapper>
          <div className="area">
            <label className="category">시/도</label>
            <AreaItems>
              {areaData.map((city) => (
                <AreaItem
                  key={city.name}
                  onClick={() => handleCitySelect(city.name)}
                  color={selectedCity === city.name}
                >
                  {city.name}
                </AreaItem>
              ))}
            </AreaItems>
          </div>

          {selectedCity && (
            <div className="area">
              <label className="category">시/군/구</label>
              <AreaItems
                style={{
                  borderLeft: '1px solid #d9d9d9',
                  borderRight: '1px solid #d9d9d9',
                }}
              >
                {currentCity?.gu.map((gu) => (
                  <AreaItem
                    key={gu.name}
                    onClick={() => handleGuSelect(gu.name)}
                    color={selectedGu === gu.name}
                  >
                    {gu.name}
                  </AreaItem>
                )) || <p>구가 없습니다.</p>}
              </AreaItems>
            </div>
          )}

          {selectedGu && (
            <div className="area">
              <label className="category">동/면/읍</label>
              <AreaItems>
                {currentGu?.dong.map((dong) => (
                  <AreaItem
                    key={dong}
                    onClick={() => handleDongSelect(dong)}
                    color={selectedDong === dong}
                  >
                    {dong}
                  </AreaItem>
                )) || <p>동이 없습니다.</p>}
              </AreaItems>
            </div>
          )}
        </AreaWrapper>

        <Button
          height="52px"
          variant={
            selectedCity && selectedGu && selectedDong ? 'mainBlue' : 'disabled'
          }
          onClick={handleSelectBtn}
          disabled={!selectedCity || !selectedGu || !selectedDong}
        >
          선택하기
        </Button>
      </AreaModal>
    </Modal>
  );
};

const AreaModal = styled.div`
  width: 272px;
  height: 328px;
  padding: 28px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
`;

const AreaModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;

const Close = styled(ModalClose)`
  cursor: pointer;
`;

const AreaWrapper = styled.div`
  height: 216px;
  display: flex;
  gap: 1px;

  .area {
    display: flex;
    flex-direction: column;
  }

  .category {
    width: 76px;
    height: 20px;
    padding: 8px;
    background: ${({ theme }) => theme.colors.gray50};

    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    text-align: center;
  }
`;

const AreaItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const AreaItem = styled.div<{ color: boolean }>`
  width: 100%;
  height: 20px;
  padding: 8px 16px;

  color: ${({ theme, color }) =>
    color ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme, color }) =>
    color
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};
  text-align: start;

  &:hover {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
