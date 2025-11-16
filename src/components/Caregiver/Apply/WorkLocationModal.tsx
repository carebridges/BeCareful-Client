import styled from 'styled-components';
import { ReactComponent as ModalClose } from '@/assets/icons/Close.svg';
import { Button } from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import { Area } from '@/data/Area';

interface WorkLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  selectedGu: string;
  selectedDong: string;
  handleCitySelect: (city: string) => void;
  handleGuSelect: (gu: string) => void;
  handleDongSelect: (dong: string) => void;
  handleSelectBtn: () => void;
}

const WorkLocationModal = ({
  isOpen,
  onClose,
  selectedCity,
  selectedGu,
  selectedDong,
  handleCitySelect,
  handleGuSelect,
  handleDongSelect,
  handleSelectBtn,
}: WorkLocationModalProps) => {
  const isValid = selectedCity && selectedGu && selectedDong;

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
              {Area.city.map((city) => (
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
                {Area.city
                  .find((city) => city.name === selectedCity)
                  ?.gu?.map((gu) => (
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
                {Area.city
                  .find((city) => city.name === selectedCity)
                  ?.gu.find((gu) => gu.name === selectedGu)
                  ?.dong.map((dong) => (
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
          variant={isValid ? 'mainBlue' : 'disabled'}
          disabled={!isValid}
          onClick={handleSelectBtn}
        >
          선택하기
        </Button>
      </AreaModal>
    </Modal>
  );
};

export default WorkLocationModal;

const AreaModal = styled.div`
  //   width: 316px;
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
  // width: 100%;
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
