import { PostDetailResponse } from '@/types/Community/post';
import { useEffect, useRef, useState } from 'react';

export const usePostings = (initialData?: PostDetailResponse) => {
  const [isImportant, setIsImportant] = useState(
    initialData?.isImportant ?? true,
  );
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [originalUrl, setOriginalUrl] = useState(
    initialData?.originalUrl ?? '',
  );

  useEffect(() => {
    if (initialData) {
      setIsImportant(initialData.isImportant ?? true);
      setTitle(initialData.title ?? '');
      setContent(initialData.content ?? '');
      setOriginalUrl(initialData.originalUrl ?? '');
    } else {
      setIsImportant(true);
      setTitle('');
      setContent('');
      setOriginalUrl('');
    }
  }, [initialData]);

  const handleToggleChange = () => {
    setIsImportant((prev) => !prev);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

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

  const [isUrlChanged, setIsUrlChanged] = useState(false);
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
    setIsUrlChanged(true);
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
    isUrlChanged,
    setIsUrlChanged,
  };
};
