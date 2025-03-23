export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('URL이 복사되었습니다!');
  } catch (err) {
    alert('URL 복사에 실패했습니다.');
  }
};
