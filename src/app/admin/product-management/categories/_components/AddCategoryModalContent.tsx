'use client';

import React, { useState } from 'react';
import Button from 'src/components/Button/Button';
import Select from 'src/components/Select/Select';
import TextInput from 'src/components/TextInput/TextInput';
import { SelectOption } from 'src/types/select.types';
import { useGetCategoryList } from '../_hooks/react-query/useGetCategoryList';
import { Controller, useForm } from 'react-hook-form';
import { categorySchema, CategorySchema } from 'src/app/admin/_schema/category.schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function AddCategoryModalContent() {
  const [categoryType, setCategoryType] = useState<'TOP' | 'SUB' | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
  });

  console.log('errors = ', errors);

  const values = watch();
  console.log('현재 입력값:', values);

  const { data: categoryTopList } = useGetCategoryList('TOP');

  const categoryLevelOptions: SelectOption[] = [
    { value: 'TOP', label: '대분류' },
    { value: 'SUB', label: '중분류' },
  ];

  const onSubmit = (data: CategorySchema) => {
    console.log('제출 데이터:', data);
  };

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='text-title-24r'>카테고리 추가</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <label className='flex items-center'>
            <span className='w-[150px] text-body-18b text-ui-text-title'>분류</span>
            <Select options={categoryLevelOptions} placeholder='분류를 선택하세요' className='w-full' onChange={(option) => setCategoryType(option?.value as 'TOP' | 'SUB')} />
          </label>

          {categoryType === 'SUB' && (
            <label className='flex items-center'>
              <span className='w-[150px] text-body-18b text-ui-text-title'>대분류 선택</span>
              <Controller
                name='parentCode'
                control={control}
                render={({ field }) => {
                  const selectedOption =
                    categoryTopList
                      ?.map((category) => ({
                        value: category.categoryCode,
                        label: category.categoryName,
                      }))
                      .find((option) => option.value === field.value) ?? null;

                  return (
                    <Select
                      value={selectedOption}
                      onChange={(option) => field.onChange(option?.value ?? '')}
                      options={
                        categoryTopList?.map((category) => ({
                          value: category.categoryCode,
                          label: category.categoryName,
                        })) || []
                      }
                      placeholder='대분류를 선택하세요'
                      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                      menuPosition='fixed'
                      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                      className='w-full'
                    />
                  );
                }}
              />
            </label>
          )}

          <label className='flex items-center'>
            <span className='w-[150px] text-body-18b text-ui-text-title'>카테고리명</span>
            <TextInput {...register('categoryName')} placeholder='카테고리명을 입력하세요.' />
          </label>

          <label className='flex items-center'>
            <span className='w-[150px] text-body-18b text-ui-text-title'>카테고리코드</span>
            <TextInput {...register('categoryCode')} placeholder='카테고리코드를 입력하세요.' />
          </label>

          <Button type='submit' height={48}>
            추가하기
          </Button>
        </div>
      </form>
    </div>
  );
}
