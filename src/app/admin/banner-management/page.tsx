'use client';

import Button from 'src/components/Button/Button';
import { useCustomModal } from 'src/hooks/useModal';
import AddBannerModalContent from './_components/AddBannerModalContent/AddBannerModalContent';
import SideBannerForm from './_components/SideBannerForm';
import DualBannerForm from './_components/DualBannerForm';
import TripleBannerForm from './_components/TripleBaannerForm';
import CategoryBannerForm from './_components/CategoryBannerForm';
import MainBannerForm from './_components/MainBannerForm';

export default function BannerManagementPage() {
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
