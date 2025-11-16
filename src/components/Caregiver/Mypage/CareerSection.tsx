import styled from 'styled-components';
import { ReactComponent as CareerIcon } from '@/assets/icons/caregiver/my/Career.svg';
import { Button } from '@/components/common/Button/Button';
import { CareerInfo } from '@/types/Caregiver/mypage';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import {
  foramtCareerInstitution,
  foramtCareerYear,
} from '@/utils/formatCareers';

interface CareerSectionProps {
  data: CareerInfo | undefined;
}

const CareerSection = ({ data }: CareerSectionProps) => {
  const { handleNavigate } = useHandleNavigate();

  const careerInfo = [
    {
      title: '근무처',
      detail: (
        <div style={{ display: 'flex', gap: '4px' }}>
          {foramtCareerInstitution(data?.careerDetails)}
        </div>
      ),
    },
    {
      title: '근무기간',
      detail: (
        <div style={{ display: 'flex', gap: '4px' }}>
          {foramtCareerYear(data?.careerDetails)}
        </div>
      ),
    },
  ];

  return (
    <SectionWrapper>
      <label className="title-label">경력서</label>
      {data?.title ? (
        <Career onClick={() => handleNavigate('/caregiver/my/career')}>
          <div className="dateWrapper">
            <label className="date">최근 수정일 </label>
            <span>{data.lastModifiedDate.replaceAll('-', '.')}</span>
          </div>
          <label className="title">{data.title}</label>
          {data.careerType === '경력' && (
            <div className="careers">
              <InfoDisplay width="56px" gapRow="32px" items={careerInfo} />
            </div>
          )}
        </Career>
      ) : (
        <NoContent>
          <NoCareer>
            <CareerIcon />
            <label className="title">아직 등록된 경력서가 없어요!</label>
            <label className="detail">
              나의 경력을 입력하여 합격률을 높여보세요!
            </label>
          </NoCareer>
          <Button
            height="52px"
            variant="subBlue"
            onClick={() => handleNavigate('/caregiver/my/career')}
          >
            경력서 등록하기
          </Button>
        </NoContent>
      )}
    </SectionWrapper>
  );
};

export default CareerSection;

const SectionWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const Career = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .dateWrapper {
    display: flex;
    gap: 6px;
  }

  .date {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }

  .title {
    margin-bottom: 2px;
  }
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NoCareer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    text-align: center;
  }
`;
