import styled from 'styled-components';
import React from 'react';
import { PostDetailResponse } from '@/types/Community/post';

interface TitleSectionProps {
  post: PostDetailResponse | undefined;
  onFileDownload: (url: string) => void;
}

const ContentSection = ({ post, onFileDownload }: TitleSectionProps) => {
  return (
    <>
      {post?.fileUList && post.fileUList.length > 0 && (
        <Files>
          {post.fileUList.map((fileUrl) => {
            const fileName = fileUrl.fileName;
            return (
              <button
                key={fileUrl.id}
                onClick={() => onFileDownload(fileUrl.mediaUrl)}
                className="file"
              >
                {fileName}
              </button>
            );
          })}
        </Files>
      )}

      <ContentWrapper>
        <div>
          {(post?.content ?? '').split('\n').map((line, index, arr) => (
            <React.Fragment key={index}>
              <span>{line}</span>
              {index < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        <MediaWrapper>
          {post?.imageList &&
            post?.imageList.map((image, index) => (
              <img
                key={image.id}
                src={image.mediaUrl}
                alt={`게시글 이미지 ${index + 1}`}
              />
            ))}
          {post?.videoList &&
            post?.videoList.map((video) => (
              <video key={video.id} src={video.mediaUrl} controls />
            ))}
        </MediaWrapper>
      </ContentWrapper>
    </>
  );
};

export default ContentSection;

const Files = styled.div`
  padding-top: 20px;
  padding-bottom: 14px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
  overflow-x: hidden;

  .file {
    color: ${({ theme }) => theme.colors.mainBlue};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    cursor: pointer;
    // background: transparent;
    // border: 0;
    // padding: 0;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 14px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 300px;

  span {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const MediaWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  flex-wrap: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  img,
  video {
    width: 320px;
    height: 320px;
    object-fit: contain;
  }
`;
