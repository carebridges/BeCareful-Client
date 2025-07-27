import { PostDetailResponse } from '@/types/Community/post';
import { useEffect, useRef, useState } from 'react';

export const usePostings = (initialData?: PostDetailResponse) => {
  // 필독 여부
  const [isImportant, setIsImportant] = useState(
    initialData?.isImportant ?? true,
  );
  const handleToggleChange = () => {
    setIsImportant((prev) => !prev);
  };

  // 게시글 제목
  const [title, setTitle] = useState(initialData?.title ?? '');
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 게시글 내용
  const [content, setContent] = useState(initialData?.content ?? '');
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // 게시글 내용 height 조정
  const contentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      const textarea = contentRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  // 링크 첨부
  const [originalUrl, setOriginalUrl] = useState(
    initialData?.originalUrl ?? '',
  );
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
  };

  return {
    isImportant,
    title,
    content,
    contentRef,
    originalUrl,
    setIsImportant,
    setTitle,
    setContent,
    setOriginalUrl,
    handleToggleChange,
    handleTitleChange,
    handleContentChange,
    handleUrlChange,
  };
};
