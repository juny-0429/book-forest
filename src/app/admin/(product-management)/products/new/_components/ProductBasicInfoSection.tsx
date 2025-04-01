import React from 'react';
import ProductFormItem from './productFormItem';
import TextInput from 'src/components/TextInput/TextInput';

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
          <TextInput placeholder='간단 소개' />
        </ProductFormItem>
      </div>

      <ProductFormItem label='출판사'>
        <TextInput placeholder='출판사' />
      </ProductFormItem>

      <ProductFormItem label='출판일'>
        <TextInput placeholder='출판일' />
      </ProductFormItem>

      <ProductFormItem label='ISBN'>
        <TextInput placeholder='ISBN' />
      </ProductFormItem>
    </section>
  );
}
