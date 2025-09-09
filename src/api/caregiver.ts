import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  MatchingMyRecruitmentDetailResponse,
  MatchingMyRecruitmentResponse,
} from '@/types/Caregiver/apply';
import {
  CaregiverCompletedMatchingResponse,
  CaregiverHomeResponse,
  MemoEditRequest,
} from '@/types/Caregiver/home';
import {
  CareerRequest,
  CareerResponse,
  CaregiverMyRequest,
  CaregiverMyResponse,
} from '@/types/Caregiver/mypage';
import {
  MatchingListResponse,
  MatchingRecruitmentMediateRequest,
  MatchingRecruitmentResponse,
  WorkApplicationRequest,
  WorkApplicationResponse,
} from '@/types/Caregiver/work';
import {
  CaregiverChatListResponse,
  CaregiverChatResponse,
} from '@/types/Caregiver/chat';

/* 홈화면 */
// 요양보호사 홈 화면 구성 데이터 조회
export const useCaregiverHomeInfoQuery = () => {
  return useQuery<CaregiverHomeResponse, Error>({
    queryKey: ['caregiverHomeInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/home');
      return response.data;
    },
  });
};

/* 나의 일자리 */
// 확정된 일자리의 리스트 반환 - 나의 일자리
export const useMyWorkListQuery = () => {
  return useQuery<CaregiverCompletedMatchingResponse, Error>({
    queryKey: ['caregiverCompletedMatchingList'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/caregiver/my/completed-matching-list',
      );
      return response.data;
    },
  });
};

// 나의 일자리 화면에서 메모 수정
export const putMemo = async (
  completedMatchingId: number,
  memo: MemoEditRequest,
) => {
  const response = await axiosInstance.put(
    `/caregiver/my/complete-matching-list/${completedMatchingId}`,
    memo,
  );
  return response;
};

/* 마이페이지 */
// 요양보호사 마이페이지 홈 화면 데이터 조회
export const useCaregiverMyPageInfoQuery = () => {
  return useQuery<CaregiverMyResponse, Error>({
    queryKey: ['caregiverMypageInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/my');
      return response.data;
    },
  });
};

// 요양보호사 마이페이지 수정
export const putCaregiverMy = async (myData: CaregiverMyRequest) => {
  const response = await axiosInstance.put('/caregiver/my', myData);
  return response;
};

// 경력서 조회
export const useCareerQuery = () => {
  return useQuery<CareerResponse, Error>({
    queryKey: ['caregiverCareer'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/career');
      return response.data;
    },
  });
};

// 경력서 등록/수정
export const putCareer = async (career: CareerRequest) => {
  const response = await axiosInstance.put('/caregiver/career', career);
  return response;
};

// 신청서 조회
export const useApplicationQuery = () => {
  return useQuery<WorkApplicationResponse, Error>({
    queryKey: ['caregiverApplication'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/work-application');
      return response.data;
    },
  });
};

// 신청서 등록
export const putApplication = async (application: WorkApplicationRequest) => {
  const response = await axiosInstance.put(
    '/caregiver/work-application',
    application,
  );
  return response;
};

// 일자리 신청 활성화
export const workApplicationActive = async () => {
  const response = await axiosInstance.post(
    '/caregiver/work-application/active',
  );
  return response;
};

// 일자리 신청 비활성화
export const workApplicationInactive = async () => {
  const response = await axiosInstance.post(
    '/caregiver/work-application/inactive',
  );
  return response;
};

// 로그아웃
export const useCaregiverLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put('/caregiver/logout');
      return response;
    },
    onSuccess: (response) => {
      console.log('useCaregiverLogout - 요양보호사 로그아웃 성공:', response);
      queryClient.clear();
    },
    onError: (error) => {
      console.error('useCaregiverLogout - 요양보호사 로그아웃 실패:', error);
    },
  });
};

// 회원탈퇴
export const useDeleteCaregiver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete('/caregiver/leave');
      return response;
    },
    onSuccess: () => {
      console.log('useDeleteCaregiver - 요양보호사 탈퇴 성공');
      queryClient.clear();
    },
    onError: (error) => {
      console.error('useDeleteCaregiver - 요양보호사 탈퇴 실패:', error);
    },
  });
};

