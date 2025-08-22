export const formatCurrency = (amount: number): string => {
  return `${Math.round(amount).toLocaleString('vi-VN')} VNĐ`;
};

export const formatCurrencyWithLocale = (
  amount: number, 
  locale: string = 'vi-VN', 
  currency: string = 'VNĐ'
): string => {
  return `${Math.round(amount).toLocaleString(locale)} ${currency}`;
};
