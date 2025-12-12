import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

// 읽음 상태 저장할 타입(id, 읽음 여부)
type ReadStatusMap = Record<number, boolean>;

// Context에 제공될 값의 타입
interface RecruitmentReadStatusContextType {
  readStatuses: ReadStatusMap;
  markAsRead: (recruitmentId: number) => void;
}

// Context 생성
const RecruitmentReadStatusContext = createContext<
  RecruitmentReadStatusContextType | undefined
>(undefined);

interface RecruitmentReadStatusProviderProps {
  children: ReactNode;
}

// 게시글 읽음 상태 관리하고 하위 컴포넌트에 제공
export const RecruitmentReadStatusProvider: React.FC<
  RecruitmentReadStatusProviderProps
> = ({ children }) => {
  // 게시글 ID를 키로, 읽음 여부를 값으로 하는 상태 맵
  const [readStatuses, setReadStatuses] = useState<Record<number, boolean>>(
    () => {
      const stored = localStorage.getItem('recruitmentReadStatuses');
      return stored ? JSON.parse(stored) : {};
    },
  );

  // 게시글을 읽음으로 표시하는 함수
  const markAsRead = useCallback((recruitmentId: number) => {
    setReadStatuses((prevStatuses) => {
      const updated = {
        ...prevStatuses,
        [recruitmentId]: true,
      };
      localStorage.setItem('recruitmentReadStatuses', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <RecruitmentReadStatusContext.Provider value={{ readStatuses, markAsRead }}>
      {children}
    </RecruitmentReadStatusContext.Provider>
  );
};

// Context 사용할 훅
export const useRecruitmentReadStatus = () => {
  const context = useContext(RecruitmentReadStatusContext);
  if (!context) {
    throw new Error(
      'useWorkReadStatus must be used within a WorkReadStatusProvider',
    );
  }
  return context;
};
