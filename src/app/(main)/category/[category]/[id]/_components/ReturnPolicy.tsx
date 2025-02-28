import React from 'react';
import { returnPolicy } from '../_data/returnPolicy.data';

export default function ReturnPolicy() {
  return (
    <section>
      <h3 className='mb-10 text-title-24b text-ui-text-title'>교환/반품/품절 안내</h3>

      {/* 반품/교환 방법 */}
      <div className='flex'>
        <div className='flex-shrink-0 w-[200px] p-5 bg-gray-200'>
          <p className='text-body-16m text-ui-text-title'>반품/교환 방법</p>
        </div>
        <ul className='list-disc p-5 ml-5'>
          {returnPolicy.exchangeReturnMethods.map((method, index) => (
            <li key={index} className='text-body-16r text-ui-text-description'>
              {method}
            </li>
          ))}
        </ul>
      </div>

      {/* 반품/교환 가능 기간 */}
      <div className='flex'>
        <div className='flex-shrink-0 w-[200px] p-5 bg-gray-200'>
          <p className='text-body-16m text-ui-text-title'>반품/교환 가능 기간</p>
        </div>
        <ul className='list-disc p-5 ml-5'>
          {returnPolicy.exchangeReturnPeriod.map((item, index) => (
            <li key={index} className='text-body-16r text-ui-text-description'>
              <strong>{item.condition}: </strong>
              {item.period}
            </li>
          ))}
        </ul>
      </div>

      {/* 반품/교환 비용 */}
      <div className='flex'>
        <div className='flex-shrink-0 w-[200px] p-5 bg-gray-200'>
          <p className='text-body-16m text-ui-text-title'>반품/교환 비용</p>
        </div>
        <ul className='list-disc p-5 ml-5'>
          {returnPolicy.exchangeReturnCost.map((item, index) => (
            <li key={index} className='text-body-16r text-ui-text-description'>
              <strong>{item.condition}: </strong>
              {item.cost}
            </li>
          ))}
        </ul>
      </div>

      {/* 반품/교환 불가 사유 */}
      <div className='flex'>
        <div className='flex-shrink-0 w-[200px] p-5 bg-gray-200'>
          <p className='text-body-16m text-ui-text-title'>반품/교환 불가 사유</p>
        </div>
        <ul className='list-disc p-5 ml-5'>
          {returnPolicy.exchangeReturnExclusions.map((reason, index) => (
            <li key={index} className='text-body-16r text-ui-text-description'>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* 소비자 피해 보상 */}
      <div className='flex'>
        <div className='flex-shrink-0 w-[200px] p-5 bg-gray-200'>
          <p className='text-body-16m text-ui-text-title'>소비자 피해 보상</p>
        </div>
        <ul className='list-disc p-5 ml-5'>
          {returnPolicy.consumerCompensation.map((info, index) => (
            <li key={index} className='text-body-16r text-ui-text-description'>
              {info}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
