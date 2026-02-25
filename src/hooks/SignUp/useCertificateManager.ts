import { useState } from 'react';
import { CERTIFICATE_LABEL } from '@/constants/domain/caregiver';
import {
  CaregiverSignUpFormData,
  CommonCaregiverSignUpFormData,
} from '@/types/auth';
import {
  CertificateFormInput,
  CertificateInfo,
  CertificateKey,
} from '@/types/caregiver';

export const useCertificateManager = (
  setFormData: (
    updater: (prev: CaregiverSignUpFormData) => CaregiverSignUpFormData,
  ) => void,
) => {
  const [selectedKeys, setSelectedKeys] = useState<CertificateKey[]>([
    'caregiverCertificate',
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertificateChange = (
    key: CertificateKey,
    data: CertificateFormInput,
  ) => {
    const level = data.certificateLevel ?? '1급';
    const grade: CertificateInfo['grade'] =
      level === '2급' ? 'SECOND' : 'FIRST';

    const newCert: CertificateInfo = {
      grade,
      certificateNumber: data.certificateNumber,
    };

    setFormData((prev) => ({
      ...prev,
      [key]: newCert,
    }));
  };

  const handleAddCertificate = (label: string) => {
    const key = Object.entries(CERTIFICATE_LABEL).find(
      ([, value]) => value === label,
    )?.[0] as CertificateKey;

    if (!key || selectedKeys.includes(key)) return;

    setSelectedKeys((prev) => [...prev, key]);
    setIsModalOpen(false);
  };

  return {
    selectedKeys,
    handleCertificateChange,
    handleAddCertificate,
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
  };
};

export const useCommonCertificateManager = (
  setFormData: (
    updater: (
      prev: CommonCaregiverSignUpFormData,
    ) => CommonCaregiverSignUpFormData,
  ) => void,
) => {
  const [selectedKeys, setSelectedKeys] = useState<CertificateKey[]>([
    'caregiverCertificate',
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertificateChange = (
    key: CertificateKey,
    data: CertificateFormInput,
  ) => {
    const level = data.certificateLevel ?? '1급';
    const grade: CertificateInfo['grade'] =
      level === '2급' ? 'SECOND' : 'FIRST';

    const newCert: CertificateInfo = {
      grade,
      certificateNumber: data.certificateNumber,
    };

    setFormData((prev) => ({
      ...prev,
      [key]: newCert,
    }));
  };

  const handleAddCertificate = (label: string) => {
    const key = Object.entries(CERTIFICATE_LABEL).find(
      ([, value]) => value === label,
    )?.[0] as CertificateKey;

    if (!key || selectedKeys.includes(key)) return;

    setSelectedKeys((prev) => [...prev, key]);
    setIsModalOpen(false);
  };

  return {
    selectedKeys,
    handleCertificateChange,
    handleAddCertificate,
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
  };
};
