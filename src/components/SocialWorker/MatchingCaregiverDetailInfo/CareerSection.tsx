import {
  DetailContent,
  DetailContentContainer,
  Title,
} from '@/components/SocialWorker/MatchingCaregiverDetailInfo/MatchingCaregiverDetailInfo.styles';

interface CareerSectionProps {
  careerInfo: {
    careerType: string;
    introduce: string;
    careerDetails: {
      workInstitution: string;
      workYear: string;
    }[];
  };
}

export const CareerSection = ({ careerInfo }: CareerSectionProps) => {
  if (!careerInfo.careerType) return null;

  if (careerInfo.careerType === '신입') {
    return (
      <>
        <Title>신입</Title>
        <DetailContentContainer>
          <DetailContent>
            <span className="highlight">자기소개</span>
            <span>{careerInfo.introduce}</span>
          </DetailContent>
        </DetailContentContainer>
      </>
    );
  }

  return (
    <>
      <Title>경력 {careerInfo.careerDetails.length}년</Title>
      {careerInfo.careerDetails.map((career, index) => (
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
