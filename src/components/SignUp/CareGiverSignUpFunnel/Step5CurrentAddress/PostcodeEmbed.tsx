import { useDaumPostcode } from '@/hooks/SignUp/usePostcodeLoader';
import { PostcodeData } from '@/types/daum-postcode';
import { useRef, useEffect } from 'react';
import { styled } from 'styled-components';

type Props = {
  open: boolean;
  onClose: () => void;
  onComplete: (data: PostcodeData) => void;
};

export const PostcodeModal = ({ open, onClose, onComplete }: Props) => {
  const ready = useDaumPostcode();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !ready || !boxRef.current || !window.daum?.Postcode) return;

    const id = requestAnimationFrame(() => {
      const pc = new window.daum!.Postcode({
        oncomplete: (data: PostcodeData) => {
          onComplete(data);
          onClose();
        },
      });
      pc.embed(boxRef.current!, { autoClose: true });
    });

    return () => {
      cancelAnimationFrame(id);
      if (boxRef.current) boxRef.current.innerHTML = '';
    };
  }, [open, ready, onComplete, onClose]);

  if (!open) return null;

  return (
    <Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <EmbedBox ref={boxRef} />
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: min(92vw, 510px);
  height: clamp(420px, 70dvh, 500px);
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  position: relative;
  display: flex;
  padding: 5px 10px 0px 10px;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const EmbedBox = styled.div`
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }

  & > iframe {
    width: calc(100% - 2px) !important;
    height: calc(100% - 2px) !important;
    margin: 1px 0 0 1px !important;
    display: block;
  }
`;
