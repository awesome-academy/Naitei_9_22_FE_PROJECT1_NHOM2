
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateShort = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateWithOptions = (
  dateString: string,
  options: Intl.DateTimeFormatOptions,
  locale: string = 'vi-VN'
): string => {
  return new Date(dateString).toLocaleDateString(locale, options);
};
