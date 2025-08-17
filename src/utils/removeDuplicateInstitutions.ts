import { Institution } from '@/types/SocialSignUp';

export function removeDuplicateInstitutions(
  list: (Institution & {
    address?: string;
    siDoCd?: number;
    siGunGuCd?: number;
  })[],
) {
  const seen = new Set<string>();
  return list.filter((inst) => {
    const key = `${inst.institutionId}-${inst.siDoCd ?? ''}-${inst.siGunGuCd ?? ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
