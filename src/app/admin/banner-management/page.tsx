'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from 'src/components/Button/Button';
import { Switch } from 'src/components/Switch/Switch';
import SampleBannerImg from '@/assets/images/sample-banner-1.png';
import { useAlertModal, useCustomModal } from 'src/hooks/useModal';
import AddBannerModalContent from './_components/AddBannerModalContent';
import SideBannerForm from './_components/SideBannerForm';
import DualBannerForm from './_components/DualBannerForm';
import TripleBannerForm from './_components/TripleBaannerForm';
import CategoryBannerForm from './_components/CategoryBannerForm';
import MainBannerForm from './_components/MainBannerForm';

export default function BannerManagementPage() {
  const { openAlertModal } = useAlertModal();
  const { openCustomModal } = useCustomModal();

  const onAddBannerModal = () => {
    openCustomModal({
      children: <AddBannerModalContent />,
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

      <div className='flex flex-col gap-20'>
        <MainBannerForm />
        <SideBannerForm />
        <DualBannerForm />
        <TripleBannerForm />
        <CategoryBannerForm />
      </div>
    </div>
  );
}
