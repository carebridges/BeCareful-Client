export const formatPhoneNumber = (value: string) => {
  value = value.replace(/[^0-9]/g, '');

  if (value.startsWith('02')) {
    if (value.length <= 2) return value;
    if (value.length <= 5) return value.replace(/(\d{2})(\d{1,3})/, '$1-$2');
    if (value.length <= 9)
      return value.replace(/(\d{2})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
    return value.substring(0, 10).replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  if (value.length <= 3) return value;
  if (value.length <= 7) return value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  if (value.length <= 11)
    return value.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
  return value.substring(0, 11).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};
