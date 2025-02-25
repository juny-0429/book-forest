import React from 'react';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';

export default function AddressModalContent() {
  return (
    <div className='flex flex-col gap-5 h-full'>
      <h2 className='text-lg font-bold'>배송지 추가</h2>

      <form className='flex flex-col gap-5'>
        <label className='flex flex-col gap-2'>
          <span className='text-body-14b text-ui-text-title'>배송지명</span>

          <div className='flex flex-col gap-1'>
            <TextInput placeholder='배송지명을 입력하세요' />
            <small className='text-caption-12r text-ui-text-caption'>*최대 7글자가지 자유롭게 수정 가능합니다.</small>
          </div>
        </label>

        <fieldset className='flex flex-col gap-2'>
          <div>
            <legend className='text-body-14b text-ui-text-title'>받는분</legend>
          </div>

          <div className='flex flex-col gap-1'>
            <TextInput placeholder='이름을 입력하세요.' />
            <TextInput type='number' placeholder="전화번호를 '-'없이 입력하세요." />
          </div>
        </fieldset>

        <fieldset className='flex flex-col gap-2'>
          <div>
            <legend className='text-body-14b text-ui-text-title'>주소</legend>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='flex justify-center items-center gap-1'>
              <TextInput placeholder='주소를 입력하세요' />
              <Button type='button' height={48} className='w-fit'>
                주소 검색
              </Button>
            </div>

            <TextInput placeholder='상세 주소를 입력하세요.' />
          </div>
        </fieldset>
      </form>

      <Button height={40} className='w-fit'>
        저장
      </Button>
    </div>
  );
}
