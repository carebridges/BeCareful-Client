import { useEffect, useMemo, useState } from 'react';
import { Institution } from '@/types/SocialSignUp';
import { SI_DO_MAP } from '@/constants/sidogungu';
import {
  fetchInstitutionsBySiDo,
  mapPublicApiDtoToInstitution,
} from '@/api/institutionFunnel';
import { removeDuplicateInstitutions } from '@/utils/removeDuplicateInstitutions';

export const useAllInstitutions = () => {
  const [institutions, setInstitutions] = useState<
    (Institution & { address?: string })[]
  >([]);
  const siDoCodes = useMemo(() => Object.keys(SI_DO_MAP), []);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const results = await Promise.all(siDoCodes.map(fetchInstitutionsBySiDo));
      const flat = results
        .flat()
        .map(mapPublicApiDtoToInstitution)
        .filter(Boolean) as (Institution & {
        address?: string;
        siDoCd?: number;
        siGunGuCd?: number;
      })[];

      const unique = removeDuplicateInstitutions(flat);

      if (alive) setInstitutions(unique);
    };
    load();
    return () => {
      alive = false;
    };
  }, [siDoCodes]);

  return institutions;
};
