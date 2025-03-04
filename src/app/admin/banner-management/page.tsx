'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from 'src/components/Button/Button';
import { Switch } from 'src/components/Switch/Switch';
import SampleBannerImg from '@/assets/images/sample-banner-1.png';
import { useAlertModal, useCustomModal } from 'src/hooks/useModal';
import AddBannerModalContent from './_components/AddBannerModalContent';

interface Banner {
  id: number;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
}

const bannerSections = [
  { key: 'home-main', label: '홈 - 메인배너', multiple: true }, // ✅ 여러 개 가능
  { key: 'home-side', label: '홈 - 사이드배너', multiple: false },
  { key: 'home-double', label: '홈 - 더블배너', multiple: false },
  { key: 'home-triple', label: '홈 - 트리플배너', multiple: false },
  { key: 'category-event', label: '카테고리 페이지 - 이벤트 배너', multiple: true }, // ✅ 여러 개 가능
];

export default function BannerManagementPage() {
  const [banners, setBanners] = useState<{ [key: string]: Banner[] }>({
    'home-main': [
      { id: 1, imageUrl: SampleBannerImg.src, linkUrl: 'https://example.com/1', isActive: true },
      { id: 2, imageUrl: SampleBannerImg.src, linkUrl: 'https://example.com/2', isActive: true },
      { id: 3, imageUrl: SampleBannerImg.src, linkUrl: 'https://example.com/3', isActive: false },
    ],
    'home-side': [],
    'home-double': [],
    'home-triple': [],
    'category-event': [],
  });

  const { openAlertModal } = useAlertModal();
  const { openCustomModal } = useCustomModal();

  const onAddBannerModal = () => {
    openCustomModal({
      children: <AddBannerModalContent />,
    });
  };

  const handleDeleteBanner = (section: string, id: number) => {
    openAlertModal({
      content: '정말로 삭제하시겠습니까?',
      onConfirm: () => {
        setBanners((prev) => ({
          ...prev,
          [section]: prev[section].filter((banner) => banner.id !== id),
        }));
      },
    });
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-title-32b mb-6'>배너 관리</h2>

        <Button height={56} className='w-fit' onClick={onAddBannerModal}>
          배너 등록
        </Button>
      </div>

      {bannerSections.map((section) => (
        <div key={section.key} className='border rounded-lg p-4 mb-6'>
          <h3 className='text-title-24r mb-3'>{section.label}</h3>

          {/* 배너 미리보기 (여러 개 가능) */}
          {banners[section.key].length > 0 ? (
            <div className='flex gap-4 overflow-x-auto py-2'>
              {banners[section.key].map((banner) => (
                <div key={banner.id} className='relative flex flex-col gap-2'>
                  <Image src={banner.imageUrl} alt='배너 미리보기' width={200} height={100} className='rounded-lg border' />

                  <div className='flex flex-col'>
                    <span className='text-body-14b text-ui-text-title'>배너 링크: </span>
                    <p className='text-body-14r text-ui-text-description'>{banner.linkUrl}</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <div className='mt-2 flex items-center gap-2'>
                      <Switch id='is-active-mode' />
                      <label htmlFor='is-active-mode' className='text-body-14m text-ui-text-body'>
                        {banner.isActive ? '활성화' : '비활성화'}
                      </label>
                    </div>

                    <Button height={32} color='gray' className='w-fit' onClick={() => handleDeleteBanner(section.key, banner.id)}>
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-body-16r text-ui-text-description'>등록된 배너가 없습니다.</p>
          )}
        </div>
      ))}
    </div>
  );
}
