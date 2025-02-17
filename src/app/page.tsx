import TextInput from 'src/components/TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';

export default function Home() {
  return (
    <div className='w-[250px] border-state-error'>
      <TextInput isDirty rightIcon={<LucideIcons.Search />} />
      <TextInput isError isDirty placeholder='테스트 중 입니다' />
      <TextInput placeholder='안녕하세요 테스트' disabled />
      <TextInput disabled />
    </div>
  );
}
