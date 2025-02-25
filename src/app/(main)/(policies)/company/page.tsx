import React from 'react';

export default function CompanyPage() {
  return (
    <div className='space-y-20'>
      <small className='text-body-18l text-ui-text-description'>회사 정보를 표시하는 페이지 입니다.</small>

      <section className='flex flex-col gap-5'>
        <h2 className='text-title-24b text-ui-text-title'>책숲 소개</h2>

        <p className='text-gray-700 leading-relaxed'>
          <strong>책숲(책의 숲)</strong>은 책을 사랑하는 사람들을 위한 <strong>온라인 도서 관리 플랫폼</strong>입니다.
          <br />
          사용자는 다양한 카테고리의 책을 관리하고, 편리하게 원하는 책을 찾을 수 있습니다. 책숲은 단순한 서점이 아니라,
          <br />
          <strong>사용자가 원하는 책을 더욱 쉽게 탐색하고, 저장하고, 관리할 수 있도록 돕는 공간</strong>입니다.
        </p>
      </section>

      <section className='flex flex-col gap-5'>
        <h2 className='text-title-24b text-ui-text-title'>책숲에서 제공하는 기능</h2>

        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>
            <strong>도서 카테고리별 탐색</strong> - 소설, 에세이, 자기계발, 과학 등 다양한 카테고리 제공
          </li>
          <li>
            <strong>할인 도서 & 이달의 책 소개</strong> - 베스트셀러와 추천 도서를 한눈에
          </li>
          <li>
            <strong>작가와의 만남 섹션</strong> - 작가에 대한 정보를 확인하고, 관련 도서를 탐색
          </li>
        </ul>
      </section>

      <section className='flex flex-col gap-5'>
        <h2 className='text-title-24b text-ui-text-title'>책숲의 비전</h2>

        <p className='text-gray-700 leading-relaxed'>
          책숲은 <strong>단순한 온라인 서점이 아닌, 독서 경험을 더욱 풍성하게 하는 공간</strong>을 목표로 합니다.
        </p>
        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>
            📚 책을 좋아하는 사람들에게 <strong>더 쉽고 직관적인 인터페이스</strong> 제공
          </li>
          <li>
            📚 필요한 책을 <strong>빠르게 찾고, 관리할 수 있는 시스템</strong> 구축
          </li>
          <li>
            📚 책을 중심으로 한 <strong>디지털 서재 경험</strong> 제공
          </li>
        </ul>
      </section>

      <section className='flex flex-col gap-5'>
        <h2 className='text-xl font-bold text-gray-900'>📬 문의하기</h2>
        <p className='text-gray-700'>궁금한 점이 있으시면 언제든지 문의해 주세요.</p>
        <div>
          ✉ <strong>이메일:</strong>{' '}
          <a href='mailto:support@책숲.com' className='text-blue-600 hover:underline'>
            support@bookforest.com
          </a>
        </div>
      </section>
    </div>
  );
}
