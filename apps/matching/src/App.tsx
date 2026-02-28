import { Route, Routes } from 'react-router-dom';

import { SplashPage } from '@repo/ui';
import { OnboardingPage } from '@/page/Onboarding/OnboardingPage';

import LoginPage from '@/page/Login/LoginPage';
import { KakaoSignUpPage } from '@/page/SignUp/KakaoSignUpPage';
import { CommonSignUpPage } from '@/page/SignUp/CommonSignUpPage';
import { KakaoInstitutionSignUpPage } from '@/page/SignUp/KakaoInstitutionSignUpPage';
import { CommonInstitutionSignUpPage } from '@/page/SignUp/CommonInstitutionSignUpPage';
import { KakaoCareGiverSignUpPage } from './page/SignUp/KakaoCareGiverSignUpPage';
import { CommonCareGiverSignUpPage } from '@/page/SignUp/CommonCaregiverSignUpPage';

import CaregiverRoute from '@/route/CaregiverRoute';
import SocialworkerRoute from '@/route/SocialworkerRoute';

import { ErrorPage } from '@repo/ui';
import { ProfileViewPage } from '@repo/ui';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

function App() {
  const { handleNavigate } = useHandleNavigate();

  return (
    <Routes>
      {/* 초기 - 스플래시, 온보딩, 회원가입 페이지 */}
      <Route
        path="/"
        element={
          <SplashPage onComplete={() => handleNavigate('/onboarding')} />
        }
      />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/*api 변경 후 삭제*/}
      <Route path="/signup" element={<KakaoSignUpPage />} />

      <Route path="/signup/kakao" element={<KakaoSignUpPage />} />
      <Route path="/signup/common" element={<CommonSignUpPage />} />
      <Route
        path="/signup/kakao/institution"
        element={<KakaoInstitutionSignUpPage />}
      />
      <Route
        path="/signup/kakao/caregiver"
        element={<KakaoCareGiverSignUpPage />}
      />
      <Route
        path="/signup/common/institution"
        element={<CommonInstitutionSignUpPage />}
      />
      <Route
        path="/signup/common/caregiver"
        element={<CommonCareGiverSignUpPage />}
      />
      {/* 요양보호사 */}
      <Route path="/caregiver/*" element={<CaregiverRoute />} />

      {/*기관 관리자 */}
      <Route path="/socialworker/*" element={<SocialworkerRoute />} />

      {/* 에러 페이지 */}
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />

      {/* 임시 - 프로필 보기 페이지 */}
      <Route path="/profile/view" element={<ProfileViewPage />} />
    </Routes>
  );
}

export default App;
