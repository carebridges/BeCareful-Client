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
interface PostReadStatusContextType {
  readStatuses: ReadStatusMap;
  markAsRead: (postId: number) => void;
}

// Context 생성
const PostReadStatusContext = createContext<
  PostReadStatusContextType | undefined
>(undefined);

interface PostReadStatusProviderProps {
  children: ReactNode;
}

// 게시글 읽음 상태 관리하고 하위 컴포넌트에 제공
export const PostReadStatusProvider: React.FC<PostReadStatusProviderProps> = ({
  children,
}) => {
  // 게시글 ID를 키로, 읽음 여부를 값으로 하는 상태 맵
  const [readStatuses, setReadStatuses] = useState<Record<number, boolean>>(
    () => {
      const stored = localStorage.getItem('readStatuses');
      return stored ? JSON.parse(stored) : {};
    },
  );

  // 게시글을 읽음으로 표시하는 함수
  const markAsRead = useCallback((postId: number) => {
    setReadStatuses((prevStatuses) => {
      const updated = {
        ...prevStatuses,
        [postId]: true,
      };
      localStorage.setItem('readStatuses', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <PostReadStatusContext.Provider value={{ readStatuses, markAsRead }}>
      {children}
    </PostReadStatusContext.Provider>
  );
};

// Context 사용할 훅
export const usePostReadStatus = () => {
  const context = useContext(PostReadStatusContext);
  if (!context) {
    throw new Error(
      'usePostReadStatus must be used within a PostReadStatusProvider',
    );
  }
  return context;
};
