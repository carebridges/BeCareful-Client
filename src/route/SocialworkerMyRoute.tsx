import { Routes, Route, Outlet } from 'react-router-dom';
import SocialworkerEditAssociationPage from '@/page/SocialWorker/MyPage/SocialworkerEditAssociationPage';
import SocialworkerEditInstitutionPage from '@/page/SocialWorker/MyPage/SocialworkerEditInstitutionPage';
import SocialworkerEditProfilePage from '@/page/SocialWorker/MyPage/SocialworkerEditProfilePage';
import SocialworkerMyPage from '@/page/SocialWorker/MyPage/SocialworkerMyPage';
import { API_Association_Rank_Mapping } from '@/constants/associationRank';

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
          element={
            <SocialworkerEditAssociationPage
              association="은파요양원"
              rank={API_Association_Rank_Mapping['회장']}
              isAgreedToTerms={true}
              isAgreedToCollectPersonalInfo={true}
              isAgreedToReceiveMarketingInfo={false}
            />
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
};

export default SocialworkerMyRoute;
