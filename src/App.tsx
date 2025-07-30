import { Route, Routes } from 'react-router-dom';
import SplashPage from '@/page/SplashPage';
import { OnboardingPage } from '@/page/Onboarding/OnboardingPage';
import { SignUpProvider } from '@/contexts/SocialWorkerSignUpContext';
import { CaregiverSignUpProvider } from '@/contexts/CaregiverSignUpContext';
import { InstitutionSignUpPage } from '@/page/SignUp/InstitutionSignUpPage';
import { SignUpPage } from '@/page/SignUp/SignUpPage';
import { CareGiverSignUpPage } from './page/SignUp/CareGiverSignUpPage';
import CaregiverRoute from '@/route/CaregiverRoute';
import CommunityRoute from '@/route/CommunityRoute';
import SocialworkerRoute from '@/route/SocialworkerRoute';
import ChatListCaregiver from '@/page/Chat/ChatListCaregiver';
import ChatListPage from '@/page/Chat/ChatListPage';
import ChatRoomPage from '@/page/Chat/ChatRoomPage';
import LandingPage from '@/page/Landing/LandingPage';
import { TestPage } from '@/page/TestPage';
import { ErrorPage } from '@/page/Error/ErrorPage';

function App() {
  return (
    <Routes>
      {/* 초기 - 스플래시, 온보딩, 회원가입 페이지 */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/signup/institution"
        element={
          <SignUpProvider>
            <InstitutionSignUpPage />
          </SignUpProvider>
        }
      />
      <Route
        path="/signup/caregiver"
        element={
          <CaregiverSignUpProvider>
            <CareGiverSignUpPage />
          </CaregiverSignUpProvider>
        }
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

      {/* 채팅 - 요양보호사, 사회복지사 */}
      <Route path="/chatList/social" element={<ChatListPage />} />
      <Route path="/caregiver/chatList" element={<ChatListCaregiver />} />
      <Route path="/chatroom/:matchingId" element={<ChatRoomPage />} />

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
