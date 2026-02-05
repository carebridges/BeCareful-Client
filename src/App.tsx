import { Route, Routes } from 'react-router-dom';
import SplashPage from '@/page/SplashPage';
import { OnboardingPage } from '@/page/Onboarding/OnboardingPage';
import { KakaoCareGiverSignUpPage } from './page/SignUp/KakaoCareGiverSignUpPage';
import CaregiverRoute from '@/route/CaregiverRoute';
import CommunityRoute from '@/route/CommunityRoute';
import SocialworkerRoute from '@/route/SocialworkerRoute';
import LandingPage from '@/page/Landing/LandingPage';
import { TestPage } from '@/page/TestPage';
import { ErrorPage } from '@/page/Error/ErrorPage';
import LoginPage from '@/page/Login/LoginPage';
import { KakaoInstitutionSignUpPage } from '@/page/SignUp/KakaoInstitutionSignUpPage';
import { KakaoSignUpPage } from '@/page/SignUp/KakaoSignUpPage';
import { CommonSignUpPage } from '@/page/SignUp/CommonSignUpPage';
import { CommonInstitutionSignUpPage } from '@/page/SignUp/CommonInstitutionSignUpPage';
import { CommonCareGiverSignUpPage } from '@/page/SignUp/CommonCaregiverSignUpPage';
import { ProfileViewPage } from '@/page/Common/ProfileViewPage';

function App() {
  return (
    <Routes>
      {/* 초기 - 스플래시, 온보딩, 회원가입 페이지 */}
      <Route path="/" element={<SplashPage />} />
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

      {/* 커뮤니티 */}
      <Route path="/community/*" element={<CommunityRoute />} />
      {/*기관 관리자 */}
      <Route path="/socialworker/*" element={<SocialworkerRoute />} />

      {/* 협회 랜딩페이지 */}
      <Route path="/landing" element={<LandingPage />} />
      {/* 테스트, 에러 페이지 */}
      <Route path="/test" element={<TestPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />

      {/* 임시 - 프로필 보기 페이지 */}
      <Route path="/profile/view" element={<ProfileViewPage />} />
    </Routes>
  );
}

export default App;
