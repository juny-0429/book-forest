import React from 'react';

export default function BannerSizeInfo() {
  return (
    <div>
      <p className='text-body-16b text-ui-text-description'>배너 사이즈 안내</p>

      <ul className='mt-2 space-y-1 text-body-14r text-ui-text-description'>
        <li>📌 메인 배너 - 1050px * 300px</li>
        <li>📌 사이드 배너 - 300px * 600px</li>
        <li>📌 더블 배너 - 300px * 170px (2개 배치)</li>
        <li>📌 트리플 배너 - 340px * 150px (3개 배치)</li>
        <li>📌 카테고리 이벤트 배너 - 1100px * 300px (롤링 배너)</li>
        <li>📌 Show & Hide 배너 - 900px * 550px</li>
        <li>📌 팝업 배너 - 300px * 170px</li>
      </ul>
    </div>
  );
}
