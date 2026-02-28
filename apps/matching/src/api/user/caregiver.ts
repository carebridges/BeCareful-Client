import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CareerInfo,
  CareerRequest,
  CaregiverHomeResponse,
  CaregiverProfileRequest,
  CaregiverProfileResponse,
} from '@/types/caregiver';
import {
  WorkApplicationRequest,
  WorkApplicationResponse,
} from '@/types/matching';
import { axiosInstance, InstitutionInfo } from '@repo/common';

// ==================== 홈 ====================
/* 요양보호사 홈 화면 구성 데이터 조회 */
export const useCaregiverHome = () => {
  return useQuery<CaregiverHomeResponse>({
    queryKey: ['caregiverHome'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/home');
      return response.data;
    },
  });
};

// ==================== 마이페이지 ====================
/* 요양보호사 마이페이지 홈 화면 데이터 조회 */
export const useCaregiverProfile = () => {
  return useQuery<CaregiverProfileResponse>({
    queryKey: ['caregiverProfile'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/my');
      return response.data;
    },
  });
};

/* 요양보호사 마이페이지 수정 */
export const useUpdateCaregiverProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: CaregiverProfileRequest) => {
      const response = await axiosInstance.put('/caregiver/my', profileData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caregiverProfile'] });
      queryClient.invalidateQueries({ queryKey: ['caregiverHome'] });
    },
  });
};

/* 경력서 조회 */
export const useCareer = () => {
  return useQuery<CareerInfo>({
    queryKey: ['caregiverCareer'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/career');
      return response.data;
    },
  });
};

/* 경력서 등록/수정 */
export const useUpdateCareer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (career: CareerRequest) => {
      const response = await axiosInstance.put('/caregiver/career', career);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caregiverCareer'] });
      queryClient.invalidateQueries({ queryKey: ['caregiverProfile'] });
    },
  });
};

/* 신청서 조회 */
export const useWorkApplication = () => {
  return useQuery<WorkApplicationResponse>({
    queryKey: ['caregiverApplication'],
    queryFn: async () => {
      const response = await axiosInstance.get('/caregiver/work-application');
      return response.data;
    },
  });
};

/* 신청서 등록 */
export const useUpdateWorkApplication = (options?: {
  onSuccessCallback?: (dataExists: boolean) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: WorkApplicationRequest) => {
      const response = await axiosInstance.put(
        '/caregiver/work-application',
        application,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['caregiverApplication'],
      });
      const dataExists = !!queryClient.getQueryData(['caregiverApplication']);
      options?.onSuccessCallback?.(dataExists);
    },
  });
};

/* 일자리 신청 활성화 */
export const workApplicationActive = async () => {
  const response = await axiosInstance.post(
    '/caregiver/work-application/active',
  );
  return response;
};

/* 일자리 신청 비활성화 */
export const workApplicationInactive = async () => {
  const response = await axiosInstance.post(
    '/caregiver/work-application/inactive',
  );
  return response;
};

/* 요양보호사 차단 기관 리스트 조회 */
export const useCaregiverBlockedInstitution = () => {
  return useQuery<InstitutionInfo[]>({
    queryKey: ['caregiverBlocked'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        '/caregiver/my/blocked-institution',
      );
      return response.data;
    },
  });
};

/* 요양보호사 기관 차단 해제 */
export const useUnblockInstitution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (institutionId: number) => {
      await axiosInstance.delete(
        `/caregiver/my/blocked-institution/${institutionId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['caregiverBlocked'],
      });
    },
  });
};
