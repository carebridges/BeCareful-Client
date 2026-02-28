import styled from 'styled-components';
import { ReactComponent as Icon } from '@repo/ui/src/assets/icons/NoContent.svg';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { Button } from '@repo/ui';

const ChatListEmpty = ({ isCaregiver }: { isCaregiver: boolean }) => {
  const { handleNavigate } = useHandleNavigate();
  const navigatePath = isCaregiver
    ? '/caregiver/work'
    : '/socialworker/match/social';

  return (
    <Container>
      <Wrapper>
        <Icon />
        <div className="nochat">아직 채팅 내역이 없어요.</div>
        <div className="navigate">
          {isCaregiver ? '일자리' : '매칭'} 페이지로 이동하여
          <br />
          공고를 살펴보고 근무를 {isCaregiver ? '지원' : '제안'}해 보세요!
        </div>
      </Wrapper>
      <Button
        height="52px"
        variant={'subBlue'}
        onClick={() => handleNavigate(navigatePath)}
      >
        {isCaregiver ? '일자리로' : '매칭으로'} 이동하기
      </Button>
    </Container>
  );
};

export default ChatListEmpty;

const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;

  .nochat {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .navigate {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    text-align: center;
  }
`;
