import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Button } from '@/components/common/Button/Button';
import InputBox from '@/components/common/InputBox/InputBox';
import { useAssociationInfo } from '@/api/communityAssociation';

const CommunityEditChairmanPage = () => {
  const navigate = useNavigate();

  const { data } = useAssociationInfo();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.chairmanRealName);
      setNickname(data.chairmanNickName);
      setPhoneNumber(data.chairmanPhoneNumber);
    }
  }, [data]);

  const [isChanged, setIsChanged] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsChanged(false);
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsChanged(false);
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setIsChanged(false);
  };

  // TODO: 회장 변경 api 연결
  const handleEditBtnClick = () => {
    const chairman = {};
    console.log(chairman);
  };

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
        center={<NavCenter>회장 정보 수정</NavCenter>}
        color=""
      />

      <InputBox
        title="성함"
        detail="협회 회장의 성함을 입력해 주세요."
        placeholder="협회 회장의 성함을 입력해 주세요."
        value={name}
        onChange={handleNameChange}
      />

      <InputBox
        title="닉네임"
        detail="협회 회장의 닉네임을 입력해 주세요."
        placeholder="협회 회장의 닉네임을 입력해 주세요."
        value={nickname}
        onChange={handleNicknameChange}
      />

      <InputBox
        title="연락처"
        detail="협회 회장의 연락처를 입력해 주세요."
        placeholder="예) 010-1234-5678"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />

      <Bottom>
        <Button
          height="52px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEditBtnClick}
        >
          회장 정보 수정하기
        </Button>
      </Bottom>
    </Container>
  );
};

export default CommunityEditChairmanPage;

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
