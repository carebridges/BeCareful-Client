import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currentUserInfo } from '@/recoil/currentUserInfo';
import { fetchUserInfo } from '@/api/userInfo';

export const useLoadUserInfo = () => {
  const [searchParams] = useSearchParams();
  const userKey = searchParams.get('userKey');
  const setUserInfo = useSetRecoilState(currentUserInfo);

  useEffect(() => {
    if (!userKey) return;

    fetchUserInfo(userKey)
      .then((data) => {
        setUserInfo({
          realName: data.realName,
          nickName: data.nickName,
        });
      })
      .catch((err) => {
        console.error('사용자 정보 조회 실패:', err);
      });
  }, [userKey, setUserInfo]);
};
