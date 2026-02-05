import { styled } from 'styled-components';

type RadioButtonProps = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export const RadioButton = ({
  label,
  checked,
  disabled = false,
  onClick,
}: RadioButtonProps) => {
  return (
    <Container
      $checked={checked}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
    >
      <Circle $checked={checked} />
      <Label>{label}</Label>
    </Container>
  );
};

const Container = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Circle = styled.div<{ $checked: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;

  border: 1px solid
    ${({ theme, $checked }) =>
      $checked ? theme.colors.mainOrange : theme.colors.gray300};

  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.mainOrange};
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
  }
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray900};
`;
