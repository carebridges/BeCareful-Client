import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CaregiverWorkDetail from '@/components/Caregiver/CaregiverWorkDetail';
import { Button } from '@/components/common/Button/Button';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useApplicationDetailQuery } from '@/api/caregiver';

const CaregiverApplyDetailPage = () => {
  const { recruitmentId } = useParams();

  const { handleNavigate } = useHandleNavigate();

  const { data, error } = useApplicationDetailQuery(Number(recruitmentId));
  if (error) {
    console.log('getApplicationDetail 에러: ', error);
  }

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <Container>
      <CaregiverWorkDetail work={data.recruitmentDetailInfo} />

      <Bottom>
        <Button
          height="52px"
          variant={
            data.recruitmentDetailInfo.recruitmentInfo.recruitmentStatus ===
            '공고마감'
              ? 'disabled'
              : 'mainBlue'
          }
          disabled={
            data.recruitmentDetailInfo.recruitmentInfo.recruitmentStatus ===
            '공고마감'
          }
          onClick={() => handleNavigate('/chat')}
        >
          {data.recruitmentDetailInfo.recruitmentInfo.recruitmentStatus ===
          '공고마감'
            ? '마감된 공고입니다'
            : '채팅방으로 이동하기'}
        </Button>
      </Bottom>
    </Container>
  );
};

export default CaregiverApplyDetailPage;

const Container = styled.div``;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;
