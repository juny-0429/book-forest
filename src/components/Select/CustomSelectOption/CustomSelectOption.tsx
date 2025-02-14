import { GroupBase, OptionProps, components } from 'react-select';
import LucideIcon from 'src/theme/lucideIcon';
import { SelectOption } from 'src/types/select.types';

export default function CustomSelectOption<Option extends SelectOption, IsMulti extends boolean, Group extends GroupBase<Option>>(props: OptionProps<Option, IsMulti, Group>) {
  return (
    <components.Option {...props}>
      <div className='flex justify-between items-center'>
        {props.label}
        {props.isSelected && <LucideIcon.Check size={16} />}
      </div>
    </components.Option>
  );
}
