import { ReactComponent as ArrowTypeA } from '@/assets/icons/ArrowTypeA.svg';
import { ReactComponent as ArrowTypeB } from '@/assets/icons/ArrowTypeB.svg';
import { ReactComponent as ArrowTypeC } from '@/assets/icons/ArrowTypeC.svg';
import { ReactComponent as ArrowTypeD } from '@/assets/icons/ArrowTypeD.svg';

export const CAREGIVER_TOUR_STEPS = [
  {
    target: '.cg-home',
    content: (
      <div>
        <span>구직 현황</span>과 <span>돌봄 일정</span>을
        <br />
        확인할 수 있어요.
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '.cg-home-main',
    content: (
      <div>
        <span>지원서</span>와 <span>경력서</span>를 작성해보세요!
        <br />
        기관에서 먼저 연락이 올 수 있어요.
      </div>
    ),
    data: {
      next: '/caregiver/work',
    },
  },

  {
    target: '.cg-work',
    content: (
      <div>
        <span>내 주변 일자리</span>를
        <br />
        찾아볼 수 있어요.
      </div>
    ),
  },
  {
    target: '.cg-work-main',
    content: (
      <div>
        나에게 딱 맞는 <span>일자리</span>를 찾아보세요!
        <br />
        원하는 공고를 누르면 바로 지원할 수 있어요.
      </div>
    ),
    data: {
      previous: '/caregiver',
      next: '/caregiver/apply',
    },
  },

  {
    target: '.cg-apply',
    content: (
      <div>
        <span>지원 현황</span>을 확인하는 곳이에요.
      </div>
    ),
  },
  {
    target: '.cg-apply-main',
    content: (
      <div>
        <span>지원 현황</span>을 확인하세요!
        <br />
        합격 소식은 여기서 확인할 수 있어요.
      </div>
    ),
    data: {
      previous: '/caregiver/work',
      next: '/caregiver/my',
    },
  },

  {
    target: '.cg-profile',
    content: (
      <div>
        <span>내 정보</span>를 수정할 수 있어요.
      </div>
    ),
  },
];

export const CAREGIVER_STEP_CONFIG = {
  0: {
    type: 'row',
    arrow: <ArrowTypeA />,
    arrowPos: 'left',
    withMargin: true,
    boxed: true,
  },
  1: {
    type: 'row',
    arrow: <ArrowTypeD />,
    arrowPos: 'left',
    withMargin: false,
    boxed: false,
  },
  2: {
    type: 'col',
    arrow: <ArrowTypeB />,
    arrowPos: 'bottom',
    withMargin: false,
    boxed: true,
  },
  3: {
    type: 'row',
    arrow: null,
    arrowPos: 'none',
    withMargin: false,
    boxed: false,
  },
  4: {
    type: 'col',
    arrow: <ArrowTypeB />,
    arrowPos: 'bottom',
    withMargin: false,
    boxed: true,
  },
  5: {
    type: 'row',
    arrow: <ArrowTypeD />,
    arrowPos: 'left',
    withMargin: false,
    boxed: false,
  },
  6: {
    type: 'row',
    arrow: <ArrowTypeC />,
    arrowPos: 'right',
    withMargin: true,
    boxed: true,
  },
};

export const SOCAILWORKER_TOUR_STEPS = [
  {
    target: '.sw-home',
    content: (
      <div>
        우리 기관의 <span>매칭 현황</span>을
        <br />
        확인할 수 있어요!
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '.sw-home-main',
    content: (
      <div>
        <span>매칭 현황</span>을 한눈에 보세요!
        <br />
        지원자 수와 매칭 진행 상황을 알려드려요.
      </div>
    ),
    data: {
      next: '/socialworker/match/social',
    },
  },

  {
    target: '.sw-matching',
    content: (
      <div>
        <span>어르신 등록</span>과 <span>구인 공고</span>를
        <br />
        올리는 곳이에요.
      </div>
    ),
  },
  {
    target: '.sw-matching-main',
    content: (
      <div>
        어르신과 공고를 등록하세요.
        <br />
        여기를 눌러 <span>구인 공고</span>를 올릴 수 있어요.
      </div>
    ),
    data: {
      previous: '/socialworker',
      next: '/socialworker/my',
    },
  },

  // {
  //   target: '.sw-community',
  //   content: (
  //     <div>
  //       <span>공지사항</span>과 <span>다양한 정보</span>를
  //       <br />
  //       확인할 수 있어요.
  //     </div>
  //   ),
  //   data: {
  //     previous: '/socialworker/match/social',
  //   },
  // },
  // {
  //   target: '.sw-community-main1',
  //   content: (
  //     <div>
  //       <span>돌봄다리 커뮤니티</span>에 오신 걸 환영해요!
  //       <br />
  //       전국 종사자들과 소통하고 정보를 나눠보세요.
  //     </div>
  //   ),
  // },
  // {
  //   target: '.sw-community-main2',
  //   content: (
  //     <div>
  //       협회에 가입하셨나요?
  //       <br />
  //       <span>내 협회 커뮤니티</span>를 찾아보세요.
  //     </div>
  //   ),
  //   data: {
  //     next: '/socialworker/my',
  //   },
  // },

  {
    target: '.sw-profile',
    content: (
      <div>
        <span>기관 정보</span>를 수정할 수 있어요.
      </div>
    ),
  },
];

export const SOCAILWORKER_STEP_CONFIG = {
  0: {
    type: 'row',
    arrow: <ArrowTypeA />,
    arrowPos: 'left',
    withMargin: true,
    boxed: true,
  },
  1: {
    type: 'row',
    arrow: <ArrowTypeD />,
    arrowPos: 'left',
    withMargin: false,
    boxed: false,
  },
  2: {
    type: 'col',
    arrow: <ArrowTypeB />,
    arrowPos: 'bottom',
    withMargin: false,
    boxed: true,
  },
  3: {
    type: 'col',
    arrow: <ArrowTypeD />,
    arrowPos: 'bottom',
    withMargin: false,
    boxed: false,
  },
  // 4: {
  //   type: 'col',
  //   arrow: <ArrowTypeB />,
  //   arrowPos: 'bottom',
  //   withMargin: false,
  //   boxed: true,
  // },
  // 5: {
  //   type: 'row',
  //   arrow: null,
  //   arrowPos: 'left',
  //   withMargin: false,
  //   boxed: false,
  // },
  // 6: {
  //   type: 'row',
  //   arrow: <ArrowTypeB />,
  //   arrowPos: 'right',
  //   withMargin: true,
  //   boxed: false,
  // },
  4: {
    type: 'row',
    arrow: <ArrowTypeC />,
    arrowPos: 'right',
    withMargin: true,
    boxed: true,
  },
};
