import { forwardRef, KeyboardEvent } from 'react';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';

interface SearchBarProps extends Omit<TextInputProps, 'isError' | 'rightIcon'> {
  onSearch?: () => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({ className, onSearch, onKeyDown, ...restProps }, ref) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.();
    }
    onKeyDown?.(e);
  };

  return (
    <TextInput
      type='search'
      ref={ref}
      {...restProps}
      onKeyDown={handleKeyDown}
      rightIcon={
        <button type='button' onClick={onSearch}>
          <LucideIcons.Search />
        </button>
      }
      className={className}
    />
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
