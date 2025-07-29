import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import CaregiverWorkDetail from '@/components/Caregiver/CaregiverWorkDetail';
import { useApplicationDetailQuery } from '@/hooks/Caregiver/caregiverQuery';

const CaregiverApplyDetailPage = () => {
  const { recruitmentId } = useParams();

  const { data, error } = useApplicationDetailQuery(Number(recruitmentId));
  if (error) {
    console.log('getApplicationDetail 에러: ', error);
  }

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <Container>
      <CaregiverWorkDetail
        work={data.recruitmentDetailInfo}
        date={data.applyDate}
      />
    </Container>
  );
};

export default CaregiverApplyDetailPage;

const Container = styled.div``;
