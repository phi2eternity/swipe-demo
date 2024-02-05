export const getDateString = (day : number, month : number , year : number) : string => {
  const monthStr = (month + 1 < 10) ? '0' + (month + 1) : month + 1;
  const dayStr = (day < 10) ? '0' + day : day;
  return `${year}-${monthStr}-${dayStr}`;
}
