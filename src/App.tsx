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

function App() {
  return (
    <Routes>
      {/* 초기 - 스플래시, 온보딩, 회원가입 페이지 */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/login" element={<LoginPage />} />
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
      <Route
        path="/caregiver/*"
        // element={(() => {
        // const user = useRecoilValue(currenUserInfo);
        // if (user.userType === "caregiver") {
        //    return <CaregiverLayout />;
        // }
        // // else if (user.userType === "socialworker") {
        // // return <SocialworkerLayout />;
        // // }
        // })()}
        element={<CaregiverRoute />}
      />

      {/* 커뮤니티 */}
      <Route path="/community/*" element={<CommunityRoute />} />

      {/*기관 관리자 */}
      <Route path="/socialworker/*" element={<SocialworkerRoute />} />

      {/*<Route path="/matching/caregiver" element={<CareGiverDetailInfoPage />} />*/}

      {/* 협회 랜딩페이지 */}
      <Route path="/landing" element={<LandingPage />} />

      {/* 테스트, 에러 페이지 */}
      <Route path="/test" element={<TestPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
