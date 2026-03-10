export const formatCaregiverInfo = (age?: number, gender?: string) => {
  const genderText =
    gender === 'MALE' ? '남성' : gender === 'FEMALE' ? '여성' : '';

  if (age && genderText) {
    return `${age}세 · ${genderText}`;
  }

  if (age) {
    return `${age}세`;
  }

  if (genderText) {
    return genderText;
  }

  return '';
};
