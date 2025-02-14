import { components, DropdownIndicatorProps, type GroupBase } from 'react-select';
import LucideIcon from 'src/theme/lucideIcon';
import { SelectOption } from 'src/types/select.types';

export default function DropdownIndicator<Option extends SelectOption, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) {
  return (
    <components.DropdownIndicator {...props}>
      <LucideIcon.ChevronDown size={24} />
    </components.DropdownIndicator>
  );
}
