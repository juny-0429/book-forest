import React from 'react';
import ProductFormItem from './productFormItem';
import TextInput from 'src/components/TextInput/TextInput';

export default function ProductImageSection() {
  return (
    <section className='flex flex-col gap-6'>
      <ProductFormItem label='대표이미지'>
        <TextInput placeholder='대표이미지' />
      </ProductFormItem>

      <ProductFormItem label='상세이미지'>
        <TextInput placeholder='상세이미지' />
      </ProductFormItem>
    </section>
  );
}
