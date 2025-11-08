import { Route, Routes } from 'react-router-dom';
import { PostReadStatusProvider } from '@/contexts/PostReadStatusContext';
import { CommunityCreatePage } from '@/page/Community/CommunityCreatePage';
import { CommunitySignUpPage } from '@/page/SignUp/CommunitySignUpPage';
import { CommunityJoinPage } from '@/page/Community/CommunityJoinPage';
import CommunityJoinSelectRolePage from '@/page/Community/CommunityJoinSelectRolePage';
import CommunityPage from '@/page/Community/CommunityPage';
import { CommunityRouteGuard } from '@/page/Community/CommunityRouteGuard';
import CommunityPostPage from '@/page/Community/CommunityPostPage';
import CommunityWritePage from '@/page/Community/CommunityWritePage';
import CommunitySearchPage from '@/page/Community/CommunitySearchPage';
import CommunityAssociationInfoPage from '@/page/Community/Association/CommunityAssociationInfoPage';
import CommunityEditAssociationPage from '@/page/Community/Association/CommunityEditAssociationPage';
import CommunityEditChairmanPage from '@/page/Community/Association/CommunityEditChairmanPage';
import CommunityMembersPage from '@/page/Community/Association/CommunityMembersPage';
import CommnunityMemberDetailPage from '@/page/Community/Association/CommunityMemberDetailPage';
import { CommunityAcceptTermsPage } from '@/page/Community/CommunityAcceptTermsPage';

const CommunityRoute = () => {
  return (
    <PostReadStatusProvider>
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <main>
          <Routes>
            <Route path="create" element={<CommunityCreatePage />} />
            {/*서버 수정되면 삭제 예정*/}
            <Route path="signup" element={<CommunitySignUpPage />} />
            <Route path="members/new" element={<CommunityJoinPage />} />
            <Route path=":id/preview" element={<CommunityPage previewMode />} />
            <Route
              path="join/:id/role"
              element={<CommunityJoinSelectRolePage />}
            />
            <Route
              path="join/:id/accept-terms"
              element={<CommunityAcceptTermsPage />}
            />

            <Route index element={<CommunityRouteGuard />} />
            <Route path=":boardType/:postId" element={<CommunityPostPage />} />
            <Route path="search" element={<CommunitySearchPage />} />
            <Route path="write" element={<CommunityWritePage />} />
            <Route
              path="edit/:boardType/:postId"
              element={<CommunityWritePage />}
            />

            <Route path=":associationId">
              <Route path="info" element={<CommunityAssociationInfoPage />} />
              <Route
                path="edit/association"
                element={<CommunityEditAssociationPage />}
              />
              <Route
                path="edit/chairman"
                element={<CommunityEditChairmanPage />}
              />
              <Route path="members" element={<CommunityMembersPage />} />
              <Route
                path="members/:memberId"
                element={<CommnunityMemberDetailPage />}
              />
            </Route>
          </Routes>
        </main>
      </div>
    </PostReadStatusProvider>
  );
};

export default CommunityRoute;
