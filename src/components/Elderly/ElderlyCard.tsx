import styled from 'styled-components';
import { ReactComponent as ElderList } from '@/assets/icons/elderly/ElderList.svg';
import { ElderDataTemp } from '@/types/Matching';

export const ElderlyCard = ({
  isMatching,
  name,
  age,
  gender,
  careLevel,
  caregiverNum,
  imageUrl,
}: ElderDataTemp) => {
  return (
    <CardContainer isMatching={!!isMatching}>
      {isMatching && (
        <MatchingStatus>
          <MatchingCircle />
          <MatchingLabel>매칭중</MatchingLabel>
        </MatchingStatus>
      )}
      <PersonWrapper>
        <InfoWrapper>
          <NameWrapper>
            <Name>{name}</Name>
            <AgeGenderWrapper>
              <Detail>{age}세</Detail>
              <Border />
              <Detail>{gender === 'FEMALE' ? '여' : '남'}</Detail>
            </AgeGenderWrapper>
          </NameWrapper>
          <LabelWrapper>
            <Label>
              <LabelTitle>장기요양등급</LabelTitle>
              <LabelDetail>{careLevel}</LabelDetail>
            </Label>
            <Label>
              <LabelTitle>요양보호자수</LabelTitle>
              <LabelDetail color="blue">{caregiverNum}</LabelDetail>
            </Label>
          </LabelWrapper>
        </InfoWrapper>
        <PersonImg>
          {imageUrl ? (
            <img src={imageUrl} alt={`${name}님 프로필 이미지`} />
          ) : (
            <ElderList />
          )}
        </PersonImg>
      </PersonWrapper>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ isMatching: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 20px 24px 20px;
  height: ${({ isMatching }) => (isMatching ? '116px' : '76px')};

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
`;

const MatchingStatus = styled.div`
  width: 60px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.subGreen};
`;

const MatchingCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.mainGreen};
`;

const MatchingLabel = styled.div`
  color: ${({ theme }) => theme.colors.mainGreen};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const PersonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Name = styled.label`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const AgeGenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const Detail = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LabelTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const LabelDetail = styled.label<{ isBlue?: boolean }>`
  color: ${({ theme, isBlue }) =>
    isBlue ? theme.colors.mainBlue : theme.colors.gray700};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const PersonImg = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;
