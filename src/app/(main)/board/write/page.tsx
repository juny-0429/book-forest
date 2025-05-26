'use client';

import React from 'react';
import Button from 'src/components/Button/Button';
import Select from 'src/components/Select/Select';
import TextInput from 'src/components/TextInput/TextInput';
import { SelectOption } from 'src/types/select.types';
import { useGetBoardCategory } from './_hooks/react-query/useGetBoardCategory';
import { useForm } from 'react-hook-form';
import { boardWriteFormSchema, BoardWriteFormSchema } from './_schemas/BoardWriteFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function BoardWritePage() {
  const { data: categories = [] } = useGetBoardCategory();

  const options: SelectOption[] = categories.map((category) => ({
    value: category.boardCode,
    label: category.boardName,
  }));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BoardWriteFormSchema>({
    resolver: zodResolver(boardWriteFormSchema),
    mode: 'onChange',
  });

  const onSubmit = ({}: BoardWriteFormSchema) => {};

  return (
    <div className='flex flex-col gap-10 w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <label className='flex items-center'>
          <span className='w-[150px] text-body-18b text-ui-text-title'>카테고리</span>
          <Select options={options} placeholder='카테고리를 선택하세요' />
        </label>

        <label className='flex items-center'>
          <span className='w-[150px] shrink-0 text-body-18b text-ui-text-title'>제목</span>
          <TextInput placeholder='제목을 입력해주세요.' />
        </label>

        <hr className='w-full h-[2px] bg-gray-300' />

        <label className='flex items-center'>
          <span className='w-[150px] shrink-0 text-body-18b text-ui-text-title'>내용</span>
          <textarea placeholder='내용을 입력해주세요.' className='w-full h-[200px] p-5 outline-none bg-transparent border border-solid border-gray-600 rounded-[8px]' />
        </label>

        <label className='flex items-center'>
          <span className='w-[150px] shrink-0 text-body-18b text-ui-text-title'>이미지 첨부</span>
          <TextInput type='file' />
        </label>
      </form>

      <div className='flex justify-center items-center w-full'>
        <Button type='submit' height={56} className='w-[200px]'>
          작성하기
        </Button>
      </div>
    </div>
  );
}
