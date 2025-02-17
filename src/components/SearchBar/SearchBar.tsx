import { forwardRef } from 'react';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';

interface SearchBarProps extends Omit<TextInputProps, 'isError' | 'rightIcon'> {}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({ ...restProps }, ref) => {
  return <TextInput ref={ref} {...restProps} rightIcon={<LucideIcons.Search />} placeholder='검색어를 입력해주세요.' />;
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
