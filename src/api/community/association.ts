import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ChairmanDelegateRequest,
  AssociationInfoRequest,
  AssociationInfoResponse,
  JoinRequestsResponse,
  MemberDetailResponse,
  MemberRankRequest,
  MembersOverviewResponse,
  MembersResponse,
} from '@/types/Community/association';
import {
  GetAssociationListResponse,
  JoinAssociationRequest,
} from '@/types/CommunityAssociation';
import { AxiosError } from 'axios';
import { ServerErrorResponse } from '@/types/common/ServerError';

// ==================== 협회 목록 및 가입 ====================
export const useGetAssociationList = () =>
  useQuery<GetAssociationListResponse>({
    queryKey: ['associationList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/association/list');
      return data;
    },
  });

export const useJoinAssociation = () =>
  useMutation({
    mutationFn: async (payload: JoinAssociationRequest) => {
      await axiosInstance.post('/association/join-requests', payload);
    },
  });

export const useCancelJoinAssociation = () =>
  useMutation({
    mutationFn: async () => {
      await axiosInstance.delete('/association/join-requests');
    },
  });

// ==================== 협회 관리 ====================
/* 협회 정보 조회 */
export const useAssociationInfo = () => {
  return useQuery<AssociationInfoResponse>({
    queryKey: ['associationInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/info');
      return response.data;
    },
  });
};

/* 협회 정보 수정 */
export const usePutAssociationInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (associationInfo: AssociationInfoRequest) => {
      const response = await axiosInstance.put(
        '/association/info',
        associationInfo,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['associationInfo'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerHome'] });
    },
  });
};

/* 협회장 위임 */
export const useDelegateChairman = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chairman: ChairmanDelegateRequest) => {
      const response = await axiosInstance.put(
        '/association/chairman/delegate',
        chairman,
      );
      return response;
    },
    onSuccess: (_, newChairman) => {
      queryClient.invalidateQueries({ queryKey: ['associationInfo'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
      queryClient.invalidateQueries({
        queryKey: ['memberDetail', newChairman.newChairmanId],
      });
      // queryClient.invalidateQueries({ queryKey: ['memberDetail', chairman.oldChairmanMemberId] });
    },
  });
};

/* 회원관리 탭 목록(협회 회원 + 가입 신청자 요약) */
export const useMembersOverview = () => {
  return useQuery<MembersOverviewResponse>({
    queryKey: ['membersOverview'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/members/overview');
      return response.data;
    },
  });
};

/* 협회 회원 목록 조회 */
export const useMembers = () => {
  return useQuery<MembersResponse>({
    queryKey: ['members'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/members');
      return response.data;
    },
  });
};

/* 협회 회원 상세 정보 조회 */
export const useMemberDetail = (memberId: number) => {
  return useQuery<MemberDetailResponse>({
    queryKey: ['memberDetail', memberId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/association/members/${memberId}`,
      );
      return response.data;
    },
  });
};

/* 회원 등급 변경 */
export const useUpdateMemberRank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rankData: MemberRankRequest) => {
      const response = await axiosInstance.put(
        '/association/members/rank',
        rankData,
      );
      return response;
    },
    onSuccess: (_, rankData) => {
      queryClient.invalidateQueries({
        queryKey: ['memberDetail', rankData.memberId],
      });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
    },
    onError: (error: AxiosError<ServerErrorResponse>) => {
      console.error('회원 등급 변경 실패:', error);
    },
  });
};

/* 협회 회원 강제 탈퇴 */
export const useMemberExpel = (memberId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/association/members/${memberId}/expel`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberDetail', memberId] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
    },
  });
};

/* 협회 가입 신청 목록 보기 */
export const useJoinRequest = () => {
  return useQuery<JoinRequestsResponse>({
    queryKey: ['joinRequests'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/join-requests');
      return response.data;
    },
  });
};

/* 협회 가입 신청 승인 */
export const useAcceptJoinRequest = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/association/join-requests/${id}/accept`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joinRequests'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
    },
  });
};

/* 협회 가입 신청 거절 */
export const useRejectJoinRequest = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/association/join-requests/${id}/reject`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['joinRequests'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
    },
  });
};

/* 협회 탈퇴하기 */
export const useLeaveAssociation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put('/association/leave');
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['associationInfo'] });
      queryClient.invalidateQueries({ queryKey: ['communityAccess'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerProfile'] });
    },
  });
};
