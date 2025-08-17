import { SI_DO_MAP, SI_GUN_GU_MAP } from '@/constants/sidogungu';

export const getAddressFromPublicApi = (siDoCd: number, siGunGuCd: number) => {
  const sido = SI_DO_MAP[siDoCd] || '';
  const sigungu = SI_GUN_GU_MAP[`${siDoCd}-${siGunGuCd}`] || '';
  return `${sido} ${sigungu}`.trim();
};
