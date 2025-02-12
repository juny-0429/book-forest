import BaseButton from 'src/components/Button/Button';
import LineButton from 'src/components/Button/LineButton';

export default function Home() {
  return (
    <div>
      <BaseButton height={32}>ㄴㅁㅇㄹ</BaseButton>
      <LineButton>ㄴㅇㄹㅇㄴㄹㄴ</LineButton>
      <LineButton height={40}>ㄴㅇㄹㅇㄴㄹㄴ</LineButton>
    </div>
  );
}
