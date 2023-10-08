export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();

  return `${day} ${month} ${year}`;
};
