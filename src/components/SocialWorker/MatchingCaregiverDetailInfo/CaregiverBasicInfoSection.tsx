import {
  DetailContent,
  DetailContentContainer,
  Title,
} from '@/components/SocialWorker/MatchingCaregiverDetailInfo/MatchingCaregiverDetailInfo.styles';
import { ShowPhoneNumberModal } from '@/components/SocialWorker/MatchingCaregiverDetailInfo/ShowPhoneNumberModal';
import { Gender } from '@/types/SocialSignUp';
import { useState } from 'react';

interface CaregiverDetailInfo {
  certificateNames: string[];
  havingCar: boolean;
  completeDementiaEducation: boolean;
}

interface CaregiverInfo {
  gender: Gender;
  phoneNumber: string;
  caregiverDetailInfo: CaregiverDetailInfo;
}

interface CaregiverBasicInfoSectionProps {
  data: CaregiverInfo;
}

export const CaregiverBasicInfoSection = ({
  data,
}: CaregiverBasicInfoSectionProps) => {
  const [openPhoneModal, setOpenPhoneModal] = useState(false);

  return (
    <>
      <Title>요양보호사 정보</Title>
      <DetailContentContainer>
        <DetailContent>
          <span className="highlight">성별</span>
          <span>{data.gender === 'FEMALE' ? '여자' : '남자'}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">연락처</span>
          <span
            className="point"
            onClick={() => setOpenPhoneModal(true)}
            style={{ cursor: 'pointer' }}
          >
            클릭 시 연락처 열람 가능 {`>`}
          </span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">자격증</span>
          <span>{data.caregiverDetailInfo.certificateNames.join(', ')}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">자차여부</span>
          <span>{data.caregiverDetailInfo.havingCar ? '보유' : '미보유'}</span>
        </DetailContent>
        <DetailContent>
          <span className="highlight">치매교육</span>
          <span>
            {data.caregiverDetailInfo.completeDementiaEducation
              ? '이수'
              : '미이수'}
          </span>
        </DetailContent>
      </DetailContentContainer>

      {openPhoneModal && (
        <ShowPhoneNumberModal
          phoneNumber={data.phoneNumber}
          onClose={() => setOpenPhoneModal(false)}
        />
      )}
    </>
  );
};
