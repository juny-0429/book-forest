'use client';

import React from 'react';
import Image from 'next/image';
import { Switch } from 'src/components/Switch/Switch';
import Button from 'src/components/Button/Button';
import { useUpdateBannerStatus } from 'src/app/(main)/_hooks/react-query/useUpdateBannerStatus';
import { useGetAdminBannerList } from 'src/app/(main)/_hooks/react-query/useGetAdminBannerList';

export default function SideBannerForm() {
  const { data: sideBannerList, isLoading } = useGetAdminBannerList('side');
  const { mutate: updateBannerStatus, isPending } = useUpdateBannerStatus('side');

  const sideBanner = sideBannerList?.[0];

  const handleToggle = () => {
    if (!sideBanner) return;

    updateBannerStatus({ update_banner_id: sideBanner.banner_id, is_active: !sideBanner.is_active });
  };

  return (
    <section>
      <h3 className='text-title-24r mb-3'>사이드 배너</h3>

      <div className='flex flex-col gap-2'>
        {sideBanner?.banner_image_url ? <Image src={sideBanner.banner_image_url} alt='배너 미리보기' width={100} height={50} /> : <p>이미지가 없습니다.</p>}

        <div className='flex items-center gap-1'>
          <span className='text-body-14b text-ui-text-title'>배너 링크: </span>
          <p className='text-body-14r text-ui-text-description'>{sideBanner?.banner_link}</p>
        </div>

        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Switch id='is-active-mode' checked={sideBanner?.is_active} onCheckedChange={handleToggle} />
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
