import styled from 'styled-components';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { Button } from '@/components/common/Button/Button';
import { formatCaretype, formatDaysToKR } from '@/utils/caregiverFormatter';
import { GENDER_EN_TO_KR_2 } from '@/constants/common/gender';
import { Contract } from '@/types/Common/chat';
import { ElderlyDetail } from '@/types/Socialworker/common';

interface ChatCardProps {
  border: string;
  title: string;
  name: string;
  items: Contract;
  hasButton?: boolean;
  buttonContent?: string;
  buttonClick: () => void;
  isSocialworker?: boolean;
  elder?: ElderlyDetail;
}

const ChatCard = ({
  border,
  title,
  name,
  items,
  hasButton,
  buttonContent,
  buttonClick,
  isSocialworker,
  elder,
}: ChatCardProps) => {
  const chatInfo = [
    ...(isSocialworker
      ? [
          {
            title: '성함/연령',
            detail: elder
              ? `${elder?.elderlyName} ${elder?.elderlyAge}세 ${GENDER_EN_TO_KR_2[elder?.elderlyGender]}`
              : '정보 없음',
          },
        ]
      : []),
    { title: '케어항목', detail: formatCaretype(items.careTypes ?? [], 1) },
    { title: '근무요일', detail: formatDaysToKR(items.workDays ?? []) },
    {
      title: '근무시간',
      detail: `${items.workStartTime} ~ ${items.workEndTime}`,
    },
    {
      title: '급여',
      detail: `${items.workSalaryAmount.toLocaleString('ko-KR')}원`,
    },
    { title: '근무시작', detail: items.workStartDate.replaceAll('-', '.') },
  ];

  return (
    <Container isLeftBorder={border === 'left'}>
      <div className="title">{title}</div>
      <div className="detail">
        {name} 어르신 근무 조건 확인 후<br />
        최종 승인하기 버튼을 눌러주세요.
      </div>
      <InfoDisplay items={chatInfo} gapColumn="8px" isChat={true} />
      {hasButton && (
        <Button height="40px" variant="subBlue" onClick={buttonClick}>
          {buttonContent}
        </Button>
      )}
    </Container>
  );
};

export default ChatCard;

const Container = styled.div<{ isLeftBorder: boolean }>`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ isLeftBorder }) =>
    isLeftBorder ? '0 12px 12px 12px' : '12px 0 12px 12px'};

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray800};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
