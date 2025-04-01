import React from 'react';
import ProductFormItem from './productFormItem';
import TextInput from 'src/components/TextInput/TextInput';

export default function ProductPricingSection() {
  return (
    <section className='grid grid-cols-2 gap-x-12 gap-y-6'>
      <ProductFormItem label='가격'>
        <TextInput placeholder='가격' />
      </ProductFormItem>

      <ProductFormItem label='할인율'>
        <TextInput placeholder='할인율' />
      </ProductFormItem>

      <ProductFormItem label='배송비'>
        <TextInput placeholder='배송비' />
      </ProductFormItem>

      <ProductFormItem label='재고'>
        <TextInput placeholder='재고' />
      </ProductFormItem>

      <ProductFormItem label='활성화 여부'>
        <TextInput placeholder='활성화 여부' />
      </ProductFormItem>
    </section>
  );
}
