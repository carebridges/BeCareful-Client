import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { CheckCard } from '@/components/SignUp/SocialWorkerSignUpFunnel/common/CheckCard';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { FACILITY_TYPES } from '@/constants/institutionFacilityTypes';

interface SocialworkerEditInstitutionPageProps {
  institution: string;
  institutionCode: string;
  year: string;
  types: string[];
  phoneNumber: string;
}

const SocialworkerEditInstitutionPage = ({
  institution: initialInstitution,
  institutionCode: initialInstitutionCode,
  year: initialYear,
  types: initialTypes,
  phoneNumber: initialPhoneNumber,
}: SocialworkerEditInstitutionPageProps) => {
  const navigate = useNavigate();

  const [institution, setInstitution] = useState(initialInstitution);
  const [institutionCode, setInstitutionCode] = useState(
    initialInstitutionCode,
  );
  const [year, setYear] = useState(initialYear);
  const [types, setTypes] = useState(initialTypes);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);

  const handleChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'institution':
        setInstitution(value);
        break;
      case 'institutionCode':
        setInstitutionCode(value);
        break;
      case 'year':
        setYear(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleTypesChange = (selectedType: string) => {
    setTypes((prev) => {
      if (prev.includes(selectedType)) {
        return prev.filter((type) => type !== selectedType);
      } else {
        return [...prev, selectedType];
      }
    });
  };

  return (
    <Container>
      <NavBar
        left={
          <NavLeft
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          />
        }
        center={<NavCenter>기관 정보 수정</NavCenter>}
        color="white"
      />

      <Profile>
        <img src="" />
      </Profile>

      <CardContainer>
        <label className="title">
          소속된 기관명 <span className="star">*</span>
        </label>
        <label className="detail">
          소속된 기관의 정확한 명칭을 검색해 주세요.
        </label>
        <Input
          placeholder="소속된 기관명"
          value={institution}
          onChange={(e) => handleChange('institution', e.target.value)}
        />
      </CardContainer>

      <CardContainer>
        <label className="title">소속된 기관 코드</label>
        <Input
          placeholder="소속된 기관 코드"
          value={institutionCode}
          onChange={(e) => handleChange('institutionCode', e.target.value)}
        />
      </CardContainer>

      <CardContainer>
        <label className="title">
          개소 연도 <span className="star">*</span>
        </label>
        <label className="detail">
          센터가 설립되고 운영을 시작한 해를 입력해 주세요.
        </label>
        <Input
          placeholder="개소 연도"
          value={year}
          onChange={(e) => handleChange('year', e.target.value)}
        />
      </CardContainer>

      <CardContainer>
        <label className="title">
          시설 유형 <span className="star">*</span>
        </label>
        <label className="detail">복수 선택이 가능해요.</label>
        {FACILITY_TYPES.map((type) => (
          <CheckCard
            key={type}
            pressed={types.includes(type)}
            text={type}
            onClick={() => handleTypesChange(type)}
          />
        ))}
      </CardContainer>

      <CardContainer>
        <label className="title">
          연락처 <span className="star">*</span>
        </label>
        <label className="detail">기관 대표 전화번호를 입력해 주세요.</label>
        <Input
          placeholder="연락처"
          value={phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
        />
      </CardContainer>

      <Bottom>
        <Button>기관 정보 수정하기</Button>
      </Bottom>
    </Container>
  );
};

export default SocialworkerEditInstitutionPage;

const Container = styled.div`
  margin: auto 20px;
  margin-bottom: 112px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NavLeft = styled(ArrowLeft)`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Profile = styled.div`
  margin-top: -16px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const CardContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  .star {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const Input = styled.input`
  //   width: 100%;
  height: 20px;
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

const Button = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.mainBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const Bottom = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;
