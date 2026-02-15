import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SocialworkerHomeResponse } from '@/types/Socialworker/home';
import {
  NursingAssociationInfoRequest,
  MarketingAgreeInfo,
  SocialworkerAssociationResponse,
  SocialworkerMyEditResponse,
  SocialworkerMyRequest,
  SocialworkerProfileResponse,
  BlockCaregiverInfo,
} from '@/types/Socialworker/mypage';

// ==================== 홈 ====================
/* 사회복지사 홈화면 조회 */
export const useSocialworkerHome = () =>
  useQuery<SocialworkerHomeResponse>({
    queryKey: ['socialworkerHome'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/social-worker/home');
      return data;
    },
  });

// ==================== 마이페이지 ====================
/* 회원정보 반환 */
export const useSocialworkerProfile = () =>
  useQuery<SocialworkerProfileResponse>({
    queryKey: ['socialworkerProfile'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/social-worker/my');
      return data;
    },
  });

/* 회원정보 수정화면 정보 반환 */
export const useSocialworkerProfileEdit = () =>
  useQuery<SocialworkerMyEditResponse>({
    queryKey: ['socialworkerProfileEdit'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/social-worker/my/profile');
      return data;
    },
  });

/* 회원정보 수정 */
export const useUpdateSocialworkerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: SocialworkerMyRequest) => {
      const response = await axiosInstance.put(
        '/social-worker/my/profile',
        profileData,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialworkerProfile'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerProfileEdit'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerHome'] });
    },
  });
};

/* 기관 정보 수정 */
export const useUpdateInstitution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (institutionData: NursingAssociationInfoRequest) => {
      const response = await axiosInstance.put(
        '/nursingInstitution/info',
        institutionData,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institutionInfo'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerHome'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerProfile'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerProfileEdit'] });
    },
  });
};

/* 사회복지사 협회 상세 정보 조회 */
export const useSocialAssociation = () => {
  return useQuery<SocialworkerAssociationResponse>({
    queryKey: ['socialworkerAssociation'],
    queryFn: async () => {
      const response = await axiosInstance.get('/social-worker/my/association');
      return response.data;
    },
  });
};

/* 사회복지사 협회 상세 정보 수정 */
export const useUpdateSocialAssociation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (associationData: MarketingAgreeInfo) => {
      const response = await axiosInstance.patch(
        '/social-worker/my/association',
        associationData,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialworkerAssociation'] });
    },
  });
};

/* 사회복지사 마케팅 동의 여부 조회 */
export const useSocialworkerMarketing = (enabled: boolean) => {
  return useQuery<MarketingAgreeInfo>({
    queryKey: ['socialworkerMarketing'],
    queryFn: async () => {
      const response = await axiosInstance.get('/social-worker/my/setting');
      return response.data;
    },
    enabled: enabled,
  });
};

/* 사회복지사 마케팅 동의 여부 수정 */
export const useUpdateSocialMarketing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (marketingAgree: MarketingAgreeInfo) => {
      const response = await axiosInstance.patch(
        '/social-worker/my/marketing-info-receiving-agreement',
        marketingAgree,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialworkerMarketing'] });
    },
  });
};

/* 사회복지사 차단 기관 리스트 조회 */
export const useSocialBlockedCaregiver = () => {
  return useQuery<BlockCaregiverInfo[]>({
    queryKey: ['socialworkerBlocked'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/social-worker/my/blocked-caregiver',
      );
      return response.data;
    },
  });
};

/* 사회복지사 기관 차단 해제 */
export const useUnblockCaregiver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (caregiverId: number) => {
      await axiosInstance.delete(
        `/social-worker/my/blocked-caregiver/${caregiverId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialworkerBlocked'] });
    },
  });
};

/* 로그아웃 */
export const useSocialworkerLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put('/social-worker/logout');
      return response;
    },
  });
};

/* 회원탈퇴 */
export const useDeleteSocialworker = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete('/social-worker/leave');
      return response;
    },
  });
};
