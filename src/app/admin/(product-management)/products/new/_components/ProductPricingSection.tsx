'use client';

import React from 'react';
import ProductFormItem from './ProductFormItem';
import TextInput from 'src/components/TextInput/TextInput';
import { SelectOption } from 'src/types/select.types';
import Select from 'src/components/Select/Select';
import { Controller, useFormContext } from 'react-hook-form';
import Radio from 'src/components/Radio/Radio';

const options: SelectOption[] = [
  { value: '0', label: '무료배송' },
  { value: '3000', label: '기본배송비 3,000원' },
];

export default function ProductPricingSection() {
  const { register, watch, setValue, control } = useFormContext();

  return (
    <section className='grid grid-cols-2 gap-x-12 gap-y-6'>
      <ProductFormItem label='가격'>
        <TextInput type='number' {...register('price')} placeholder='가격' />
      </ProductFormItem>

      <ProductFormItem label='할인율'>
        <TextInput type='number' {...register('discount')} placeholder='할인율' />
      </ProductFormItem>

      <ProductFormItem label='배송비'>
        <Controller
          name='deliveryInfo'
          control={control}
          render={({ field }) => (
            <Select
              options={options}
              placeholder='배송비'
              onChange={(option) => field.onChange(option ? Number(option.value) : null)}
              value={field.value ? options.find((opt) => opt.value === String(field.value)) : null}
              className='w-full'
              menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
              menuPosition='fixed'
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          )}
        />
      </ProductFormItem>

      <ProductFormItem label='재고'>
        <TextInput type='number' {...register('stock')} placeholder='재고' />
      </ProductFormItem>

      <ProductFormItem label='활성화 여부'>
        <Radio checked={watch('isActive') == true} onChange={() => setValue('isActive', true)}>
          활성화
        </Radio>
        <Radio checked={watch('isActive') == false} onChange={() => setValue('isActive', false)}>
          비활성화
        </Radio>
      </ProductFormItem>
    </section>
  );
}
