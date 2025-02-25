import { forwardRef } from 'react';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';

interface SearchBarProps extends Omit<TextInputProps, 'isError' | 'rightIcon'> {}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({ className, ...restProps }, ref) => {
  return <TextInput type='search' ref={ref} {...restProps} rightIcon={<LucideIcons.Search />} className={className} />;
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
