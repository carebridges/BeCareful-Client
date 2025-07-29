import { useState, useEffect } from 'react';
import {
  SectionWrapper,
  Title,
  TitleWrapper,
} from '@/components/SocialWorker/ElderyRegister/Section.styles';
import { Button } from '@/components/common/Button/Button';
import { ReactComponent as Plus } from '@/assets/icons/signup/Plus.svg';
import { styled } from 'styled-components';
import { CareType } from '@/types/Elderly';
import { CareUnitCard } from './CareUnitCard';

export type CareUnit = {
  id: string;
  selectedCare: CareType | null;
  selectedDetails: string[];
};

interface CareTypeSectionProps {
  selectedCare: CareType | null;
  setSelectedCare: (care: CareType | null) => void;
  selectedDetails: string[];
  setSelectedDetails: (details: string[]) => void;
}

export const CareTypeSection = ({
  setSelectedCare,
  setSelectedDetails,
}: CareTypeSectionProps) => {
  const [careUnits, setCareUnits] = useState<CareUnit[]>([]);
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const handleAddCareUnit = () => {
    if (careUnits.length >= 5) return;
    const newUnit: CareUnit = {
      id: crypto.randomUUID(),
      selectedCare: null,
      selectedDetails: [],
    };
    setCareUnits((prev) => [...prev, newUnit]);
  };

  const updateCareUnit = (id: string, updated: Partial<CareUnit>) => {
    setCareUnits((prev) =>
      prev.map((unit) => (unit.id === id ? { ...unit, ...updated } : unit)),
    );
  };

  const toggleDetail = (id: string, item: string) => {
    setCareUnits((prev) =>
      prev.map((unit) => {
        if (unit.id !== id) return unit;
        const nextDetails = unit.selectedDetails.includes(item)
          ? unit.selectedDetails.filter((d) => d !== item)
          : [...unit.selectedDetails, item];
        return { ...unit, selectedDetails: nextDetails };
      }),
    );
  };

  useEffect(() => {
    const first = careUnits.find((u) => u.selectedCare)?.selectedCare || null;
    const allDetails = careUnits.flatMap((u) => u.selectedDetails);
    setSelectedCare(first);
    setSelectedDetails(allDetails);
  }, [careUnits]);

  return (
    <SectionWrapper>
      <TitleWrapper>
        <Title color="">케어 필요항목</Title>
        <Title color="blue">*</Title>
      </TitleWrapper>

      {careUnits.map((unit) => (
        <CareUnitCard
          key={unit.id}
          unit={unit}
          onUpdate={(updated) => updateCareUnit(unit.id, updated)}
          onToggleDetail={(item) => toggleDetail(unit.id, item)}
          isModalOpen={openModalId === unit.id}
          onOpenModal={() => setOpenModalId(unit.id)}
          onCloseModal={() => setOpenModalId(null)}
        />
      ))}

      {careUnits.length < 5 && (
        <CardWrapper>
          <Button variant="blue2" height="52px" onClick={handleAddCareUnit}>
            <ButtonContent>
              <Plus />
              추가하기
            </ButtonContent>
          </Button>
        </CardWrapper>
      )}
    </SectionWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
