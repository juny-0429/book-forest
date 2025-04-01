'use client';

import React from 'react';
import ProductImageSection from './_components/ProductImageSection';
import ProductPricingSection from './_components/ProductPricingSection';
import ProductBasicInfoSection from './_components/ProductBasicInfoSection';
import Button from 'src/components/Button/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { createProductSchema, CreateProductSchema } from './_schema/createProduct.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ProductNewPage() {
  const methods = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    mode: 'onSubmit',
    defaultValues: {
      isActive: false,
      deliveryInfo: 3000,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const values = methods.watch();

  // console.table(errors);
  console.table(values);

  const onSubmit = () => {};

  return (
    <div className='flex flex-col gap-6 w-full'>
      <h2 className='text-title-32b mb-6'>상품 등록</h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-12 w-full'>
          <ProductImageSection />

          <hr className='w-full h-[2px] bg-gray-400' />

          <ProductBasicInfoSection />

          <hr className='w-full h-[2px] bg-gray-400' />

          <ProductPricingSection />

          <Button type='submit' height={48}>
            상품 등록
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
