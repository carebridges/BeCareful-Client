import { API_Association_Rank_Mapping } from '@/constants/associationRank';
import SocialworkerEditAssociationPage from '@/page/SocialWorker/MyPage/SocialworkerEditAssociationPage';
import SocialworkerEditInstitutionPage from '@/page/SocialWorker/MyPage/SocialworkerEditInstitutionPage';
import SocialworkerEditProfilePage from '@/page/SocialWorker/MyPage/SocialworkerEditProfilePage';
import SocialworkerMyPage from '@/page/SocialWorker/MyPage/SocialworkerMyPage';
import { Routes, Route, Outlet } from 'react-router-dom';

const SocialworkerMyRoute = () => {
  return (
    <div>
      <Routes>
        <Route index element={<SocialworkerMyPage />} />
        <Route path="profile" element={<SocialworkerEditProfilePage />} />
        <Route
          path="institution"
          element={
            <SocialworkerEditInstitutionPage
              institution="은파요양원"
              institutionCode="12345678910"
              year="2007"
              types={['방문 요양', '방문 간호', '방문 목욕']}
              phoneNumber="02-1234-5678"
            />
          }
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
