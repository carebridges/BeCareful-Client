import styled from 'styled-components';
import { ReactComponent as Elderly } from '@/assets/icons/socialworker/home/ElderlyDefault.svg';
import { ReactComponent as Caregiver } from '@/assets/icons/socialworker/home/CaregiverDefault.svg';
import { Button } from '@/components/common/Button/Button';
import { InstitutionInfo } from '@/types/Socialworker/home';

interface InstitutionSectionProps {
  data: InstitutionInfo | undefined;
  onClick: () => void;
}

const InstitutionSection = ({ data, onClick }: InstitutionSectionProps) => {
  return (
    <Institution>
      <div className="content">
        <div className="left">
          <Elderly />
          <label className="type">어르신</label>
        </div>
        <label className="people">
          <span>{data?.elderlyCount}</span>명
        </label>
      </div>

      <div className="border" />

      <div className="content">
        <div className="left">
          <Caregiver />
          <label className="type">요양보호사</label>
        </div>
        <label className="people">
          <span>{data?.socialWorkerCount}</span>명
        </label>
      </div>
      <Button
        height="52px"
        variant="subBlue"
        style={{ marginTop: '4px' }}
        onClick={onClick}
      >
        직원 정보 보기
      </Button>
    </Institution>
  );
};

export default InstitutionSection;

const Institution = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);

  .content {
    justify-content: space-between;
  }

  label {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
  }

  .left {
    gap: 8px;
    align-items: center;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  .people {
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .border {
    height: 1px;
    background: ${({ theme }) => theme.colors.gray50};
  }
`;
