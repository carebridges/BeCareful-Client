import styled, { css } from 'styled-components';

type ButtonVariant =
  | 'blue'
  | 'blue2'
  | 'gray'
  | 'disabled'
  | 'white'
  | 'mainBlue'
  | 'subBlue';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  width?: string | null;
  height?: string | null;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $disabled?: boolean;
  $width: string | null;
  $height: string | null;
}

export const Button = ({
  variant = 'gray',
  children,
  width = null,
  height = null,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $variant={variant} $width={width} $height={height} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ $width }) => ($width ? $width : '100%')};
  height: ${({ $height }) => $height};

  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  border-radius: 12px;
  line-height: 1.4;
  letter-spacing: -0.025em;

  ${({ $variant }) => getVariantStyle($variant)}

  &:disabled {
    cursor: default;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const getVariantStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'blue':
      return css`
        background-color: ${({ theme }) => theme.colors.mainBlue};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'blue2':
      return css`
        background-color: ${({ theme }) => theme.colors.subBlue};
        color: ${({ theme }) => theme.colors.mainBlue};
      `;
    case 'gray':
      return css`
        background-color: ${({ theme }) => theme.colors.gray300};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'disabled':
      return css`
        background-color: ${({ theme }) => theme.colors.gray300};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'white':
      return css`
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.gray900};
        border: 1px solid ${({ theme }) => theme.colors.gray100};
      `;
    case 'mainBlue':
      return css`
        background-color: ${({ theme }) => theme.colors.mainBlue};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'subBlue':
      return css`
        background-color: ${({ theme }) => theme.colors.subBlue};
        color: ${({ theme }) => theme.colors.mainBlue};
      `;
  }
};
