import { atom, AtomEffect } from 'recoil';

export interface CurrentUserInfo {
  realName: string;
  nickName: string;
}

const localStorageEffect =
  (key: string): AtomEffect<CurrentUserInfo> =>
  ({ setSelf, onSet }) => {
    if (typeof window === 'undefined') return;

    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue));
      } catch {
        /**/
      }
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const currentUserInfo = atom<CurrentUserInfo>({
  key: 'currentUserInfo',
  default: {
    realName: '',
    nickName: '',
  },
  effects: [localStorageEffect('currentUserInfo')],
});
