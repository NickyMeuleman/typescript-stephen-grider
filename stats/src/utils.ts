export const dateStringToDate = (dateString: string): Date => {
  // format DD/MM/YYYY string to Date object
  const dateParts = dateString.split("/").map(
    (val: string): number => {
      return parseInt(val, 10);
    }
  );
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};
