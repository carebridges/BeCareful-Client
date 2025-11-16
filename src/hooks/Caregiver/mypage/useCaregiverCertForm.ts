import { CERTIFICATE_LABEL } from '@/constants/caregiver/certificateLabel';
import { CertificateInfo } from '@/types/Caregiver/common';
import { CaregiverDetailInfo } from '@/types/Caregiver/mypage';
import { CertificateFormInput, CertificateKey } from '@/types/CareGiverSignUp';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useCaregiverCertForm = (
  data: CaregiverDetailInfo | undefined,
  setIsChanged: Dispatch<SetStateAction<boolean>>,
) => {
  const [caregiverCert, setCaregiverCert] = useState<CertificateInfo | null>(
    null,
  );
  const [socialworkerCert, setSocialworkerCert] =
    useState<CertificateInfo | null>(null);
  const [nursingCert, setNursingCert] = useState<CertificateInfo | null>(null);

  const [selectedKeys, setSelectedKeys] = useState<CertificateKey[]>([
    'caregiverCertificate',
  ]);
  const [isAddCertModalOpen, setIsAddCertModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      const initialSelectedKeys: CertificateKey[] = [];

      // 요양보호사 자격증
      if (data.caregiverCertificate) {
        setCaregiverCert(data.caregiverCertificate);
        initialSelectedKeys.push('caregiverCertificate');
      }

      // 사회복지사 자격증
      if (data.socialWorkerCertificate) {
        setSocialworkerCert(data.socialWorkerCertificate);
        initialSelectedKeys.push('socialWorkerCertificate');
      }
      // 간호조무사 자격증
      if (data.nursingCareCertificate) {
        setNursingCert(data.nursingCareCertificate);
        initialSelectedKeys.push('nursingCareCertificate');
      }

      setSelectedKeys(initialSelectedKeys);
    }
  }, [data]);

  const handleCertificateChange = (
    key: CertificateKey,
    cert: CertificateFormInput,
  ) => {
    // const grade: CertificateInfo['grade'] =
    //   cert.certificateLevel === '2급' ? 'SECOND' : 'FIRST';
    const grade: CertificateInfo['grade'] = (() => {
      const level = cert.certificateLevel?.trim();
      if (level === '1급') return 'FIRST';
      if (level === '2급') return 'SECOND';
      return 'none';
    })();

    const newCert: CertificateInfo = {
      grade,
      certificateNumber: cert.certificateNumber,
    };

    if (key === 'caregiverCertificate') {
      setCaregiverCert(newCert);
    } else if (key === 'socialWorkerCertificate') {
      setSocialworkerCert(newCert);
    } else if (key === 'nursingCareCertificate') {
      setNursingCert(newCert);
    }

    setIsChanged(true);
  };

  const handleAddCertificate = (label: string) => {
    const key = Object.entries(CERTIFICATE_LABEL).find(
      ([, value]) => value === label,
    )?.[0] as CertificateKey;

    if (!key || selectedKeys.includes(key)) return;

    setSelectedKeys((prev) => [...prev, key]);
    setIsAddCertModalOpen(false);
    setIsChanged(true);
  };

  const handleDeleteCertificate = (keyToDelete: CertificateKey) => {
    setSelectedKeys((prev) => prev.filter((key) => key !== keyToDelete));

    if (keyToDelete === 'caregiverCertificate') {
      setCaregiverCert(null);
    } else if (keyToDelete === 'socialWorkerCertificate') {
      setSocialworkerCert(null);
    } else if (keyToDelete === 'nursingCareCertificate') {
      setNursingCert(null);
    }

    setIsChanged(true);
  };

  return {
    caregiverCert,
    socialworkerCert,
    nursingCert,
    selectedKeys,
    isAddCertModalOpen,
    setIsAddCertModalOpen,
    handleCertificateChange,
    handleAddCertificate,
    handleDeleteCertificate,
  };
};
