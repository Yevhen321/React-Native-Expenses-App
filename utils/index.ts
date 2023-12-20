export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date object");
  }

  return date.toISOString().slice(0, 10);
};

export const getDatesMinusDays = (date: Date, days: number) => {
  return new Date(
    date?.getFullYear(),
    date?.getMonth(),
    date?.getDate() - days
  );
};
