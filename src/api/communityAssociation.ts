import { AxiosError } from 'axios';
import { axiosInstance } from '@/api/axiosInstance';
import { ServerErrorResponse } from '@/types/Common/ServerError';
import {
  AssociationChairmanRequest,
  AssociationInfoRequest,
  AssociationInfoResponse,
  JoinRequestsResponse,
  MemberDetailResponse,
  MemberRankRequest,
  MembersOverviewResponse,
  MembersResponse,
} from '@/types/Community/association';
import {
  CommunityAccessResponse,
  GetAssociationListResponse,
  JoinAssociationRequest,
} from '@/types/CommunityAssociation';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';

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

export const useCommunityAccess = (): UseQueryResult<CommunityAccessResponse> =>
  useQuery({
    queryKey: ['communityAccess'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/community/access');
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60, //TODO
  });

// 협회 정보 조회
export const useAssociationInfo = () => {
  return useQuery<AssociationInfoResponse, Error>({
    queryKey: ['associationInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/info');
      return response.data;
    },
  });
};

// 협회 정보 수정
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
      console.log('usePutAssociationInfo - 협회 정보 수정 성공');
      queryClient.invalidateQueries({ queryKey: ['associationInfo'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerHome'] });
    },
    onError: (error) => {
      console.error('usePutAssociationInfo - 협회 정보 수정 실패:', error);
    },
  });
};

// 협회장 위임
export const useChangeChairman = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chairman: AssociationChairmanRequest) => {
      const response = await axiosInstance.put(
        '/association/chairman/delegate',
        chairman,
      );
      return response;
    },
    onSuccess: (response, chairman) => {
      console.log('useChangeChairman - 협회장 위임 성공:', response.data);
      queryClient.invalidateQueries({ queryKey: ['associationInfo'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
      queryClient.invalidateQueries({
        queryKey: ['memberDetail', chairman.newChairmanId],
      });
      // queryClient.invalidateQueries({ queryKey: ['memberDetail', chairman.oldChairmanMemberId] });
    },
    onError: (error) => {
      console.error('useChangeChairman - 협회장 위임 실패:', error);
    },
  });
};

// 회원관리 탭 목록(협회 회원 + 가입 신청자 요약)
export const useMembersOverview = () => {
  return useQuery<MembersOverviewResponse, Error>({
    queryKey: ['membersOverview'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/members/overview');
      return response.data;
    },
  });
};

// 협회 회원 목록 조회
export const useMembers = () => {
  return useQuery<MembersResponse, Error>({
    queryKey: ['members'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/members');
      return response.data;
    },
  });
};

// 협회 회원 상세 정보 조회
export const useMembersDetail = (memberId: number) => {
  return useQuery<MemberDetailResponse, Error>({
    queryKey: ['memberDetail', memberId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/association/members/${memberId}`,
      );
      return response.data;
    },
  });
};

// 회원 등급 변경
export const usePutMembersRank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberInfo: MemberRankRequest) => {
      const response = await axiosInstance.put(
        '/association/members/rank',
        memberInfo,
      );
      return response;
    },
    onSuccess: (response, memberInfo) => {
      console.log('usePutMembersRank - 회원 등급 변경 성공:', response.data);
      queryClient.invalidateQueries({
        queryKey: ['memberDetail', memberInfo.memberId],
      });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
    },
    onError: (error: AxiosError<ServerErrorResponse>) => {
      console.error('usePutMembersRank - 회원 등급 변경 실패:', error);
    },
  });
};

// 협회 가입 신청 목록 보기
export const useJoinRequest = () => {
  return useQuery<JoinRequestsResponse, Error>({
    queryKey: ['joinRequest'],
    queryFn: async () => {
      const response = await axiosInstance.get('/association/join-requests');
      return response.data;
    },
  });
};

// 협회 가입 신청 승인
export const useJoinRequestAccept = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/association/join-requests/${id}/accept`,
      );
      return response;
    },
    onSuccess: () => {
      console.log('useJoinRequestAccept - 가입 요청 승인 성공');
      queryClient.invalidateQueries({ queryKey: ['joinRequest'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
    },
    onError: (error) => {
      console.error('useJoinRequestAccept - 가입 요청 승인 실패:', error);
    },
  });
};

// 협회 가입 신청 거절
export const useJoinRequestReject = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(
        `/association/join-requests/${id}/reject`,
      );
      return response;
    },
    onSuccess: () => {
      console.log('useJoinRequestReject - 가입 요청 거절 성공');
      queryClient.invalidateQueries({ queryKey: ['joinRequest'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
    },
    onError: (error) => {
      console.error('useJoinRequestReject - 가입 요청 거절 실패:', error);
    },
  });
};

// 협회 회원 강제 탈퇴
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
      console.log('useMemberExpel - 회원 강제 탈퇴 성공');
      queryClient.invalidateQueries({ queryKey: ['memberDetail', memberId] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
    },
    onError: (error) => {
      console.error('useMemberExpel - 회원 강제 탈퇴 실패:', error);
    },
  });
};

/* 사회복지사 마이페이지에서 사용 */
// 협회 탈퇴하기
export const usePutAssociationLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put('/association/leave');
      return response;
    },
    onSuccess: (response) => {
      console.log('usePutAssociationLeave - 협회 탈퇴하기 성공:', response);
      queryClient.invalidateQueries({ queryKey: ['associationInfo'] });
      queryClient.invalidateQueries({ queryKey: ['communityAccess'] });
      queryClient.invalidateQueries({ queryKey: ['membersOverview'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerMy'] });
      queryClient.invalidateQueries({ queryKey: ['socialworkerMyEdit'] });
    },
    onError: (error) => {
      console.error('usePutAssociationLeave - 협회 탈퇴하기 실패:', error);
    },
  });
};
