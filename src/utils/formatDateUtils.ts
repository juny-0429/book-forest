export function formatPublishedDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}
