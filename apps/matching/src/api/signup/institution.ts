import { axiosInstance, InstitutionInfo } from '@repo/common';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const searchInstitution = async (
  name: string,
): Promise<InstitutionInfo[]> => {
  const { data } = await axiosInstance.get<InstitutionInfo[]>(
    '/nursingInstitution/search',
    { params: { nursingInstitutionName: name } },
  );
  return data ?? [];
};

export const useSearchInstitution = (
  name: string,
  options?: Omit<
    UseQueryOptions<InstitutionInfo[], unknown>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<InstitutionInfo[], unknown>({
    queryKey: ['searchInstitution', name],
    queryFn: () => searchInstitution(name),
    enabled: !!name,
    ...options,
  });
};
