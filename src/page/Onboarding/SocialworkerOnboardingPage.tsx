import Onboarding1 from '@/assets/icons/OnboardingSw1.svg';
import Onboarding2 from '@/assets/icons/OnboardingSw2.svg';
import Onboarding3 from '@/assets/icons/OnboardingSw3.svg';
import { CommonOnboardingPage } from '@/components/common/Onboarding/CommonOnboardingPage';
import { OnboardingItem } from '@/types/common';

const SOCIALWORKER_ONBOARDING: OnboardingItem[] = [
  {
    id: 0,
    title: '검증된 요양보호사 매칭',
    detail: '우리 센터 어르신에게 적합한\n우수 인력을 빠르게 추천해 드려요.',
    image: Onboarding1,
    buttonText: '다음',
  },
  {
    id: 1,
    title: '스마트한 공고·지원 관리',
    detail: '공고 등록부터 지원자 현황 파악까지\n한눈에 관리하세요.',
    image: Onboarding2,
    buttonText: '다음',
  },
  {
    id: 2,
    title: '서류 없는 디지털 계약',
    detail: '채팅방 내에서 근무 조건을 조율하고\n이야기를 나눠보세요.',
    image: Onboarding3,
    buttonText: '돌봄다리 시작하기',
  },
];

export const SocialworkerOnboardingPage = () => {
  return (
    <CommonOnboardingPage
      steps={SOCIALWORKER_ONBOARDING}
      path="/socialworker"
      storageKey="socialworkerOnboarding"
    />
  );
};
