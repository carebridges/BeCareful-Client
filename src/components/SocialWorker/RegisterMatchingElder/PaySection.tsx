import styled from 'styled-components';
import { MatchingApplicationDropdown } from '@/components/Matching/MatchingApplicationDropdown';
import {
  PAY_CODE_TO_LABEL,
  PAY_LABEL_TO_CODE,
} from '@/constants/socialworker/payType.socialWorker';
import { PayCode, PayLabel } from '@/types/Matching.socialWorker';

interface Props {
  selectedPayType: PayCode;
  onPayTypeChange: (value: PayCode) => void;
  payAmount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PaySection = ({
  selectedPayType,
  onPayTypeChange,
  payAmount,
  onAmountChange,
}: Props) => {
  const payLabels: PayLabel[] = ['시급', '일급', '월급', '연봉'];
  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle color="">희망 급여</SectionTitle>
        <SectionTitle color="blue">*</SectionTitle>
      </SectionTitleWrapper>

      <PayWrapper>
        <MatchingApplicationDropdown
          title="시급"
          contents={payLabels}
          selectedContents={PAY_CODE_TO_LABEL[selectedPayType]}
          setSelectedContents={(label: string) => {
            if (label in PAY_LABEL_TO_CODE) {
              onPayTypeChange(PAY_LABEL_TO_CODE[label as PayLabel]);
            }
          }}
        />

        <PayFieldWrapper>
          <PayField
            id="pay"
            type="number"
            placeholder="금액입력"
            value={payAmount}
            onChange={onAmountChange}
          />
          <PayCount>원</PayCount>
        </PayFieldWrapper>
      </PayWrapper>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 40px 20px 0px 20px;
  gap: 8px;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

const SectionTitle = styled.label<{ color: string }>`
  color: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const PayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
`;

const PayFieldWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const PayField = styled.input`
  width: 100%;
  height: 22px;
  padding: 13px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};
  resize: none;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 140%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: 140%;
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const PayCount = styled.label`
  position: absolute;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 140%;
  right: 16px;
  top: 14px;
`;
