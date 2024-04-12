export function getFormatedDate(dateToDisplay:Date): string {
  const year    = dateToDisplay.getFullYear();
  const month   = padZero(dateToDisplay.getMonth() + 1);
  const day     = padZero(dateToDisplay.getDate());
  const hours   = padZero(dateToDisplay.getHours());
  const minutes = padZero(dateToDisplay.getMinutes());
  const seconds = padZero(dateToDisplay.getSeconds());

  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