/* 일자리 */
// 매칭 공고 리스트 조회
export const useRecruitmentListQuery = () => {
  return useQuery<MatchingListResponse, Error>({
    queryKey: ['caregiverWorkList'],
    queryFn: async () => {
      const response = await axiosInstance.get('/matching/caregiver/list');
      return response.data;
    },
  });
};

// 매칭 공고 상세 조회
export const useRecruitmentDetailQuery = (recruitmentId: number) => {
  return useQuery<MatchingRecruitmentResponse, Error>({
    queryKey: ['caregiverRecruitmentDetail', recruitmentId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/matching/caregiver/recruitment/${recruitmentId}`,
      );
      return response.data;
    },
    enabled: !!recruitmentId,
  });
};

// 매칭 공고 거절
export const postReject = async (recruitmentId: number) => {
  const response = await axiosInstance.post(
    `/matching/caregiver/recruitment/${recruitmentId}/reject`,
  );
  return response;
};

// 매칭 공고 지원
export const postApply = async (recruitmentId: number) => {
  const response = await axiosInstance.post(
    `/matching/caregiver/recruitment/${recruitmentId}/apply`,
  );
  return response;
};

// 근무 조건 조율
export const postMediate = async (
  recruitmentId: number,
  mediateData: MatchingRecruitmentMediateRequest,
) => {
  const response = await axiosInstance.post(
    `/matching/caregiver/recruitment/${recruitmentId}/mediate`,
    mediateData,
  );
  return response;
};

/* 지원현황 */
// 지원 현황 조회
export const useApplicationListQuery = (activeTab: string) => {
  return useQuery<MatchingMyRecruitmentResponse, Error>({
    queryKey: ['caregiverApplicationList', activeTab],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/matching/caregiver/my/recruitment',
        {
          params: {
            matchingApplicationStatus: activeTab,
          },
        },
      );
      return response.data;
    },
  });
};

// 지원 현황 상세 조회
export const useApplicationDetailQuery = (recruitmentId: number) => {
  return useQuery<MatchingMyRecruitmentDetailResponse, Error>({
    queryKey: ['caregiverApplicationDetail', recruitmentId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/matching/caregiver/my/recruitment/${recruitmentId}`,
      );
      return response.data;
    },
    enabled: !!recruitmentId,
  });
};

/* 채팅 */
// 요양보호사 채팅 목록
export const useGetCaregiverChatList = () =>
  useQuery<CaregiverChatListResponse>({
    queryKey: ['caregiverChatList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/chat/caregiver/list');
      return data;
    },
  });

// 요양보호사 채팅 데이터 조회
export const useGetCaregiverChat = (matchingId: number) =>
  useQuery<CaregiverChatResponse>({
    queryKey: ['caregiverChat', matchingId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/chat/caregiver?matchingId=${matchingId}`,
      );
      return data;
    },
  });

// 계약서를 기반으로 매칭 확정
export const usePostCaregiverContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: {
      contractId: number;
      matchingId: number;
      recruitmentId: number;
    }) => {
      const response = await axiosInstance.post(
        `/chat/caregiver/contract/${variables.contractId}/confirm`,
      );
      return response;
    },
    onSuccess: (_, variables) => {
      const { matchingId, recruitmentId } = variables;
      console.log('usePostCaregiverContract - 요양보호사 매칭 성공:');
      queryClient.invalidateQueries({
        queryKey: ['caregiverCompletedMatchingList'],
      });
      queryClient.invalidateQueries({ queryKey: ['caregiverWorkList'] });
      queryClient.invalidateQueries({ queryKey: ['caregiverApplicationList'] });
      queryClient.invalidateQueries({
        queryKey: ['caregiverApplicationDetail', recruitmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ['caregiverChat', matchingId],
      });
      queryClient.invalidateQueries({ queryKey: ['caregiverChatList'] });
      queryClient.invalidateQueries({ queryKey: ['caregiverHomeInfo'] });
    },
    onError: (error) => {
      console.error('usePostCaregiverContract - 요양보호사 매칭 실패:', error);
    },
  });
};
