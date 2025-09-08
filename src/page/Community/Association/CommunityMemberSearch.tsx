import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { ReactComponent as ArrowLeft } from '@/assets/icons/ArrowLeft.svg';
// import { ReactComponent as SearchIcon } from '@/assets/icons/Search.svg';
import { ReactComponent as CloseIcon } from '@/assets/icons/CloseCircle.svg';
import { NavBar } from '@/components/common/NavBar/NavBar';
import { useMembers } from '@/api/communityAssociation';
import MemberListCard from '@/components/Community/association/MemberListCard';

interface CommunityMemberSearchProps {
  onSelectMember: (member: { memberId: number; name: string }) => void;
  closeSearch: () => void;
}

const CommunityMemberSearch = ({
  onSelectMember,
  closeSearch,
}: CommunityMemberSearchProps) => {
  const { data } = useMembers();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = useMemo(() => {
    const allMembers = data?.members || [];

    if (!searchTerm) {
      return allMembers;
    }

    return allMembers.filter(
      (member) =>
        member.name.includes(searchTerm) ||
        member.phoneNumber.includes(searchTerm),
    );
  }, [searchTerm, data]);

  const handleMemberClick = (member: { memberId: number; name: string }) => {
    onSelectMember(member);
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={closeSearch} />}
        center={<NavCenter>검색</NavCenter>}
        color=""
      />

      <SearchBarWrapper>
        <SearchBar
          placeholder="검색어를 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconWrapper>
          {searchTerm && <Close onClick={() => setSearchTerm('')} />}
          {/* <Search onClick={() => handleSearch(searchTerm)} /> */}
        </IconWrapper>
      </SearchBarWrapper>

      <SearchResultWrapper>
        <label>{filteredMembers.length}건</label>
        {filteredMembers.map((member) => (
          <MemberListCard
            key={member.memberId}
            member={member}
            onClick={() =>
              handleMemberClick({
                memberId: member.memberId,
                name: member.name,
              })
            }
          />
        ))}
      </SearchResultWrapper>
    </Container>
  );
};

export default CommunityMemberSearch;

const Container = styled.div`
  margin: 0px 20px;
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const SearchBar = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.typography.fontSize.title5};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainBlue};
    outline: none;
    caret-color: ${({ theme }) => theme.colors.mainBlue};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 6px;

  position: absolute;
  top: 15px;
  right: 16px;
`;

// const Search = styled(SearchIcon)`
//   circle,
//   path {
//     stroke: ${({ theme }) => theme.colors.gray700};
//   }

//   cursor: pointer;
// `;

const Close = styled(CloseIcon)`
  cursor: pointer;
`;

const SearchResultWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  label {
    color: ${({ theme }) => theme.colors.gray700};
    font-size: ${({ theme }) => theme.typography.fontSize.body2};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;
