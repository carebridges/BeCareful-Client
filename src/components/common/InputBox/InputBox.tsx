import styled from 'styled-components';

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  detail?: string;
  placeholder: string;
  value?: string;
}

const InputBox = ({
  title,
  detail,
  placeholder,
  value,
  ...props
}: InputBoxProps) => {
  return (
    <Container>
      <div className="titleWrapper">
        <label className="title">
          {title} <span>*</span>
        </label>
        {detail && <label className="detail">{detail}</label>}
      </div>
      <Input placeholder={placeholder} value={value} {...props} />
    </Container>
  );
};

export default InputBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .titleWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
