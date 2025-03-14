'use client';

import React from 'react';
import Image from 'next/image';
import { useGetBannerList } from 'src/app/(main)/_hooks/react-query/useGetBannerList';
import { Switch } from 'src/components/Switch/Switch';
import Button from 'src/components/Button/Button';

export default function SideBannerForm() {
  const { data: sideBannerList, isLoading } = useGetBannerList('side');

  const sideBanner = sideBannerList?.[0] ?? null;

  return (
    <section>
      <h3 className='text-title-24r mb-3'>사이드 배너</h3>

      <div className='flex flex-col gap-2'>
        <Image src={sideBanner?.banner_image_url || ''} alt='배너 미리보기' width={100} height={50} />

        <div className='flex items-center gap-1'>
          <span className='text-body-14b text-ui-text-title'>배너 링크: </span>
          <p className='text-body-14r text-ui-text-description'>{sideBanner?.banner_link}</p>
        </div>

        <div className='flex items-center gap-2'>
          <div className='mt-2 flex items-center gap-2'>
            <Switch id='is-active-mode' />
            <label htmlFor='is-active-mode' className='text-body-14m text-ui-text-body'>
              {sideBanner?.is_active ? '활성화' : '비활성화'}
            </label>
          </div>

          <Button height={32} color='gray' className='w-fit'>
            삭제
          </Button>
        </div>
      </div>
    </section>
  );
}
