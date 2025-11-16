import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import { SocialWorkerTabBar } from '@/components/SocialWorker/common/SocialWorkerTabBar';
import PointPage from '@/page/Common/PointPage';
import SocialworkerHomePage from '@/page/SocialWorker/Home/SocialworkerHomePage';
import SocialworkerMyRoute from '@/route/SocialworkerMyRoute';
import ElderlyRegisterPage from '@/page/Elderly/ElderlyRegisterPage';
import { RegisterMatchingElderPage } from '@/page/Matching/RegisterMatchingElderPage';
import MatchingStatusPage from '@/page/Matching/MatchingStatusPage';
import { CareGiverDetailInfoPage } from '@/page/Matching/CareGiverDetailInfoPage';
import SocialworkerChatListPage from '@/page/SocialWorker/Chat/SocialworkerChatListPage';
import SocialworkerChatPage from '@/page/SocialWorker/Chat/SocialworkerChatPage';
import SocialworkerEditContractPage from '@/page/SocialWorker/Chat/SocialworkerEditContractPage';
import { SocialWorkerMatchingListPage } from '@/page/SocialWorker/Matching/SocialWorkerMatchingListPage';
import { RecruitmentRegisterPage } from '@/page/SocialWorker/Matching/RecruitmentRegisterPage';
import ElderlyListPage from '@/page/Elderly/ElderlyListPage';
import { ElderlyDetailPage } from '@/page/Elderly/ElderlyDetailPage';
import { RecruitmentDetailPage } from '@/page/SocialWorker/Matching/RecruitmentDetailPage';
import { MatchingInfoPage } from '@/page/Matching/MatchingInfoPage';

const SocialworkerRoute = () => {
  const location = useLocation();

  const hideTabBarPaths = [
    '/socialworker/my/profile',
    '/socialworker/my/institution',
    '/socialworker/my/association',
    '/socialworker/elderly/new',
    '/socialworker/elderly/:elderlyId',
    '/socialworker/matching/new',
    '/socialworker/matching/:recruitmentId/caregiver/:caregiverId',
    '/socialworker/apply/:recruitmentId/caregiver/:caregiverId',
    '/socialworker/match/info/:recruitmentId',
    '/socialworker/chat',
    '/socialworker/chat/:matchingId',
    '/socialworker/chat/:contractId/edit',
    '/socialworker/point',
    '/socialworker/recruitment/new',
    '/socialworker/recruitment/:recruitmentId',
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
          <Route path="elderly" element={<ElderlyListPage />} />
          <Route path="elderly/new" element={<ElderlyRegisterPage />} />
          <Route path="/elderly/:elderlyId" element={<ElderlyDetailPage />} />
          <Route
            path="match/social"
            element={<SocialWorkerMatchingListPage />}
          />
          <Route
            path="matching/new/deprecate"
            element={<RegisterMatchingElderPage />}
          />
          <Route path="matching/dashboard" element={<MatchingStatusPage />} />
          <Route
            path="match/info/:recruitmentId"
            element={<MatchingInfoPage />}
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
          <Route
            path="/recruitment/new"
            element={<RecruitmentRegisterPage />}
          />
          <Route
            path="/recruitment/:recruitmentId"
            element={<RecruitmentDetailPage />}
          />
        </Routes>
      </main>

      {!isHideTabBar && <SocialWorkerTabBar />}
    </div>
  );
};

export default SocialworkerRoute;
