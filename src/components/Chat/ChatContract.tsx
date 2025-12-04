import styled from 'styled-components';
import { ContractChatResponse } from '@/types/common/chat';
import { formatCaretype, formatDaysToKR } from '@/utils/caregiverFormatter';
import InfoDisplayChat from '../common/InfoDisplay/InfoDisplayChat';

interface ChatContractProps {
  contract: ContractChatResponse;
  elderName: string;
  caregiverName?: string;
  caregiverPhoneNumber?: string;
  role: string;
}

const ChatContract = ({
  contract,
  elderName,
  caregiverName,
  caregiverPhoneNumber,
  role,
}: ChatContractProps) => {
  const contractInfo =
    role === 'CAERGIVER'
      ? [
          {
            title: '인적사항',
            detail: `${elderName}`,
          },
          {
            title: '케어항목',
            detail: formatCaretype(contract.careTypes, 2),
          },
          {
            title: '근무요일',
            detail: formatDaysToKR(contract.workDays),
          },
          {
            title: '근무시간',
            detail: `${contract.workStartTime} ~ ${contract.workEndTime}`,
          },
          {
            title: '급여',
            detail: `${contract.workSalaryAmount.toLocaleString('ko-KR')}원`,
          },
          {
            title: '근무시작',
            detail: contract.workStartDate.replaceAll('-', '.'),
          },
        ]
      : [
          {
            title: '인적사항',
            detail: `${elderName}`,
          },
          {
            title: '케어항목',
            detail: formatCaretype(contract.careTypes, 2),
          },
          {
            title: '근무요일',
            detail: formatDaysToKR(contract.workDays),
          },
          {
            title: '근무시간',
            detail: `${contract.workStartTime} ~ ${contract.workEndTime}`,
          },
          {
            title: '급여',
            detail: `${contract.workSalaryAmount.toLocaleString('ko-KR')}원`,
          },
          {
            title: '근무시작',
            detail: contract.workStartDate.replaceAll('-', '.'),
          },
          {
            title: '근무자',
            detail: caregiverName,
          },
          {
            title: '근무자 번호',
            detail: caregiverPhoneNumber,
          },
        ];

  return (
    <Container role={role}>
      <div className="contract">
        {role === 'CAERGIVER'
          ? '근무 조건에 동의했습니다'
          : '근무 제안이 전송되었습니다.'}
      </div>
      <InfoDisplayChat items={contractInfo} role={role} />
    </Container>
  );
};

export default ChatContract;

const Container = styled.div<{ role: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .contract {
    color: ${({ theme, role }) =>
      role === 'CAREGIVER' ? theme.colors.white : theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;
