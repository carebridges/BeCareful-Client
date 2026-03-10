import Onboarding1 from '@/assets/icons/OnboardingCg1.svg';
import Onboarding2 from '@/assets/icons/OnboardingCg2.svg';
import Onboarding3 from '@/assets/icons/OnboardingCg3.svg';
import { CommonOnboardingPage } from '@/components/common/Onboarding/CommonOnboardingPage';
import { OnboardingItem } from '@/types/common';

const CAREGIVER_ONBOARDING: OnboardingItem[] = [
  {
    id: 0,
    title: '나에게 딱 맞는 일자리',
    detail: '거주지와 희망 조건에 맞는 공고를\n가장 먼저 알려드려요.',
    image: Onboarding1,
    buttonText: '다음',
  },
  {
    id: 1,
    title: '터치 한 번으로 지원 완료',
    detail: '복잡한 서류 없이 등록된 프로필로\n원하는 공고에 바로 지원하세요.',
    image: Onboarding2,
    buttonText: '다음',
  },
  {
    id: 2,
    title: '실시간 채팅 조율',
    detail: '기관과 채팅으로 조건을 조율하고\n안전하게 계약을 확정하세요.',
    image: Onboarding3,
    buttonText: '돌봄다리 시작하기',
  },
];

export const CaregiverOnboardingPage = () => {
  return (
    <CommonOnboardingPage
      steps={CAREGIVER_ONBOARDING}
      path="/caregiver"
      storageKey="caregiverOnboarding"
    />
  );
};
