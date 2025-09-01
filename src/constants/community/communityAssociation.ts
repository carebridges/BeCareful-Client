export const COMMUNITY_ACCESS_STATUS = [
  'ALREADY_APPROVED',
  'APPROVED',
  'REJECTED',
  'PENDING',
  'NOT_APPLIED',
] as const;

export type CommunityAccessStatusValue =
  (typeof COMMUNITY_ACCESS_STATUS)[number];

export const COMMUNITY_ACCESS_SESSION_KEYS: Partial<
  Record<CommunityAccessStatusValue, string>
> = {
  REJECTED: 'rejectedModalShown',
  PENDING: 'pendingModalShown',
  APPROVED: 'approvedModalShown',
};
