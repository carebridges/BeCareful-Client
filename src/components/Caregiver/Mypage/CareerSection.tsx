import styled from 'styled-components';
import { ReactComponent as CareerIcon } from '@/assets/icons/caregiver/my/Career.svg';
import { Button } from '@/components/common/Button/Button';
import { CareerInfo } from '@/types/Caregiver/mypage';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

interface CareerSectionProps {
  data: CareerInfo | undefined;
}

const CareerSection = ({ data }: CareerSectionProps) => {
  const { handleNavigate } = useHandleNavigate();

  return (
    <SectionWrapper>
      <label className="title-label">경력서</label>
      {data?.careerTitle ? (
        <Career>
          <div className="dateWrapper">
            <label className="date">최근 수정일 </label>
            <span>{data.lastModifiedDate.replaceAll('-', '.')}</span>
          </div>
          <label className="title">{data.careerTitle}</label>
        </Career>
      ) : (
        <NoContent>
          <CareerIcon />
          <label className="title">아직 등록된 경력서가 없어요!</label>
          <label className="detail">
            나의 경력을 입력하여 합격률을 높여보세요!
          </label>
        </NoContent>
      )}
      <Button
        height="52px"
        variant="subBlue"
        onClick={() => handleNavigate('/caregiver/my/career')}
      >
        {data?.careerTitle ? '경력서 수정하기' : '경력서 작성하기'}
      </Button>
    </SectionWrapper>
  );
};

export default CareerSection;

const SectionWrapper = styled.div`
  padding: 20px 0px;
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
  flex-direction: column;
  gap: 6px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .dateWrapper {
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
`;

const NoContent = styled.div`
  margin-bottom: 8px;
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
