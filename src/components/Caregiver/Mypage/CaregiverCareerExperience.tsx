import styled from 'styled-components';
import { ReactComponent as Add } from '@/assets/icons/ButtonPlus.svg';
import { ReactComponent as Delete } from '@/assets/icons/ButtonMinus.svg';
import { Button } from '@/components/common/Button/Button';
import { CareerDropdown } from '@/components/Caregiver/Mypage/CareerDropdown';
import { CareerDetail } from '@/types/Caregiver/mypage';

interface CareerExpProps {
  experiences: CareerDetail[];
  handleExperienceChange: (experiences: CareerDetail[]) => void;
}

const CaregiverCareerExperience = ({
  experiences,
  handleExperienceChange,
}: CareerExpProps) => {
  const addExperience = () => {
    handleExperienceChange([
      ...experiences,
      { workInstitution: '', workYear: '1년' },
    ]);
  };

  const deleteExperience = (indexToDelete: number) => {
    if (experiences.length > 1) {
      handleExperienceChange(
        experiences.filter((_, index) => index !== indexToDelete),
      );
    }
  };

  const handleChange = (index: number, key: string, value: string) => {
    const updatedExperiences = experiences.map((experience, i) =>
      i === index ? { ...experience, [key]: value } : experience,
    );
    handleExperienceChange(updatedExperiences);
  };

  const handleSelectWorkYear = (index: number, year: string) => {
    handleChange(index, 'workYear', year);
  };
  const dropContents = [
    '1년 미만',
    '1년',
    '2년',
    '3년',
    '4년',
    '5년',
    '6년',
    '7년',
    '8년',
    '9년',
    '10년 이상',
  ];

  return (
    <Container>
      {experiences.map((experience, index) => (
        <CareerWrapper key={index}>
          <InstitutionWrapper>
            <label>
              근무처 <span>*</span>
            </label>
            <Institution
              placeholder="근무처를 입력해주세요"
              value={experience.workInstitution}
              onChange={(e) =>
                handleChange(index, 'workInstitution', e.target.value)
              }
            />
          </InstitutionWrapper>

          <InstitutionWrapper>
            <label>
              근무기간 <span>*</span>
            </label>
            <CareerDropdown
              title="근무 기간을 선택해주세요"
              contents={dropContents}
              selectedContents={[experience.workYear]}
              setSelectedContents={(value) =>
                handleSelectWorkYear(index, value[0])
              }
            />
          </InstitutionWrapper>

          {experiences.length > 1 && (
            <Button
              height="52px"
              variant="disabled"
              onClick={() => deleteExperience(index)}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Delete />
              경력 삭제하기
            </Button>
          )}
        </CareerWrapper>
      ))}

      <Button
        height="52px"
        variant="subBlue"
        onClick={addExperience}
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Add />
        경력 추가하기
      </Button>
    </Container>
  );
};

export default CaregiverCareerExperience;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CareerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px 32px 20px;
  gap: 12px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  margin-bottom: 16px;
`;

const InstitutionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Institution = styled.input`
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

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
