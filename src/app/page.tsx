import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage';
import TextInput from 'src/components/TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';

export default function Home() {
  return (
    <div className='w-[250px] border-state-error'>
      <TextInput className='w-[300px]' isDirty rightIcon={<LucideIcons.Search />} />
      <TextInput isError isDirty placeholder='테스트 중 입니다' />
      <TextInput placeholder='안녕하세요 테스트' disabled />
      <TextInput disabled />
      <ErrorMessage className='font-bold'>sdfdsf</ErrorMessage>
    </div>
  );
}
