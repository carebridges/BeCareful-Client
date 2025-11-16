import { useElderDetail } from '@/api/matching.socialWorker';
import { ErrorIndicator } from '@/components/common/ErrorIndicator/ErrorIndicator';
import { LoadingIndicator } from '@/components/common/LoadingIndicator/LoadingIndicator';
import { ElderMatchingCard } from '@/components/SocialWorker/MatchingStatus/ElderMatchingCard';
import { fromBackendDate } from '@/utils/formatDate';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ElderIcon } from '@/assets/icons/socialworker/matching/BiggerElderDefault.svg';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Button } from '@/components/common/Button/Button';

export const ElderlyDetailPage = () => {
  const navigate = useNavigate();
  const { elderlyId } = useParams<{ elderlyId: string }>();

  const numericId = elderlyId ? Number(elderlyId) : null;

  const { data, isLoading, isError } = useElderDetail(numericId);

  if (isLoading) return <LoadingIndicator />;
  if (isError || !data) return <ErrorIndicator />;

  const info = data.elderlyInfo;
  const recruitments = data.recruitments;
  return (
    <>
      <Container>
        <NavBarContainer>
          <NavBar
            left={
              <NavLeft onClick={() => navigate(-1)}>
                <ArrowLeft />
              </NavLeft>
            }
            center={<NavCenter>어르신 정보</NavCenter>}
            color="white"
          />
        </NavBarContainer>

        <ElderTitleSection>
          {info.profileImageUrl ? (
            <ProfileImage src={info.profileImageUrl} alt={info.name} />
          ) : (
            <ElderIcon width={40} height={40} />
          )}
          <p>{info.name}</p>
          <p className="subtype">어르신</p>
        </ElderTitleSection>

        <Gap />
        <DetailContainer>
          <p>기본 정보</p>
          <DetailBox>
            <DetailContent>
              <p className="type">생년월일</p>
              <p className="answer">
                {fromBackendDate(info.birthDate)} / {info.age}세
              </p>
            </DetailContent>
            <DetailContent>
              <p className="type">성별</p>
              <p className="answer">
                {info.gender === 'MALE' ? '남자' : '여자'}
              </p>
            </DetailContent>
            <DetailContent>
              <p className="type">주소</p>
              <p className="answer">{info.address}</p>
            </DetailContent>
            <DetailContent>
              <p className="type">거주형태</p>
              <p className="answer">{info.hasInmate ? '동거중' : '단독거주'}</p>
            </DetailContent>
            <DetailContent>
              <p className="type">반려동물</p>
              <p className="answer">{info.hasPet ? '있음' : '없음'}</p>
            </DetailContent>
          </DetailBox>
        </DetailContainer>
        <Gap />
        <DetailContainer>
          <p>요양 정보</p>
          <DetailBox>
            <DetailContent>
              <p className="type">건강상태</p>
              <p className="answer">{info.healthCondition}</p>
            </DetailContent>
            <DetailContent>
              <p className="type">장기요양등급</p>
              <p className="answer">{info.careLevel}</p>
            </DetailContent>
            <DetailContent>
              <p className="type">케어필요항목</p>
              <div className="answer">
                {info.detailCareTypes?.map((c) => (
                  <span key={c.careType}>
                    {c.careType}
                    {c.detailCareTypes?.length
                      ? ` - ${c.detailCareTypes.join(', ')}`
                      : ''}
                  </span>
                ))}
              </div>
            </DetailContent>
          </DetailBox>
        </DetailContainer>
        <Gap />
        <RecruitmentDashboard>
          공고현황
          <div className="count">총 {recruitments.length}건</div>
          {recruitments.map((r) => (
            <ElderMatchingCard key={r.recruitmentInfo.recruitmentId} data={r} />
          ))}
        </RecruitmentDashboard>
      </Container>
      <ButtonContainer>
        <Button height="52px" variant="white">
          정보 수정
        </Button>
        <Button
          height="52px"
          variant="blue"
          onClick={() => {
            navigate('/socialworker/recruitment/new');
            window.scrollTo(0, 0);
          }}
        >
          새 공고 등록
        </Button>
      </ButtonContainer>
    </>
  );
};
const Container = styled.div`
  padding-bottom: 120px;
`;

const NavBarContainer = styled.div`
  padding: 0 20px;
`;
const NavLeft = styled.div`
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
`;

const ElderTitleSection = styled.div`
  display: flex;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  .subtype {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    margin-left: -7px;
  }
`;

const Gap = styled.p`
  height: 6px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const DetailContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  .answer {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .type {
    width: 72px;
  }
`;

const RecruitmentDashboard = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  .count {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding: 20px;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  box-sizing: border-box;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
`;
