'use client';

import React, { useState } from 'react';
import ProductFormItem from './ProductFormItem';
import TextInput from 'src/components/TextInput/TextInput';
import DatePickerWithTime from 'src/components/DatePickerWithTime/DatePickerWithTime';
import { useFormContext } from 'react-hook-form';
import { useCustomModal } from 'src/hooks/useModal';
import SearchAuthorModalContent from './SearchAuthorModalContent';

export default function ProductBasicInfoSection() {
  const [publishedDate, setPublishedDate] = useState<Date | null>(null);
  const [selectedAuthorName, setSelectedAuthorName] = useState('');

  const { register, setValue } = useFormContext();
  const { openCustomModal } = useCustomModal();

  const searchAuthorModalOpen = () => {
    openCustomModal({
      children: (
        <SearchAuthorModalContent
          onSelect={(author) => {
            setSelectedAuthorName(author.name);
            setValue('authorId', author.id);
          }}
        />
      ),
    });
  };

  const onPublishedDateChange = (date: Date | null) => {
    if (!date) return alert('출판일을 선택해야 합니다.');

    setPublishedDate(date);
    setValue('publishedDate', date);
  };

  return (
    <section className='grid grid-cols-2 gap-x-12 gap-y-6'>
      <ProductFormItem label='상품명'>
        <TextInput {...register('productName')} placeholder='상품명' />
      </ProductFormItem>

      <ProductFormItem label='작가명'>
        <TextInput value={selectedAuthorName} readOnly onClick={searchAuthorModalOpen} placeholder='작가명' />
      </ProductFormItem>

      <div className='col-span-2'>
        <ProductFormItem label='간단소개'>
          <textarea {...register('productSummary')} placeholder='간단소개' className='w-full p-5 outline-none bg-white border border-solid border-gray-600 rounded-[8px]' />
        </ProductFormItem>
      </div>

      <ProductFormItem label='출판사'>
        <TextInput {...register('publisher')} placeholder='출판사' />
      </ProductFormItem>

      <ProductFormItem label='출판일'>
        <DatePickerWithTime value={publishedDate} onChange={onPublishedDateChange} />
      </ProductFormItem>

      <ProductFormItem label='ISBN'>
        <TextInput type='number' {...register('isbn')} placeholder='ISBN' />
      </ProductFormItem>
    </section>
  );
}
