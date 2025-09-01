import styled from 'styled-components';
import { GENDER_EN_TO_KR } from '@/constants/common/gender';
import { MatchingElderlyList } from '@/types/Socialworker/home';

interface ElderSectionProps {
  data: MatchingElderlyList[] | undefined;
}

const ElderSection = ({ data }: ElderSectionProps) => {
  return (
    <Edler>
      {data?.map((elderly, index) => (
        <div className="elder" key={index}>
          <img
            src={elderly.elderlyProfileImageUrl}
            alt={`${elderly.elderlyName} 어르신 프로필`}
          />
          <div className="elder-info">
            <label className="name">{elderly.elderlyName}</label>
            <div className="bottom">
              <label className="extra">{elderly.elderlyAge}세</label>
              <div className="border" />
              <label className="extra">
                {GENDER_EN_TO_KR[elderly.elderlyGender]}
              </label>
            </div>
          </div>
        </div>
      ))}
    </Edler>
  );
};

export default ElderSection;

const Edler = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  flex-wrap: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .elder {
    padding: 16px;
    width: 88px;
    flex: 0 0 auto;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.03);
  }

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
  }

  .elder-info {
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.body1};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .bottom {
    gap: 4px;
    align-items: center;
  }

  .extra {
    color: ${({ theme }) => theme.colors.gray500};
  }

  .border {
    width: 1px;
    height: 12px;
    background: ${({ theme }) => theme.colors.subBlue};
  }
`;
