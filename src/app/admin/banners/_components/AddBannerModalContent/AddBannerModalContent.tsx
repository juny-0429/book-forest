'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePickerWithTime from 'src/components/DatePickerWithTime/DatePickerWithTime';
import Select from 'src/components/Select/Select';
import TextInput from 'src/components/TextInput/TextInput';
import { SelectOption } from 'src/types/select.types';
import { createBannerSchema, CreateBannerSchema } from '../../_schemas/createBanner.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'src/components/Button/Button';
import Radio from 'src/components/Radio/Radio';
import { BannerPositionType } from 'src/types/bannerPosition.types';
import { useBannerUpload } from '../../_hooks/useBannerUpload';
import Image from 'next/image';
import BannerSizeInfo from './BannerSizeInfo';
import { useCreateBanner } from '../../_hooks/react-query/useCreateBaanner';

const options: SelectOption[] = [
  { value: 'main', label: '메인베너' },
  { value: 'side', label: '사이드배너' },
  { value: 'dual', label: '듀얼배너' },
  { value: 'triple', label: '트리플배너' },
  { value: 'category', label: '카테고리배너' },
  { value: 'showHide', label: 'Show & Hide 배너' },
  { value: 'popup', label: '팝업배너' },
];

export default function AddBannerModalContent() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { onImageUpload, deleteImage, markAsSubmitted, imageUrl } = useBannerUpload();
  const { mutateAsync } = useCreateBanner();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateBannerSchema>({
    resolver: zodResolver(createBannerSchema),
    defaultValues: {
      banner_link: 'https://',
      banner_image_url: '',
    },
    mode: 'onSubmit',
  });

  // 배너 시작일 선택
  const onStartDateChange = (date: Date | null) => {
    if (!date) return alert('배너 시작일을 선택해야 합니다.');

    setStartDate(date);
    setValue('banner_start_date', date);
  };

  // 배너 종료일 선택
  const onEndDateChange = (date: Date | null) => {
    if (!date) return alert('배너 종료일을 선택해야 합니다.');

    setEndDate(date);
    setValue('banner_end_date', date);
  };

  const onSubmit = async (data: CreateBannerSchema) => {
    if (!imageUrl) return alert('이미지를 업로드해야 합니다.');
    if (!startDate) return alert('배너 시작일을 선택해야 합니다.');
    if (!endDate) return alert('배너 종료일을 선택해야 합니다.');

    try {
      await mutateAsync({
        ...data,
        banner_image_url: imageUrl,
        banner_start_date: startDate,
        banner_end_date: endDate,
      });

      markAsSubmitted();
    } catch (error) {}
  };

  useEffect(() => {
    if (imageUrl) setValue('banner_image_url', imageUrl);
  }, [imageUrl]);

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='text-title-24b text-ui-text-title'>배너 등록</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>카테고리</span>
          <Select
            placeholder='배너 카테고리 선택'
            options={options}
            value={options.find((option) => option.value === watch('banner_position')) ?? null}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setValue('banner_position', selectedOption.value as BannerPositionType);
              }
            }}
            className='w-full'
          />
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>배너명</span>
          <TextInput {...register('banner_name')} placeholder='배너명을 입력하세요.' />
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>배너 링크</span>
          <TextInput {...register('banner_link')} placeholder='배너와 연결할 주소를 입력하세요.' />
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>배너 설명</span>
          <TextInput {...register('banner_description')} placeholder='배너 설명을 입력하세요.' />
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>배너 시작일</span>
          <DatePickerWithTime value={startDate} onChange={onStartDateChange} />
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>배너 종료일</span>
          <DatePickerWithTime value={endDate} onChange={onEndDateChange} />
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>이미지 첨부</span>
          <TextInput
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={onImageUpload}
            isDirty={!!imageUrl}
            onClear={() => {
              deleteImage();
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          />
          {imageUrl && <Image src={imageUrl} width={100} height={100} alt='업로드된 이미지' />}
        </label>

        <label className='flex items-center gap-1'>
          <span className='w-[100px] flex-shrink-0 text-body-16r text-nowrap'>활성화 여부</span>
          <Radio checked={watch('is_active') === true} onChange={() => setValue('is_active', true)}>
            활성화
          </Radio>
          <Radio checked={watch('is_active') === false} onChange={() => setValue('is_active', false)}>
            비활성화
          </Radio>
        </label>

        <Button type='submit' height={48}>
          등록하기
        </Button>
      </form>

      <BannerSizeInfo />
    </div>
  );
}
