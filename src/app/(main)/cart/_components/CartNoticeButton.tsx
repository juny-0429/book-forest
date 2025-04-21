import React from 'react';
import LineButton from 'src/components/Button/LineButton';
import { useCustomModal } from 'src/hooks/useModal';

export default function CartNoticeButton() {
  const { openCustomModal } = useCustomModal();

  const onCartNoticeModalOpen = () => {
    openCustomModal({
      children: (
        <div className='flex flex-col gap-5'>
          <h2 className='text-title-24b text-ui-text-title'>장바구니 유의사항</h2>
          <ul className='flex flex-col gap-1 list-disc pl-5 text-body-16l text-ui-text-description'>
            <li>장바구니에 담긴 상품은 재고가 확보된 상태가 아닙니다. 결제 완료 시점에 재고가 소진될 수 있습니다.</li>
            <li>
              장바구니에 담긴 상품은 최대 30일간 보관되며, 이후 자동 삭제될 수 있습니다. <br />
              (※ 비회원은 브라우저/기기별로 저장되며, 삭제될 수 있습니다.)
            </li>
            <li>일부 한정 상품은 장바구니에 담기만으로는 구매가 보장되지 않습니다.</li>
            <li>장바구니에 담긴 상품의 가격, 할인율, 혜택 등은 변동될 수 있습니다.</li>
            <li>동일 상품을 중복 담는 경우, 기존 수량에 추가됩니다.</li>
          </ul>
        </div>
      ),
    });
  };

  return (
    <LineButton height={40} className='w-fit mt-5' onClick={onCartNoticeModalOpen}>
      장바구니 유의사항
    </LineButton>
  );
}
