import { Routes, Route, Outlet } from 'react-router-dom';
import SocialworkerEditAssociationPage from '@/page/SocialWorker/MyPage/SocialworkerEditAssociationPage';
import SocialworkerEditInstitutionPage from '@/page/SocialWorker/MyPage/SocialworkerEditInstitutionPage';
import SocialworkerEditProfilePage from '@/page/SocialWorker/MyPage/SocialworkerEditProfilePage';
import SocialworkerMyPage from '@/page/SocialWorker/MyPage/SocialworkerMyPage';
import SocialworkerSettingPage from '@/page/SocialWorker/MyPage/SocialworkerSettingPage';
import SocialworkerBlockPage from '@/page/SocialWorker/MyPage/SocialworkerBlockPage';

const SocialworkerMyRoute = () => {
  return (
    <div>
      <Routes>
        <Route index element={<SocialworkerMyPage />} />
        <Route path="profile" element={<SocialworkerEditProfilePage />} />
        <Route
          path="institution"
          element={<SocialworkerEditInstitutionPage />}
        />
        <Route
          path="association"
          element={<SocialworkerEditAssociationPage />}
        />
        <Route path="setting" element={<SocialworkerSettingPage />} />
        <Route path="block" element={<SocialworkerBlockPage />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default SocialworkerMyRoute;
