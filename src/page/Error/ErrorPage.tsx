import { styled } from 'styled-components';
import { ReactComponent as ErrorIcon } from '@/assets/icons/Error.svg';
import { Button } from '@/components/common/Button/Button';

export const ErrorPage = () => {
  const handleGoBackAndReload = () => {
    window.history.back();

    const onPopState = () => {
      window.location.reload();
      window.removeEventListener('popstate', onPopState);
    };

    window.addEventListener('popstate', onPopState);
  };

  return (
    <PageLayout>
      <ErrorIcon />

      <Labels>
        <Title>오류가 발생하였습니다</Title>
        <Description>
          불편을 드려 죄송합니다.
          <br />
          잠시 후 다시 이용해 주시기 바랍니다.
        </Description>
      </Labels>

      <Bottom>
        <Button
          variant="mainBlue"
          height="52px"
          onClick={handleGoBackAndReload}
        >
          이전 화면으로
        </Button>
      </Bottom>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  margin: 0 20px;
  margin-top: -56px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Labels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Bottom = styled.div`
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;
