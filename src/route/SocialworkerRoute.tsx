import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import PointPage from '@/page/Common/PointPage';
import SocialworkerHomePage from '@/page/SocialWorker/Home/SocialworkerHomePage';
import SocialworkerMyRoute from '@/route/SocialworkerMyRoute';
import ElderlyPage from '@/page/Elderly/ElderlyPage';
import ElderlyRegisterPage from '@/page/Elderly/ElderlyRegisterPage';
import { SocialWorkerMatchingPage } from '@/page/SocialWorkerMatching/SocialWorkerMatchingPage';
import { RegisterMatchingElderPage } from '@/page/Matching/RegisterMatchingElderPage';
import MatchingStatusPage from '@/page/Matching/MatchingStatusPage';
import { MatchingInformationPage } from '@/page/Matching/MatchingInformationPage';
import { CareGiverDetailInfoPage } from '@/page/Matching/CareGiverDetailInfoPage';
import SocialworkerChatListPage from '@/page/SocialWorker/Chat/SocialworkerChatListPage';
import SocialworkerChatPage from '@/page/SocialWorker/Chat/SocialworkerChatPage';
import SocialworkerEditContractPage from '@/page/SocialWorker/Chat/SocialworkerEditContractPage';

const SocialworkerRoute = () => {
  const location = useLocation();

  const hideTabBarPaths = [
    '/socialworker/my/profile',
    '/socialworker/my/institution',
    '/socialworker/my/association',
    '/socialworker/elderly/*',
    '/socialworker/matching/new',
    '/socialworker/matching/:recruitmentId/caregiver/:caregiverId',
    '/socialworker/apply/:recruitmentId/caregiver/:caregiverId',
    '/socialworker/matching/info/:recruitmentId',
    '/socialworker/chat',
    '/socialworker/chat/:matchingId',
    '/socialworker/chat/:contractId/edit',
    '/socialworker/point',
  ];
  const shouldHideTabBar = () => {
    return hideTabBarPaths.some((pathPattern) => {
      return matchPath(pathPattern, location.pathname) !== null;
    });
  };
  const isHideTabBar = shouldHideTabBar();

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <main>
        <Routes>
          <Route index element={<SocialworkerHomePage />} />

          <Route path="my/*" element={<SocialworkerMyRoute />} />
          <Route path="elderly" element={<ElderlyPage />} />
          <Route path="elderly/new" element={<ElderlyRegisterPage />} />
          <Route path="match/social" element={<SocialWorkerMatchingPage />} />
          <Route path="matching/new" element={<RegisterMatchingElderPage />} />
          <Route path="matching/dashboard" element={<MatchingStatusPage />} />
          <Route
            path="matching/info/:recruitmentId"
            element={<MatchingInformationPage />}
          />
          <Route
            path="matching/:recruitmentId/caregiver/:caregiverId"
            element={<CareGiverDetailInfoPage />}
          />
          <Route
            path="apply/:recruitmentId/caregiver/:caregiverId"
            element={<CareGiverDetailInfoPage />}
          />
          <Route path="chat" element={<SocialworkerChatListPage />} />
          <Route path="chat/:matchingId" element={<SocialworkerChatPage />} />
          <Route
            path="chat/:contractId/edit"
            element={<SocialworkerEditContractPage />}
          />
          <Route path="point" element={<PointPage />} />
        </Routes>
      </main>

      {!isHideTabBar && <SocialWorkerTabBar />}
    </div>
  );
};

export default SocialworkerRoute;
