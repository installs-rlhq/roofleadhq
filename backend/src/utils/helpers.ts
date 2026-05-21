export const formatPhoneNumber = (phone: string): string => {
  // Basic US phone formatting
  const cleaned = phone.replace(/\D/g, '');
  return `+1${cleaned}`;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
