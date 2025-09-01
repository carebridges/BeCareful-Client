import { useEffect, useState } from 'react';
import { WorkApplication, WorkLocation } from '@/types/Caregiver/common';

export const useLocationSelection = (data: WorkApplication | undefined) => {
  // 지역 설정 모달
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const closeAreaModal = () => {
    setIsAreaModalOpen(false);
    resetSelections();
  };

  // 근무 지역
  const [selectedArea, setSelectedArea] = useState<WorkLocation[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedGu('');
    setSelectedDong('');
  };
  const handleGuSelect = (gu: string) => {
    setSelectedGu(gu);
    setSelectedDong('');
  };
  const handleDongSelect = (dong: string) => {
    setSelectedDong(dong);
  };

  const handleSelectBtn = () => {
    if (!selectedCity || !selectedGu || !selectedDong) return;
    if (selectedArea.length < 5) {
      setSelectedArea((prev) => [
        ...prev,
        {
          siDo: selectedCity,
          siGuGun: selectedGu,
          dongEupMyeon: selectedDong,
        },
      ]);
    }
    setIsAreaModalOpen(false);
    resetSelections();
  };

  const resetSelections = () => {
    setSelectedCity('');
    setSelectedGu('');
    setSelectedDong('');
  };

  const removeSelectedArea = (index: number) => {
    setSelectedArea((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (data) {
      setSelectedArea(data.workLocations);
    }
  }, [data]);

  return {
    isAreaModalOpen,
    setIsAreaModalOpen,
    closeAreaModal,
    selectedArea,
    selectedCity,
    selectedGu,
    selectedDong,
    handleCitySelect,
    handleGuSelect,
    handleDongSelect,
    handleSelectBtn,
    removeSelectedArea,
  };
};
