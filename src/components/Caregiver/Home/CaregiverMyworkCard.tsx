import styled from 'styled-components';
import { useState } from 'react';
import InfoDisplay from '@/components/common/InfoDisplay/InfoDisplay';
import { GENDER_EN_TO_KR } from '@/constants/common/gender';
import { CaregiverCompletedMatching } from '@/types/Caregiver/home';
import { formatCaretype, formatDaysToKR } from '@/utils/caregiverFormatter';
import { usePutMemoMutation } from '@/hooks/Caregiver/mutation/usePutMemoMutation';

interface CaregiverMyworkCardProps {
  workInfo: CaregiverCompletedMatching;
}

const CaregiverMyworkCard = ({ workInfo }: CaregiverMyworkCardProps) => {
  const work = [
    {
      title: '근무요일',
      detail: formatDaysToKR(workInfo.workDays),
    },
    { title: '주소', detail: workInfo.elderlyInfo.address },
    { title: '케어항목', detail: formatCaretype(workInfo.careTypes, 2) },
    { title: '건강상태', detail: workInfo.elderlyInfo.healthCondition },
    { title: '기관명', detail: workInfo.elderlyInfo.institutionName },
  ];

  const [textCount, setTextCount] = useState(workInfo.note.length);
  const [memo, setMemo] = useState(workInfo.note);
  const [isMemoChange, setIsMemoChange] = useState(false);

  const { mutate: updateMemo } = usePutMemoMutation(workInfo.id, {
    onSuccessCallback: () => {
      setIsMemoChange(false);
    },
  });

  const handleMemoBtnClick = () => {
    updateMemo({ note: memo });
  };

  return (
    <CardContainer>
      <PersonWrapper>
        <div className="left">
          <div className="infoWrapper">
            <label className="name">{workInfo.elderlyInfo.name}</label>
            <div className="extraWrapper">
              <label className="extra">{workInfo.elderlyInfo.age}세</label>
              <Border />
              <label className="extra">
                {GENDER_EN_TO_KR[workInfo.elderlyInfo.gender]}
              </label>
            </div>
          </div>

          <InfoDisplay items={work} gapColumn="6px" gapRow="12px" />
        </div>
        <img src={workInfo.elderlyInfo.profileImageUrl} />
      </PersonWrapper>

      <MemoWrapper>
        <label className="memo" htmlFor="note">
          메모
        </label>
        <div className="fieldWrapper">
          <MemoField
            id="note"
            typeof="text"
            placeholder="메모를 입력해 주세요"
            value={memo}
            maxLength={99}
            onChange={(e) => {
              setTextCount(e.target.value.length);
              setMemo(e.target.value);
              setIsMemoChange(true);
            }}
          />
          <label className="count">{textCount}/100</label>
        </div>
        <Button memo={isMemoChange} onClick={handleMemoBtnClick}>
          {isMemoChange ? '메모 저장' : memo === '' ? '메모 작성' : '메모 수정'}
        </Button>
      </MemoWrapper>
    </CardContainer>
  );
};

export default CaregiverMyworkCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 20px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  label {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const PersonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;

  div {
    display: flex;
  }

  .left {
    flex-direction: column;
    gap: 8px;
  }

  .infoWrapper {
    gap: 8px;
    align-items: center;
  }

  .name {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title3};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  .extraWrapper {
    gap: 4px;
    align-items: center;
  }

  .extra {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    object-fit: cover;
  }
`;

const Border = styled.div`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.gray50};
`;

const MemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .memo {
    color: ${({ theme }) => theme.colors.gray900};
  }

  .fieldWrapper {
    position: relative;
  }

  .count {
    position: absolute;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    right: 16px;
    bottom: 16px;
  }
`;

const MemoField = styled.textarea`
  width: 100%;
  height: 90px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  resize: none;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: -0.4px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    letter-spacing: -0.4px;
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const Button = styled.button<{ memo: boolean }>`
  background: ${({ memo, theme }) =>
    memo ? theme.colors.mainBlue : theme.colors.subBlue};
  color: ${({ memo, theme }) =>
    memo ? theme.colors.white : theme.colors.mainBlue};
  height: 36px;
  border-radius: 12px;
  line-height: 1.4;
  font-size: ${({ theme }) => theme.typography.fontSize.body4};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;
