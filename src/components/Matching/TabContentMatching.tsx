import { colors } from '@/style/theme/color';
import { styled } from 'styled-components';

type ColorKey = keyof typeof colors;
interface TabContentMatchingProps {
  matchingScore: '높음' | '보통' | '낮음';
  profileImageUrl?: string;
  caregiverName: string;
  careerTitle: string;
  onClick?: () => void;
}

const getTagColors = (
  score: '높음' | '보통' | '낮음',
): { bg: ColorKey; color: ColorKey } => {
  if (score === '높음') return { bg: 'subBlue', color: 'mainBlue' };
  if (score === '보통') return { bg: 'gray50', color: 'gray500' };
  return { bg: 'subOrange', color: 'mainOrange' };
};

export const TabContentMatching = ({
  matchingScore,
  profileImageUrl,
  caregiverName,
  careerTitle,
  onClick,
}: TabContentMatchingProps) => {
  return (
    <TabContainer onClick={onClick}>
      <InfoContainer>
        <TextInfo>
          <span className="highlight">{caregiverName} 요양보호사</span>
          <span>{careerTitle}</span>
        </TextInfo>
        <ProfileImage src={profileImageUrl} alt={`${caregiverName}의 프로필`} />
      </InfoContainer>
      <TagContainer score={matchingScore}>적합도 {matchingScore}</TagContainer>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

const TagContainer = styled.div<{ score: '높음' | '보통' | '낮음' }>`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  ${({ theme, score }) => {
    const { bg, color } = getTagColors(score);
    return `
      background-color: ${theme.colors[bg]};
      color: ${theme.colors[color]};
    `;
  }}

  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 10.5px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  .highlight {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title4};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }
`;
