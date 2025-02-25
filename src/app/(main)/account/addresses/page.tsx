import React from 'react';
import Button from 'src/components/Button/Button';
import IconButton from 'src/components/Button/IconButton';
import LineButton from 'src/components/Button/LineButton';
import Radio from 'src/components/Radio/Radio';
import SearchBar from 'src/components/SearchBar/SearchBar';
import LucideIcons from 'src/theme/lucideIcon';

// todo: 최대 배송지 10개 넘을 시 모달창 알림 띄우기
export default function AddressesPage() {
  const mockAddressList = Array.from({ length: 3 }, (_, index) => ({
    id: `${index + 1}`,
    title: `우리집 ${index + 1}`,
    recipientName: '홍길동', // 받는이 이름
    recipientPhone: '010-1234-5678', // 받는이 전화번호
    address: '서울특별시 강남구 테헤란로 123', // 받는이 주소
    detailAddress: '101동 202호', // 상세 주소
  }));

  return (
    <div className='flex flex-col w-full gap-[60px]'>
      <h2 className='text-title-24b text-ui-text-title'>배송지 목록 ({mockAddressList.length})</h2>

      <div className='flex flex-col items-center'>
        <section className='flex justify-between w-full'>
          <form className='flex justify-center items-center gap-1'>
            <SearchBar placeholder="'수령인'을 입력하세요" />
            <Button height={48} className='w-fit'>
              변경
            </Button>
          </form>

          <div className='flex justify-center items-center gap-5'>
            <small className='text-body-14r text-ui-text-description'>*배송지는 최대 10개만 등록 가능합니다.</small>
            <LineButton height={48} color='gray' leftIcon={<LucideIcons.Plus size={20} className='text-gray-900' />} className='w-fit'>
              새 배송지 등록
            </LineButton>
          </div>
        </section>

        <hr className='w-full h-[2px] mt-4 bg-gray-600' />

        <section className='w-full'>
          <ul>
            {mockAddressList &&
              mockAddressList.map((address, index) => (
                <li key={address.id} className='flex items-center gap-5 w-full p-[30px] border-b border-solid border-gray-300'>
                  <Radio />

                  <div className='flex justify-between items-center w-full'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-body-18b text-ui-text-title'>{address.title}</h3>

                      <dl className='flex items-center gap-2'>
                        <dt className='sr-only'>받는이</dt>
                        <dd className='text-body-14r text-ui-text-body'>{address.recipientName}</dd>
                        <hr className='w-[1px] h-2 bg-gray-600' />
                        <dt className='sr-only'>전화번호</dt>
                        <dd className='text-body-14r text-ui-text-body'>{address.recipientPhone}</dd>
                      </dl>

                      <address className='text-body-14r text-ui-text-description'>
                        {address.address}, {address.detailAddress}
                      </address>
                    </div>

                    <div className='flex justify-center items-center gap-1'>
                      <IconButton height={40}>
                        <LucideIcons.PencilLine size={20} className='text-gray-600' />
                      </IconButton>

                      <IconButton height={40}>
                        <LucideIcons.Trash2 size={20} className='text-gray-600' />
                      </IconButton>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </section>

        <Button height={48} className='mt-[60px] w-fit'>
          기본 배송지로 변경
        </Button>
      </div>
    </div>
  );
}
