import {
  DetailContent,
  DetailContentContainer,
  Title,
} from '@/components/SocialWorker/MatchingCaregiverDetailInfo/MatchingCaregiverDetailInfo.styles';
import { CareerSectionProps } from '@/types/Matching.socialWorker';

export const CareerSection = ({ careerInfo }: CareerSectionProps) => {
  if (!careerInfo) return null;

  const type = careerInfo.careerType ?? '';
  const introduce = careerInfo.introduce ?? '';
  const details = Array.isArray(careerInfo.careerDetails)
    ? careerInfo.careerDetails
    : [];

  if (!type) return null;

  if (type === '신입') {
    return (
      <>
        <Title>신입</Title>
        <DetailContentContainer>
          {introduce && (
            <DetailContent>
              <span className="highlight">자기소개</span>
              <span>{introduce}</span>
            </DetailContent>
          )}
        </DetailContentContainer>
      </>
    );
  }

  return (
    <>
      <Title>경력 {details.length}년</Title>
      {details.map((career, index) => (
        <DetailContentContainer key={index}>
          <DetailContent>
            <span className="highlight">근무처</span>
            <span>{career.workInstitution}</span>
          </DetailContent>
          <DetailContent>
            <span className="highlight">근무기간</span>
            <span>{career.workYear}</span>
          </DetailContent>
        </DetailContentContainer>
      ))}
    </>
  );
};
