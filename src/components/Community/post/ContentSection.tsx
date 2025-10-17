import styled from 'styled-components';
import React, { useState } from 'react';
import { ReactComponent as ModalClose } from '@/assets/icons/signup/ModalClose.svg';
import Modal from '@/components/common/Modal/Modal';
import { PostDetailResponse } from '@/types/Community/post';

interface TitleSectionProps {
  post: PostDetailResponse | undefined;
  onFileDownload: (url: string) => void;
}

const ContentSection = ({ post, onFileDownload }: TitleSectionProps) => {
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const openImgModal = (url: string) => {
    setIsImgModalOpen(true);
    setImgUrl(url);
  };

  const closeImgModal = () => {
    setIsImgModalOpen(false);
    setImgUrl('');
  };

  return (
    <div>
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
        {post?.originalUrl && <MediaBox>{post?.originalUrl}</MediaBox>}
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
                onClick={() => openImgModal(image.mediaUrl)}
              />
            ))}
          {post?.videoList &&
            post?.videoList.map((video) => (
              <video key={video.id} src={video.mediaUrl} controls />
            ))}
        </MediaWrapper>
      </ContentWrapper>

      <Modal isOpen={isImgModalOpen} onClose={closeImgModal}>
        <ModalWrapper>
          <ModalXImg onClick={closeImgModal} />
          <img src={imgUrl} alt="게시글 이미지 상세보기" />
        </ModalWrapper>
      </Modal>
    </div>
  );
};

export default ContentSection;

const Files = styled.div`
  padding: 14px 0px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: start;
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
  gap: 14px;

  span {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const MediaBox = styled.div`
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  // .file {
  //   display: flex;
  //   gap: 8px;
  //   align-items: center;
  //   color: ${({ theme }) => theme.colors.black};
  // }
`;

const MediaWrapper = styled.div`
  margin-top: 14px;

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
    // object-fit: cover;
  }

  img {
    cursor: pointer;
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  background: ${({ theme }) => theme.colors.white};
  width: 320px;
  border-radius: 12px;
  // padding: 56px 20px 20px 20px;
`;

const ModalXImg = styled(ModalClose)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;
