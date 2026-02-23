import { Tab } from '@/components/common/Tab/Tab';
import { ApplyListTab } from '@/components/Matching/ApplyListTab';
import { MatchListTab } from '@/components/Matching/MatchListTab';
import { MatchingCaregiver } from '@/types/matching';
import styled from 'styled-components';

interface MatchingTabProps {
  recruitmentId: number;
  appliedCaregivers: MatchingCaregiver[];
  matchedCaregivers: MatchingCaregiver[];
}

export const MatchingTab = ({
  recruitmentId,
  appliedCaregivers,
  matchedCaregivers,
}: MatchingTabProps) => {
  return (
    <TabContainer>
      <Tab
        tabs={[
          {
            name: '매칭 리스트',
            content: (
              <MatchListTab
                caregivers={matchedCaregivers}
                recruitmentId={recruitmentId}
              />
            ),
          },
          {
            name: '지원 리스트',
            content: (
              <ApplyListTab
                caregivers={appliedCaregivers}
                recruitmentId={recruitmentId}
              />
            ),
          },
        ]}
      />
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  width: 100%;
`;
