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

export const CheckBoxSelect = ({
  width,
  height,
  id,
  checked,
  label,
  onChange,
  border = true,
}: CheckBoxSelectProps) => {
  return (
    <CheckBoxWrapper width={width} height={height}>
      <CheckBox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange?.(id)}
      />
      <Label htmlFor={id} $border={border}>
        {label}
      </Label>
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;
`;

const CheckBox = styled.input`
  display: none;
`;

const Label = styled.label<{ $border: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  border: 1px solid
    ${({ theme, $border }) =>
      $border ? theme.colors.gray100 : theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

  input:checked + & {
    background: ${({ theme }) => theme.colors.subBlue};
    color: ${({ theme }) => theme.colors.mainBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};
  }
  &:active {
    transform: scale(0.97);
  }
`;
