import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from 'src/lib/utils';

export default function DatePickerWithTime({ value, onChange }: { value: Date | null; onChange: (date: Date | null) => void }) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      showTimeSelect // ✅ 시간 선택 활성화
      timeFormat='HH:mm' // ✅ 24시간 형식
      timeIntervals={30} // ✅ 30분 단위 선택 가능
      dateFormat='yyyy-MM-dd HH:mm' // ✅ 날짜 + 시간 형식
      placeholderText='날짜를 선택하여 주세요.'
      wrapperClassName='w-full'
      customInput={
        <input
          readOnly
          className='flex items-center w-full h-[48px] px-4 gap-2 rounded-[8px] text-body-16m text-ui-text-title placeholder-ui-text-description bg-white border border-solid border-gray-600'
        />
      }
    />
  );
}
