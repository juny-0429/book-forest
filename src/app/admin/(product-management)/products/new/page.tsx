import React from 'react';
import TextInput from 'src/components/TextInput/TextInput';
import ProductImageSection from './_components/ProductImageSection';
import ProductPricingSection from './_components/ProductPricingSection';
import ProductBasicInfoSection from './_components/ProductBasicInfoSection';
import Button from 'src/components/Button/Button';

export default function ProductNewPage() {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <h2 className='text-title-32b mb-6'>상품 등록</h2>

      <form className='flex flex-col gap-12 w-full'>
        <ProductImageSection />

        <hr className='w-full h-[2px] bg-gray-400' />

        <ProductBasicInfoSection />

        <hr className='w-full h-[2px] bg-gray-400' />

        <ProductPricingSection />

        <Button height={48}>상품 등록</Button>
      </form>
    </div>
  );
}
