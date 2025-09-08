import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
import { ReactComponent as Check } from '@/assets/icons/matching/CircleCheck.svg';
import { ReactComponent as SearchIcon } from '@/assets/icons/signup/SearchIcon.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { Button } from '@/components/common/Button/Button';
import CommunityMemberSearch from '@/page/Community/Association/CommunityMemberSearch';
import {
  ASSOCIATION_MEMBER_TYPES,
  ASSOCIATION_RANK_KR_TO_EN,
} from '@/constants/common/associationRank';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useChangeChairman } from '@/api/communityAssociation';
import { AssociationChairmanRequest } from '@/types/Community/association';

interface NewChairman {
  memberId: number;
  name: string;
}

const CommunityEditChairmanPage = () => {
  const { handleGoBack } = useHandleNavigate();

  const { mutate: changeChairman } = useChangeChairman();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [newChairman, setNewChairman] = useState<NewChairman | null>(null);
  const [nextRankOfCurrentChairman, setNextRankOfCurrentChairman] =
    useState('');

  const handleMemberSelect = (member: NewChairman) => {
    setNewChairman(member);
    setIsSearchOpen(false);
  };

  const handleEditBtnClick = () => {
    if (!newChairman) {
      console.error('새로운 회장을 선택해주세요.');
      return;
    }
    if (
      !nextRankOfCurrentChairman ||
      !ASSOCIATION_RANK_KR_TO_EN[nextRankOfCurrentChairman]
    ) {
      console.error('현재 회장의 변경될 직급을 선택해주세요.');
      return;
    }

    const chairman: AssociationChairmanRequest = {
      newChairmanId: newChairman.memberId,
      newChairmanName: newChairman.name,
      nextRankOfCurrentChairman:
        ASSOCIATION_RANK_KR_TO_EN[nextRankOfCurrentChairman],
    };
    console.log(chairman);
    changeChairman(chairman, {
      onSuccess: handleGoBack,
    });
  };

  const isChanged = newChairman && nextRankOfCurrentChairman;

  return isSearchOpen ? (
    <CommunityMemberSearch
      onSelectMember={handleMemberSelect}
      closeSearch={() => setIsSearchOpen(false)}
    />
  ) : (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>회장 권한 위임</NavCenter>}
        color=""
      />

      <SectionWrapper>
        <div className="titleWrapper">
          <label className="title">
            차기 회장 지정<span>*</span>
          </label>
          <label className="detail">
            차기 회장으로 지정할 회원을 선택해 주세요.
          </label>
        </div>
        <SearchButton
          newChairman={newChairman ? true : false}
          onClick={() => setIsSearchOpen(true)}
        >
          {newChairman ? newChairman.name : '차기 회장 검색'}
          <SearchIcon />
        </SearchButton>
      </SectionWrapper>

      {newChairman && (
        <SectionWrapper>
          <div className="titleWrapper">
            <label className="title">
              현재 회장 직급 변경 <span>*</span>
            </label>
            <label className="detail">
              차기 회장 지정 후, 현재 회장의 변경될 직급을 선택해 주세요.
            </label>
          </div>
          <CheckWrapper>
            {ASSOCIATION_MEMBER_TYPES.map((type) => (
              <CheckButton
                key={type}
                active={nextRankOfCurrentChairman === type}
                onClick={() => setNextRankOfCurrentChairman(type)}
              >
                <Check />
                {type} 입니다
              </CheckButton>
            ))}
          </CheckWrapper>
        </SectionWrapper>
      )}

      <Bottom>
        <Button
          height="52px"
          variant={isChanged ? 'mainBlue' : 'disabled'}
          disabled={!isChanged}
          onClick={handleEditBtnClick}
        >
          회장 권한 위임하기
        </Button>
      </Bottom>
    </Container>
  );
};

export default CommunityEditChairmanPage;

const Container = styled.div`
  margin: 0px 20px;
  margin-bottom: 120px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .titleWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.typography.fontSize.title5};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  span {
    color: ${({ theme }) => theme.colors.mainBlue};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const SearchButton = styled.button<{ newChairman: boolean }>`
  padding: 15px 16px;
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme, newChairman }) =>
    newChairman ? theme.colors.gray900 : theme.colors.gray300};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  }
`;

const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckButton = styled.div<{ active: boolean }>`
  height: 32px;
  padding: 10px;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.mainBlue : theme.colors.gray100};
  background: ${({ theme, active }) =>
    active ? theme.colors.subBlue : theme.colors.white};
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme, active }) =>
    active ? theme.colors.mainBlue : theme.colors.gray900};
  font-weight: ${({ theme, active }) =>
    active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};

  path {
    fill: ${({ theme, active }) => (active ? theme.colors.mainBlue : '')};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.subBlue};
    border-color: ${({ theme }) => theme.colors.mainBlue};

    path {
      fill: ${({ theme }) => theme.colors.mainBlue};
    }
  }
`;

const Bottom = styled.div`
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray50};

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;
