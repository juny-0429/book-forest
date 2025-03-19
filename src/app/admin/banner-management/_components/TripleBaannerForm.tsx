'use client';

import React from 'react';
import Image from 'next/image';
import { Switch } from 'src/components/Switch/Switch';
import Button from 'src/components/Button/Button';
import { useUpdateBannerStatus } from 'src/app/(main)/_hooks/react-query/useUpdateBannerStatus';
import { useGetAdminBannerList } from 'src/app/(main)/_hooks/react-query/useGetAdminBannerList';
import { useDeleteBanner } from 'src/app/(main)/_hooks/react-query/useDeleteBanner';

export default function TripleBannerForm() {
  const { data: sideBannerList, isLoading } = useGetAdminBannerList('triple');
  const { mutate: updateBannerStatus, isPending } = useUpdateBannerStatus('triple');
  const { mutate: deleteBanner, isPending: isDeleting } = useDeleteBanner('triple');

  const handleToggle = (banner_id: number, is_active: boolean) => {
    updateBannerStatus({ update_banner_id: banner_id, is_active: !is_active });
  };

  const handleDelete = (banner_id: number) => {
    if (confirm('정말로 이 배너를 삭제하시겠습니까?')) {
      deleteBanner(banner_id);
    }
  };

  return (
    <section>
      <h3 className='text-title-24r mb-3'>트리플 배너</h3>

      <div className='flex items-center gap-5'>
        {sideBannerList &&
          sideBannerList.map((banner) => (
            <div key={banner.banner_id} className='flex flex-col gap-2 w-[300px]'>
              <Image src={banner.banner_image_url} alt='배너 미리보기' width={300} height={150} priority={true} />

              <div className='flex items-center gap-1'>
                <span className='text-body-14b text-ui-text-title'>배너 링크: </span>
                <p className='text-body-14r text-ui-text-description'>{banner.banner_link}</p>
              </div>

              <div className='flex justify-between items-center gap-2'>
                <div className='flex items-center gap-2'>
                  <Switch id='is-active-mode' checked={banner.is_active} onCheckedChange={() => handleToggle(banner.banner_id, banner.is_active)} />
                  <label htmlFor={`is-active-${banner.banner_id}`} className='text-body-14m'>
                    {banner.is_active ? '활성화' : '비활성화'}
                  </label>
                </div>

                <Button height={32} color='gray' className='w-fit' onClick={() => handleDelete(banner.banner_id)} disabled={isDeleting}>
                  삭제
                </Button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
