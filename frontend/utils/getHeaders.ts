export const getHeaders = () => {
  return {
    'Authorization': `Basic ${JSON.parse(localStorage?.getItem('user') ?? 'null')?.token}`,
    'X-CSRF-TOKEN': JSON.parse(localStorage?.getItem('user') ?? 'null')?.jwtToken || '',
  };
}