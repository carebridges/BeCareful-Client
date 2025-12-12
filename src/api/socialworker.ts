import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SocialworkerHomeResponse } from '@/types/Socialworker/home';
import {
  NursingAssociationInfoRequest,
  MarketingAgreeInfo,
  SocialworkerAssociationResponse,
  SocialworkerMyEditResponse,
  SocialworkerMyRequest,
  SocialworkerMyResponse,
} from '@/types/Socialworker/mypage';

/* 사회복지사 홈화면 */
// 사회복지사 홈화면 조회
export const useGetSocialWorkerHome = () =>
  useQuery<SocialworkerHomeResponse>({
    queryKey: ['socialworkerHome'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/social-worker/home');
      return data;
    },
  });

/* 사회복지사 마이페이지 */
// 회원정보 반환
export const useGetSocialWorkerMy = () =>
  useQuery<SocialworkerMyResponse>({
    queryKey: ['socialworkerMy'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/social-worker/my');
      return data;
    },
  });

// 회원정보 수정화면 정보 반환
export const useGetSocialWorkerMyEdit = () =>
  useQuery<SocialworkerMyEditResponse>({
    queryKey: ['socialworkerMyEdit'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/social-worker/my/profile');
      return data;
    },
  });

// 회원정보 수정
export const usePutSocialworkerMy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (myData: SocialworkerMyRequest) => {
      const response = await axiosInstance.put(
        '/social-worker/my/profile',
        myData,
      );
      return response;
    },
    onSuccess: () => {
      console.log('usePutSocialworkerMy - 사회복지사 마이페이지 수정 성공');
      queryClient.invalidateQueries({ queryKey: ['socialworkerMy'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerMyEdit'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerHome'] });
    },
    onError: (error) => {
      console.error(
        'usePutSocialworkerMy - 사회복지사 마이페이지 수정 실패:',
        error,
      );
    },
  });
};

// 기관 정보 수정
export const usePutInstitutionInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (institutionInfo: NursingAssociationInfoRequest) => {
      const response = await axiosInstance.put(
        '/nursingInstitution/info',
        institutionInfo,
      );
      return response;
    },
    onSuccess: (response) => {
      console.log('usePutInstitutionInfo - 요양기관 수정 성공:', response.data);
      queryClient.invalidateQueries({ queryKey: ['institutionInfo'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerHome'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerMy'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerMyEdit'] });
    },
    onError: (error) => {
      console.error('usePutInstitutionInfo - 요양기관 수정 실패:', error);
    },
  });
};

// 사회복지사 협회 상세 정보 조회
export const useSocialAssociationInfo = () => {
  return useQuery<SocialworkerAssociationResponse, Error>({
    queryKey: ['socialworkerAssociationInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get('/social-worker/my/association');
      return response.data;
    },
  });
};

// 사회복지사 협회 상세 정보 수정
export const usePatchSocialAssociationInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (associationInfo: MarketingAgreeInfo) => {
      const response = await axiosInstance.patch(
        '/social-worker/my/association',
        associationInfo,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['socialworkerAssociationInfo'],
      });
    },
    onError: (error) => {
      console.error(
        'usePatchSocialAssociationInfo - 협회 정보 수정 실패',
        error,
      );
    },
  });
};

// 사회복지사 마케팅 동의 여부 조회
export const useGetSocialMarketingInfo = () => {
  return useQuery<MarketingAgreeInfo, Error>({
    queryKey: ['socialworkerMarketingInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get('/social-worker/my/setting');
      return response.data;
    },
  });
};

// 사회복지사 마케팅 동의 여부 수정
export const usePatchSocialMarketingInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (associationInfo: MarketingAgreeInfo) => {
      const response = await axiosInstance.patch(
        '/social-worker/my/marketing-info-receiving-agreement',
        associationInfo,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['socialworkerMarketingInfo'],
      });
    },
    onError: (error) => {
      console.error('사회복지사 마케팅 동의 여부 변경 실패', error);
    },
  });
};

// 로그아웃
export const useSocialworkerLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put('/social-worker/logout');
      return response;
    },
    onSuccess: () => {
      console.log('useSocialworkerLogout - 사회복지사 로그아웃 성공');
    },
    onError: (error) => {
      console.error('useSocialworkerLogout - 사회복지사 로그아웃 실패:', error);
    },
  });
};

// 회원탈퇴
export const useDeleteSocialworker = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete('/social-worker/leave');
      return response;
    },
    onSuccess: () => {
      console.log('useDeleteSocialworker - 사회복지사 탈퇴 성공');
    },
    onError: (error) => {
      console.error('useDeleteSocialworker - 사회복지사 탈퇴 실패:', error);
    },
  });
};
