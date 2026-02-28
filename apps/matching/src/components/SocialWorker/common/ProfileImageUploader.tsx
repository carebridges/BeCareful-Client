import { styled } from 'styled-components';
import { ReactComponent as Elederly } from '@repo/ui/src/assets/icons/elderly/Elderly.svg';

type Props = {
  imageUrl?: string | null;
  onChange: (file: File) => void;
};

export const ProfileImageUploader = ({ imageUrl, onChange }: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <ProfileImageWrapper>
      <ProfileImageInput
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {imageUrl ? (
        <ProfileImageDisplay src={imageUrl} alt="Profile" />
      ) : (
        <Elederly />
      )}
    </ProfileImageWrapper>
  );
};

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ProfileImageDisplay = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.gray300};
`;
