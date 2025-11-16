import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import AgreeSection from '@/components/SocialWorker/MyPage/AgreeSection';
import BirthInputBox from '@/components/common/InputBox/BirthInputBox';
import InputBox from '@/components/common/InputBox/InputBox';
import { Button } from '@/components/common/Button/Button';
import { CheckCard } from '@/components/SignUp/SocialWorkerSignUpFunnel/common/CheckCard';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { InstitutionSearchInput } from '@/components/SignUp/SocialWorkerSignUpFunnel/Step3InstitutionName/InstitutionSearchInput';
import {
  INSTITUTION_RANK_EN_TO_RANK,
  INSTITUTION_RANK_LIST,
} from '@/constants/common/institutionRank';
import { SocialworkerMyRequest } from '@/types/Socialworker/mypage';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useSocialworkerBasicForm } from '@/hooks/Socialworker/useSocialworkerBasicForm';
import { useAgreementStateForm } from '@/hooks/Socialworker/useAgreementStateForm';
import {
  useGetSocialWorkerMyEdit,
  usePutSocialworkerMy,
} from '@/api/socialworker';

const SocialworkerEditProfilePage = () => {
  const { handleGoBack } = useHandleNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const { data } = useGetSocialWorkerMyEdit();

  const {
    name,
    nickname,
    birth,
    genderCode,
    phoneNumber,
    institutionId,
    institutionName,
    rank,
    setInstitutionId,
    setInstitutionName,
    nicknameValidation,
    isDuplicateCheckButtonEnabled,
    handleChange,
    handleCheckDuplicate,
  } = useSocialworkerBasicForm(data, setIsChanged);

  const { agreementStates, handleAgreementChange } = useAgreementStateForm(
    data,
    setIsChanged,
  );

  const { mutate: updateSocialMy } = usePutSocialworkerMy();

  const handleEditBtnClick = async () => {
    const myData: SocialworkerMyRequest = {
      realName: name,
      nickName: nickname,
      birthYymmdd: birth,
      genderCode: genderCode,
      phoneNumber: phoneNumber,
      nursingInstitutionId: institutionId,
      institutionRank: INSTITUTION_RANK_EN_TO_RANK[rank],
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
          <InputBox title="이름" gray={true} value={name} />
        </CardContainer>

        <CardContainer>
          <label className="title">
            닉네임 <span className="star">*</span>
          </label>
          <NicknameInput>
            <Input
              style={{ width: '75%' }}
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => handleChange('nickname', e.target.value)}
            />
            <Button
              height="52px"
              variant={isDuplicateCheckButtonEnabled ? 'mainBlue' : 'disabled'}
              disabled={!isDuplicateCheckButtonEnabled}
              style={{ width: '25%' }}
              onClick={handleCheckDuplicate}
            >
              중복확인
            </Button>
          </NicknameInput>
        </CardContainer>
        {nicknameValidation.message && (
          <ValidationMessage state={nicknameValidation.state}>
            {nicknameValidation.message}
          </ValidationMessage>
        )}

        <CardContainer>
          <BirthInputBox birth={birth} gender={genderCode} />
        </CardContainer>

        <CardContainer>
          <InputBox title="휴대전화" gray={true} value={phoneNumber} />
        </CardContainer>
      </InfoWrapper>

      <Border />

      <CardContainer>
        <label className="title">
          소속된 기관명 <span className="star">*</span>
        </label>
        <InstitutionSearchInput
          onInstitutionSelect={(name, id) => {
            setInstitutionName(name);
            if (id) setInstitutionId(id);
            setIsChanged(true);
          }}
          institution={institutionName}
        />
      </CardContainer>

      <CardContainer>
        <label className="title">
          직급 <span className="star">*</span>
        </label>
        {INSTITUTION_RANK_LIST.map((option) => (
          <CheckCard
            key={option.value}
            pressed={rank === option.value}
            text={option.text}
            onClick={() => handleChange('rank', option.value)}
          />
        ))}
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

const ValidationMessage = styled.p<{ state: 'default' | 'error' | 'success' }>`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;

  font-size: ${({ theme }) => theme.typography.fontSize.body3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  margin-top: 8px;
  color: ${({ theme, state }) =>
    state === 'error' ? theme.colors.mainOrange : theme.colors.mainBlue};
`;

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
