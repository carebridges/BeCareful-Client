import styled from 'styled-components';

interface CheckBoxSelectProps {
  width: string;
  height: string;
  id: string;
  checked?: boolean;
  onChange?: (id: string) => void;
  label: string;
  border?: boolean;
}

export const CareChcekBox = ({
  width,
  height,
  id,
  checked,
  label,
  onChange,
  border = true,
}: CheckBoxSelectProps) => {
  return (
    <CheckBoxWrapper width={width} height={height} onChange={() => {}}>
      <CheckBox type="checkbox" id={id} checked={checked} />
      <Label
        htmlFor={id}
        onClick={onChange ? () => onChange(id) : () => {}}
        border={border}
      >
        {label}
      </Label>
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
`;

const Label = styled.label<{ border: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, border }) =>
      border ? theme.colors.gray100 : theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Check = styled.input`
  display: none;
`;

const CheckBox = styled(Check)`
  &:checked + ${Label} {
    background: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
