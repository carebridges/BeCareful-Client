import styled from 'styled-components';
import { MatchingApplicationDropdown } from '@/components/Matching/MatchingApplicationDropdown';
import { SALARY_MAP } from '@/constants/common/maps';
import { WorkSalaryUnitType, WorkSalaryUnitTypeKR } from '@/types/common';

interface Props {
  selectedPayType: WorkSalaryUnitType;
  onPayTypeChange: (value: WorkSalaryUnitType) => void;
  payAmount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PaySection = ({
  selectedPayType,
  onPayTypeChange,
  payAmount,
  onAmountChange,
}: Props) => {
  const payLabels: WorkSalaryUnitTypeKR[] = ['시급', '일급', '월급', '연봉'];
  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle color="">급여</SectionTitle>
        <SectionTitle color="blue">*</SectionTitle>
      </SectionTitleWrapper>
      <SectionGuide>최저시급 10,030원 이상으로 입력해 주세요.</SectionGuide>
      <PayWrapper>
        <MatchingApplicationDropdown
          title="시급"
          contents={payLabels}
          selectedContents={SALARY_MAP.EN_TO_KR[selectedPayType]}
          setSelectedContents={(label: string) => {
            if (label in SALARY_MAP.KR_TO_EN) {
              onPayTypeChange(
                SALARY_MAP.KR_TO_EN[label as WorkSalaryUnitTypeKR],
              );
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
  box-sizing: border-box;
`;

const SectionGuide = styled.label`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
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
