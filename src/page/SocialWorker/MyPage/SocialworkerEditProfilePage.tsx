import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { CheckCard } from '@/components/SignUp/SocialWorkerSignUpFunnel/common/CheckCard';
import { ResidentIdInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step4BasicInfo/ResidentIdInput';
import AgreeSection from '@/components/SocialWorker/MyPage/AgreeSection';
import { AgreementValues } from '@/types/Socialworker/common';
import { Button } from '@/components/common/Button/Button';
import { Institution_Rank_Mapping_ENG } from '@/constants/institutionRank';
import { SocialworkerMyRequest } from '@/types/Socialworker/mypage';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
// import { useNicknameValidation } from '@/hooks/SignUp/useNicknameValidation';
import {
  useGetSocialWorkerMyEdit,
  usePutSocialworkerMy,
} from '@/api/socialworker';
import { getGenderCode } from '@/utils/getGenderCode';
// import { searchInstitution } from '@/api/signupFunnel';

const SocialworkerEditProfilePage = () => {
  const { handleGoBack } = useHandleNavigate();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [genderCode, setGenderCode] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [institution, setInstitution] = useState('');
  const [rank, setRank] = useState('');
  const [agreementStates, setAgreementStates] = useState({
    isAgreedToTerms: true,
    isAgreedToCollectPersonalInfo: true,
    isAgreedToReceiveMarketingInfo: false,
  });
  const [isChanged, setIsChanged] = useState(false);
  // const [nicknameChanged, setNicknameChanged] = useState(false);

  const { data } = useGetSocialWorkerMyEdit();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setNickname(data.nickName);
      setBirth(String(data.birthYymmdd)); // TODO: 백엔드와 타입 맞추기
      setGenderCode(data.genderCode);
      setPhoneNumber(data.phoneNumber);
      // setInstitution(data.institutionName);
      setRank(data.institutionRank);
      setAgreementStates({
        isAgreedToTerms: data.isAgreedToTerms,
        isAgreedToCollectPersonalInfo: data.isAgreedToCollectPersonalInfo,
        isAgreedToReceiveMarketingInfo: data.isAgreedToReceiveMarketingInfo,
      });
    }
  }, [data]);

  const handleChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'name':
        setName(value);
        setIsChanged(true);
        break;
      case 'nickname':
        // resetMessage();
        setNickname(value);
        // setNicknameChanged(true);
        // if (state === 'success') {
        //   setIsChanged(true);
        // }
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        setIsChanged(true);
        break;
      // case 'institution':
      //   setInstitution(value);
      //   setIsChanged(true);
      //   break;
      case 'rank':
        setRank(value);
        setIsChanged(true);
        break;
      default:
        break;
    }
  };

  // const { message, state, checkNickname, resetMessage } =
  //   useNicknameValidation();
  // const handleCheckDuplicate = () => {
  //   checkNickname(nickname);
  // };

  const handleBirthAndGenderChange = (birth: string, genderCode: string) => {
    setBirth(birth);
    setGenderCode(getGenderCode(genderCode));
  };

  const handleAgreementChange = useCallback(
    (updatedAgreements: AgreementValues) => {
      setAgreementStates(updatedAgreements);
    },
    [],
  );

  const { mutate: updateSocialMy } = usePutSocialworkerMy();

  const handleEditBtnClick = async () => {
    // const insitutionList = await searchInstitution(institution);

    const myData: SocialworkerMyRequest = {
      realName: name,
      nickName: nickname,
      birthYymmdd: birth,
      genderCode: genderCode,
      phoneNumber: phoneNumber,
      // TODO: 기관 검색해서 id 받아오기
      nursingInstitutionId: 4,
      institutionRank: Institution_Rank_Mapping_ENG[rank],
      isAgreedToTerms: agreementStates.isAgreedToTerms,
      isAgreedToCollectPersonalInfo:
        agreementStates.isAgreedToCollectPersonalInfo,
      isAgreedToReceiveMarketingInfo:
        agreementStates.isAgreedToReceiveMarketingInfo,
    };
    console.log(myData);
    updateSocialMy(myData, {
      onSuccess: () => {
        handleGoBack();
        setIsChanged(false);
      },
    });
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>프로필 수정하기</NavCenter>}
        color="white"
      />

      <InfoWrapper>
        <CardContainer>
          <label className="title">
            이름 <span className="star">*</span>
          </label>
          <Input
            placeholder="이름"
            value={name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </CardContainer>

        <CardContainer>
          <label className="title">
            닉네임 <span className="star">*</span>
          </label>
          <NicknameInput>
            <Input
              // style={{ width: '80%' }}
              style={{ width: '100%' }}
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
            />
            {/* <Button
              height="52px"
              variant={nicknameChanged ? 'mainBlue' : 'disabled'}
              disabled={!nicknameChanged}
              style={{ width: '20%' }}
              onClick={handleCheckDuplicate}
            >
              중복확인
            </Button> */}
          </NicknameInput>
        </CardContainer>
        {/* {message && (
          <ValidationMessage state={state}>{message}</ValidationMessage>
        )} */}

        <ResidentIdInput
          birthDate={birth}
          genderInput={genderCode > 0 ? genderCode.toString() : ''}
          onBirthDateChange={(e) =>
            handleBirthAndGenderChange(e.target.value, genderCode.toString())
          }
          onGenderChange={(e) =>
            handleBirthAndGenderChange(birth, e.target.value)
          }
          isEditProfile={true}
        />

        <CardContainer>
          <label className="title">
            휴대전화 번호 <span className="star">*</span>
          </label>
          <Input
            placeholder="휴대전화 번호"
            value={phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />
        </CardContainer>
      </InfoWrapper>

      <Border />

      {/* <CardContainer>
        <label className="title">
          소속된 기관명 <span className="star">*</span>
        </label>
        <Input
          placeholder="소속된 기관명"
          value={institution}
          onChange={(e) => handleChange('institution', e.target.value)}
        />
      </CardContainer> */}

      <CardContainer>
        <label className="title">
          직급 <span className="star">*</span>
        </label>
        <CheckCard
          pressed={rank === 'CENTER_DIRECTOR'}
          text="센터장 입니다."
          onClick={() => handleChange('rank', 'CENTER_DIRECTOR')}
        />
        <CheckCard
          pressed={rank === 'REPRESENTATIVE'}
          text="대표 입니다."
          onClick={() => handleChange('rank', 'REPRESENTATIVE')}
        />
        <CheckCard
          pressed={rank === 'SOCIAL_WORKER'}
          text="사회복지사 입니다."
          onClick={() => handleChange('rank', 'SOCIAL_WORKER')}
        />
      </CardContainer>

      <AgreeSection
        initialIsAgreedToTerms={agreementStates.isAgreedToTerms}
        initialIsAgreedToCollectPersonalInfo={
          agreementStates.isAgreedToCollectPersonalInfo
        }
        initialIsAgreedToReceiveMarketingInfo={
          agreementStates.isAgreedToReceiveMarketingInfo
        }
        onAgreementChange={handleAgreementChange}
      />

      <Bottom>
        <Button
          height="56px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEditBtnClick}
        >
          프로필 수정하기
        </Button>
      </Bottom>
    </Container>
  );
};

export default SocialworkerEditProfilePage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 112px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const InfoWrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .star {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Input = styled.input`
  //   width: 100%;
  height: 20px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const NicknameInput = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
`;

// const ValidationMessage = styled.p<{ state: 'default' | 'error' | 'success' }>`
//   display: flex;
//   justify-content: flex-start;
//   box-sizing: border-box;
//   width: 100%;
//   padding: 0 20px;

//   font-size: ${({ theme }) => theme.typography.fontSize.body3};
//   font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
//   margin-top: 8px;
//   color: ${({ theme, state }) =>
//     state === 'error' ? theme.colors.mainOrange : theme.colors.mainBlue};
// `;

const Border = styled.div`
  width: 100vw;
  height: 1px;
  background: ${({ theme }) => theme.colors.gray50};
  margin-left: -20px;
`;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
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
