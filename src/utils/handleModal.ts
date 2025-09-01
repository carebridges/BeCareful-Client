import React from 'react';

export const handleModal = (
  setter: React.Dispatch<React.SetStateAction<boolean>>,
  before?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (before) {
    before(false);
  }
  setter((prev) => !prev);
};
