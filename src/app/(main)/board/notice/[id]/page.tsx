import React from 'react';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';

export default function BoardDetailPage() {
  return (
    <div className='flex flex-col gap-5'>
      <section className='flex flex-col gap-2'>
        <h2 className='text-title-24r text-ui-text-title'>배송관련 안내</h2>

        <div className='flex items-center gap-2'>
          <span className='text-body-16r text-ui-text-description'>juny_0429</span>
          <hr className='w-[1px] h-2 bg-gray-600' />
          <time className='text-body-16r text-ui-text-description'>2025-12-12</time>
        </div>
      </section>

      <hr className='w-full h-[1px] bg-gray-600' />

      <section className='p-3'>
        <p className='text-body-16r text-ui-text-title'>
          안녕하세요, 책숲 운영팀입니다. 최근 사이트 이용자분들의 편의를 위해 몇 가지 중요한 변경 사항이 있어 안내드립니다. 1️⃣ **배송 시스템 개선** 이제 주문하신 도서는 **평균 1~2일 내에 배송**됩니다.
          더 빠른 배송을 위해 물류 시스템을 최적화하였으며, 일부 지역에서는 당일 배송 서비스도 제공될 예정입니다. 2️⃣ **적립금 제도 개편** 도서 구매 시 기본 적립금이 기존 1%에서 **2%로
          상향**되었습니다. 또한, 리뷰 작성 시 추가 적립금을 제공하니 많은 참여 부탁드립니다. 3️⃣ **고객센터 운영 시간 변경** 더 원활한 상담을 위해 고객센터 운영 시간이 조정되었습니다. 📌 **운영
          시간:** 평일 오전 9시 ~ 오후 7시 (주말 및 공휴일 휴무) 앞으로도 더 나은 서비스로 찾아뵙겠습니다. 감사합니다. 😊{' '}
        </p>
      </section>

      <hr className='w-full h-[1px] bg-gray-600' />

      <section className='flex flex-col gap-4'>
        <form className='flex justify-center items-center gap-2'>
          <TextInput placeholder='욕설 및 부적절한 내용은 노출에서 제외될 수 있습니다.' />
          <Button height={48} className='w-[100px]'>
            등록
          </Button>
        </form>

        <div>
          <ul className='flex flex-col gap-5'>
            <li className='flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <span className='text-body-16r text-ui-text-description'>juny_0429</span>
                <hr className='w-[1px] h-2 bg-gray-600' />
                <time className='text-body-16r text-ui-text-description'>2025-12-12</time>
              </div>

              <p className='text-body-16m text-ui-text-title'>잘보고 갑니다.</p>
            </li>
            <li className='flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <span className='text-body-16r text-ui-text-description'>juny_0429</span>
                <hr className='w-[1px] h-2 bg-gray-600' />
                <time className='text-body-16r text-ui-text-description'>2025-12-12</time>
              </div>

              <p className='text-body-16m text-ui-text-title'>잘보고 갑니다.</p>
            </li>
            <li className='flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <span className='text-body-16r text-ui-text-description'>juny_0429</span>
                <hr className='w-[1px] h-2 bg-gray-600' />
                <time className='text-body-16r text-ui-text-description'>2025-12-12</time>
              </div>

              <p className='text-body-16m text-ui-text-title'>잘보고 갑니다.</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
