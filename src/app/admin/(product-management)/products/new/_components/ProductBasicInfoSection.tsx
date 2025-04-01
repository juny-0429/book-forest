'use client';

import React from 'react';
import ProductFormItem from './productFormItem';
import TextInput from 'src/components/TextInput/TextInput';
import DatePickerWithTime from 'src/components/DatePickerWithTime/DatePickerWithTime';

export default function ProductBasicInfoSection() {
  return (
    <section className='grid grid-cols-2 gap-x-12 gap-y-6'>
      <ProductFormItem label='상품명'>
        <TextInput placeholder='상품명' />
      </ProductFormItem>

      <ProductFormItem label='작가명'>
        <TextInput placeholder='작가명' />
      </ProductFormItem>

      <div className='col-span-2'>
        <ProductFormItem label='간단소개'>
          <textarea placeholder='간단소개' className='w-full p-5 outline-none bg-transparent border border-solid border-gray-600 rounded-[8px]' />
        </ProductFormItem>
      </div>

      <ProductFormItem label='출판사'>
        <TextInput placeholder='출판사' />
      </ProductFormItem>

      <ProductFormItem label='출판일'>
        <DatePickerWithTime value={null} onChange={() => {}} />
      </ProductFormItem>

      <ProductFormItem label='ISBN'>
        <TextInput type='number' placeholder='ISBN' />
      </ProductFormItem>
    </section>
  );
}
