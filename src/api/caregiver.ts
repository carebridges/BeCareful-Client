import { axiosInstance } from '@/api/axiosInstance';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CaregiverHomeResponse } from '@/types/Caregiver/home';
import {
  CareerRequest,
  CareerResponse,
  CaregiverMyRequest,
  CaregiverMyResponse,
} from '@/types/Caregiver/mypage';
import {
  WorkApplicationRequest,
  WorkApplicationResponse,
} from '@/types/Caregiver/work';
import { MarketingAgreeInfo } from '@/types/Socialworker/mypage';
import { InstitutionInfo } from '@/types/common/institutionInfo';

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

// 요양보호사 마케팅 동의 여부 조회
export const useGetCaregiverMarketingInfo = (enabled: boolean) => {
  return useQuery<MarketingAgreeInfo, Error>({
    queryKey: ['caregiverMarketingInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/my/setting');
      return response.data;
    },
    enabled: enabled,
  });
};

// 요양보호사 마케팅 동의 여부 수정
export const usePatchCaregiverMarketingInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (associationInfo: MarketingAgreeInfo) => {
      const response = await axiosInstance.patch(
        '/caregiver/my/marketing-info-receiving-agreement',
        associationInfo,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['caregiverMarketingInfo'],
      });
    },
    onError: (error) => {
      console.error('요양보호사 마케팅 동의 여부 변경 실패', error);
    },
  });
};

// 요양보호사 차단 기관 리스트 조회
export const useGetCaregiverBlock = () => {
  return useQuery<InstitutionInfo[]>({
    queryKey: ['caregiverBlockInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/caregiver/my/blocked-institution',
      );
      return response.data;
    },
  });
};

// 요양보호사 기관 차단 해제
export const useDeleteCaregiverBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (institutionId: number) => {
      await axiosInstance.delete(
        `/caregiver/my/blocked-institution/${institutionId}`,
      );
    },
    onSuccess: () => {
      console.log('요양보호사 기관 차단 해제 성공');
      queryClient.invalidateQueries({
        queryKey: ['caregiverBlockInfo'],
      });
    },
    onError: (error) => {
      console.error('요양보호사 기관 차단 해제 실패:', error);
    },
  });
};

// 로그아웃
export const useCaregiverLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put('/caregiver/logout');
      return response;
    },
    onSuccess: (response) => {
      console.log('useCaregiverLogout - 요양보호사 로그아웃 성공:', response);
    },
    onError: (error) => {
      console.error('useCaregiverLogout - 요양보호사 로그아웃 실패:', error);
    },
  });
};

// 회원탈퇴
export const useDeleteCaregiver = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete('/caregiver/leave');
      return response;
    },
    onSuccess: () => {
      console.log('useDeleteCaregiver - 요양보호사 탈퇴 성공');
    },
    onError: (error) => {
      console.error('useDeleteCaregiver - 요양보호사 탈퇴 실패:', error);
    },
  });
};
