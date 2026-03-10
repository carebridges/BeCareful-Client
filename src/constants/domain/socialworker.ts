import { ReactComponent as Home } from '@/assets/icons/tabbar/Home.svg';
import { ReactComponent as Matching } from '@/assets/icons/tabbar/Matching.svg';
import { ReactComponent as Mypage } from '@/assets/icons/tabbar/Mypage.svg';

export const SOCIAL_WORKER_TAB = [
  {
    key: 'home',
    path: '/socialworker',
    label: '홈',
    Icon: Home,
    className: 'sw-home',
  },
  {
    key: 'matching',
    path: '/socialworker/match/social',
    label: '매칭하기',
    Icon: Matching,
    className: 'sw-matching',
  },
  {
    key: 'mypage',
    path: '/socialworker/my',
    label: '마이페이지',
    Icon: Mypage,
    className: 'sw-profile',
  },
] as const;
