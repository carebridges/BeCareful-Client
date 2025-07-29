import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Button } from '@/components/common/Button/Button';
import InputBox from '@/components/common/InputBox/InputBox';
import ChairmanCard from '@/components/shared/ChairmanCard';

const CommunityAssociationEditPage = () => {
  const navigate = useNavigate();

  const isDisabled = false;

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate(-1);
              scrollTo(0, 0);
            }}
          />
        }
        center={<NavCenter>협회 정보 수정</NavCenter>}
        color=""
      />

      <ProfileImgWrapper>
        <img src="" />
      </ProfileImgWrapper>

      <InputBox
        title="협회명"
        detail="협회의 정확한 명칭을 검색해 주세요."
        placeholder="협회명을 입력해주세요"
        // value={value}
      />

      <InputBox
        title="협회 설립일"
        detail="협회의 설립일을 입력해 주세요."
        placeholder="협회 설립일을 입력해주세요"
        // value={value}
      />

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">
            회장 변경하기 <span>*</span>
          </label>
          <label className="detail">협회 회장을 변경해 주세요.</label>
        </div>
        <ChairmanCard
          name="김회장"
          nickname="kimboss"
          phoneNumber="010-1234-5678"
        />
      </SectionWrapper>

      <Bottom>
        <Button
          disabled={isDisabled}
          variant={isDisabled ? 'disabled' : 'mainBlue'}
          height="52px"
        >
          협회 정보 수정하기
        </Button>
      </Bottom>
    </Container>
  );
};

export default CommunityAssociationEditPage;

const Container = styled.div`
  margin: 0px 20px;
  margin-bottom: 120px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const ProfileImgWrapper = styled.div`
  margin-top: -16px;
  display: flex;
  justify-content: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    object-fit: cover;
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .titleWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Bottom = styled.div`
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;
