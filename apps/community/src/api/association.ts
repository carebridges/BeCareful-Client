'use client';

import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CommunityFormData } from '@/types/community';
import {
  AssociationInfoResponse,
  AssociationListResponse,
  AssociationUpdateRequest,
  ChairmanDelegateRequest,
  JoinAssociationRequest,
  JoinRequestsResponse,
  MemberDetailResponse,
  MemberRankRequest,
  MembersOverviewResponse,
  MembersResponse,
} from '@/types/association';
import {
  axiosInstance,
  PresignedUrlResponse,
  ServerErrorResponse,
  UploadResult,
} from '@repo/common';

// ==================== 협회 등록 ====================
/* 협회 프로필 이미지 업로드 */
export const useUploadAssociationProfileImage = () =>
  useMutation<UploadResult, Error, File>({
    mutationFn: async (file) => {
      const ct =
        file.type && file.type.trim() !== ''
          ? file.type
          : 'application/octet-stream';

      const { data } = await axiosInstance.post<PresignedUrlResponse>(
        '/association/profile-img/presigned-url',
        null,
        { params: { fileName: file.name, contentType: ct } },
      );

      const res = await fetch(data.presignedUrl, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-Type': ct },
        body: file,
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`S3 PUT  실패 ${res.status}: ${body}`);
      }

      return { tempKey: data.tempKey, previewUrl: URL.createObjectURL(file) };
    },
  });

export const useRegisterAssociation = () =>
  useMutation({
    mutationFn: async (formData: CommunityFormData) => {
      const { data } = await axiosInstance.post(
        '/association/create',
        formData,
      );
      return data;
    },
  });

// ==================== 협회 목록 및 가입 ====================
export const useGetAssociationList = () =>
  useQuery<AssociationListResponse>({
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
    mutationFn: async (associationInfo: AssociationUpdateRequest) => {
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
