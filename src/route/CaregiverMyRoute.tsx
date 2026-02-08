import { Routes, Route, Outlet } from 'react-router-dom';
import CaregiverMyPage from '@/page/Caregiver/MyPage/CaregiverMyPage';
import CaregiverEditProfilePage from '@/page/Caregiver/MyPage/CaregiverEditProfilePage';
import CaregiverCareerPage from '@/page/Caregiver/MyPage/CaregiverCareerPage';
import CaregiverApplicationPage from '@/page/Caregiver/MyPage/CaregiverApplicationPage';
import CaregiverSettingPage from '@/page/Caregiver/MyPage/CaregiverSettingPage';
import CaregiverBlockPage from '@/page/Caregiver/MyPage/CaregiverBlockPage';

const CaregiverMyRoute = () => {
  return (
    <div>
      <Routes>
        <Route index element={<CaregiverMyPage />} />
        <Route path="profile" element={<CaregiverEditProfilePage />} />
        <Route path="career" element={<CaregiverCareerPage />} />
        <Route path="application" element={<CaregiverApplicationPage />} />
        <Route path="setting" element={<CaregiverSettingPage />} />
        <Route path="block" element={<CaregiverBlockPage />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default CaregiverMyRoute;
