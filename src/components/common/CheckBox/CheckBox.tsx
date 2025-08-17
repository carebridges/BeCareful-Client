import styled from 'styled-components';

interface CheckBoxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  borderRadius: string;
  label: string;
  select: string;
  guide: string;
}

export const CheckBox = ({
  id,
  checked,
  onChange,
  borderRadius,
  label,
  select,
  guide,
}: CheckBoxProps) => {
  return (
    <CheckWrapper>
      <Check
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <LabelWrapper>
        <CheckIcon aria-hidden="true" $borderRadius={borderRadius} />
        {select === '' ? (
          <Label htmlFor={id}>{label}</Label>
        ) : (
          <>
            <SelectLabel htmlFor={id} $select={select}>
              {select}
            </SelectLabel>
            <GuideLabel $select={select} htmlFor={id}>
              {guide}
            </GuideLabel>
          </>
        )}
      </LabelWrapper>
    </CheckWrapper>
  );
};

const CheckWrapper = styled.div`
  display: flex;
  height: 20px;
  align-items: center;
`;

const CheckHidden = styled.input`
  position: absolute;
  display: none;
`;

const LabelWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  padding-left: 28px;
`;

const CheckIcon = styled.span<{ $borderRadius: string }>`
  width: 20px;
  height: 20px;
  border-radius: ${({ $borderRadius }) => $borderRadius || '50%'};
  background-color: ${({ theme }) => theme.colors.gray200};
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  &::before {
    content: '';
    position: absolute;
    box-sizing: border-box;
    width: 27%;
    height: 45%;
    left: 50%;
    top: 54%;
    transform: translateX(-50%) translateY(-70%) rotateZ(40deg);
    border-right: 2px solid ${({ theme }) => theme.colors.white};
    border-bottom: 2px solid ${({ theme }) => theme.colors.white};
  }
`;

const Label = styled.label`
  position: relative;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray900};
`;

const SelectLabel = styled.label<{ $select: string }>`
  position: relative;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, $select }) =>
    $select === '선택' ? theme.colors.gray300 : theme.colors.gray900};
`;

const GuideLabel = styled.label<{ $select: string }>`
  position: relative;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme, $select }) =>
    $select === '선택' ? theme.colors.gray700 : theme.colors.gray900};
`;

const Check = styled(CheckHidden)`
  &:checked + ${LabelWrapper} ${CheckIcon} {
    background-color: ${({ theme }) => theme.colors.mainBlue};
  }

  &:checked + ${LabelWrapper} ${CheckIcon}::before {
    border-color: ${({ theme }) => theme.colors.white};
  }
`;
