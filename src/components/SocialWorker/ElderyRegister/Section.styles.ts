import { styled } from 'styled-components';

//전체 TODO: 한 코드에만 쓰이는 스타일은 빼기

export const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

export const Title = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

//TODO: 디자인 시스템의 인풋이랑 다른 부분이 있는지 찾아보기
export const Input = styled.input`
  height: 36px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

export const RadioWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

//TODO: 다른 부분이랑 합칠 수 있는지 찾기
export const RadioButtonWrapper = styled.div`
  width: 100%;
`;

//TODO: ?
export const RadioButton = styled.input`
  display: none;
`;

//TODO 이것도 마찬가지 디자인 시스템이랑 비교
export const Label = styled.label`
  height: 52px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  ${RadioButton}:checked + & {
    background: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

export const ModalWrapper = styled.div`
  width: 312px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px 20px 20px 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  overflow-x: hidden;
`;

export const AreaSelectWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

export const AreaTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AreaTitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const Close = styled.div`
  width: 24px;
  height: 24px;
`;

export const AreasWrapper = styled.div`
  display: flex;
  gap: 1px;
  height: 216px;
  width: 100%;
  overflow-x: hidden;
`;

export const AreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

export const AreaTitle = styled.label`
  background: ${({ theme }) => theme.colors.gray50};
  width: 76px;
  height: 20px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  line-height: 140%;
`;

export const AreaAreaWrapper = styled.button`
  overflow-y: auto;
  flex: 1;
  width: 100%;
`;

export const AreaArea = styled.div<{ color: boolean }>`
  width: 100%;
  height: 20px;
  padding: 8px 16px;

  color: ${({ theme, color }) =>
    color ? theme.colors.mainBlue : theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 140%;
  text-align: start;

  &:hover {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

export const CareWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const CareButton = styled.button`
  width: 100%;
  height: 54px;
  padding: 15px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 140%;
`;

export const CareLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const ModalTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalXImg = styled.div`
  width: 24px;
  height: 24px;
`;

export const CaretypeModal = styled.div`
  padding: 28px 20px 20px 20px;
  background: ${({ theme }) => theme.colors.white};
  width: 312px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
`;

export const CareModalButtonWrapper = styled.div`
  padding-bottom: 32px;
  display: flex;
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ModalTitleLabel = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;
