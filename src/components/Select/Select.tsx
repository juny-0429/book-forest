import { useId } from 'react';
import ReactSelect, { GroupBase, Props } from 'react-select';
import { SelectOption } from 'src/types/select.types';
import DropdownIndicator from './DropdownIndicator/DropdownIndicator';
import CustomSelectOption from './CustomSelectOption/CustomSelectOption';
import { cn } from 'src/lib/utils';

interface SelectProps {
  className?: string;
}

export default function Select<Option extends SelectOption, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>({
  className,
  ...restProps
}: SelectProps & Props<Option, IsMulti, Group>) {
  return (
    <div className={className}>
      <ReactSelect
        {...restProps}
        instanceId={useId()}
        components={{ DropdownIndicator, Option: CustomSelectOption }}
        unstyled={true}
        classNames={{
          control: ({ isFocused }) =>
            `w-full min-w-[250px] h-[48px] px-[20px] bg-white border border-solid border-gray-600 rounded-[8px] text-title-16r
            ${isFocused ? 'ring ring-blue-300' : ''} focus-within:ring focus-within:ring-green-500`,
          menu: () => 'w-full min-w-[250px] mt-2 p-2 bg-white border border-solid border-gray-400 rounded-[8px]',
          menuList: () => 'space-y-1',
          option: ({ isFocused, isSelected, isDisabled }) =>
            cn('h-min pl-5 pr-1 py-[2px] text-body-16r text-gray-800', {
              'bg-gray-200 rounded-[2px]': isSelected || isFocused,
              'bg-white': !isSelected && !isFocused,
              'text-gray-600 bg-gray-300 cursor-not-allowed': isDisabled,
            }),
        }}
        classNamePrefix='react-select'
        isSearchable={false}
      />
    </div>
  );
}
