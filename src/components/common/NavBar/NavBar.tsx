import styled, { css } from 'styled-components';

interface NavbarProps {
  color?: string;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  fix?: boolean;
}

export const NavBar = ({
  color = 'white',
  left,
  center,
  right,
  fix,
}: NavbarProps) => {
  return (
    <NavbarWrapper color={color} fix={fix}>
      <NavLeft>{left}</NavLeft>
      <NavCenter>{center}</NavCenter>
      <NavRight>{right}</NavRight>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div<{ color: string; fix?: boolean }>`
  background: ${({ theme, color }) =>
    color === 'blue' ? theme.colors.mainBlue : theme.colors.white};
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;

  ${({ fix }) =>
    fix &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    `};
`;

const NavLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const NavCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const NavRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
