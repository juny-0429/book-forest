'use client';

import React from 'react';
import ProductFormItem from './productFormItem';
import TextInput from 'src/components/TextInput/TextInput';
import { SelectOption } from 'src/types/select.types';
import Select from 'src/components/Select/Select';
import { Switch } from 'src/components/Switch/Switch';

const options: SelectOption[] = [
  { value: '0', label: '무료배송' },
  { value: '3000', label: '기본배송비 3,000원' },
];

export default function ProductPricingSection() {
  return (
    <section className='grid grid-cols-2 gap-x-12 gap-y-6'>
      <ProductFormItem label='가격'>
        <TextInput type='number' placeholder='가격' />
      </ProductFormItem>

      <ProductFormItem label='할인율'>
        <TextInput type='number' placeholder='할인율' />
      </ProductFormItem>

      <ProductFormItem label='배송비'>
        <Select options={options} placeholder='배송비' />
      </ProductFormItem>

      <ProductFormItem label='재고'>
        <TextInput type='number' placeholder='재고' />
      </ProductFormItem>

      <ProductFormItem label='활성화 여부'>
        <Switch />
      </ProductFormItem>
    </section>
  );
}
