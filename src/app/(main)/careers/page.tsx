import React from 'react';

export default function CareersPage() {
  return (
    <div className='max-w-3xl mx-auto p-6 space-y-10'>
      <h2 className='text-2xl font-bold text-gray-900'>책숲 채용 정보</h2>
      <p className='text-gray-700'>책숲은 책을 사랑하는 사람들이 함께 성장하는 공간입니다. 함께 책숲을 만들어갈 인재를 찾고 있습니다.</p>

      <section>
        <h3 className='text-xl font-semibold text-gray-900'>📚 서비스 직군</h3>
        <p className='text-gray-700'>사용자 경험을 향상시키고, 고객과 직접 소통하며 책숲의 가치를 전달합니다.</p>
        <div className='border p-4 rounded-md bg-gray-50 space-y-2'>
          <h3 className='text-lg font-semibold'>🛎️ 고객 서비스 담당자</h3>
          <p className='text-gray-700'>고객의 문의를 해결하고, 원활한 서비스 이용을 지원합니다.</p>
          <ul className='list-disc pl-5 text-gray-700 space-y-1'>
            <li>📌 모집 중</li>
            <li>📌 담당 업무: 고객 응대, 서비스 개선 피드백</li>
            <li>📌 지원 방법: 이메일 지원 (support@bookforest.com)</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className='text-xl font-semibold text-gray-900'>💻 기술 직군</h3>
        <p className='text-gray-700'>책숲의 서비스를 개발하고, 안정적인 운영을 담당합니다.</p>
        <div className='border p-4 rounded-md bg-gray-50 space-y-2'>
          <h3 className='text-lg font-semibold'>👨‍💻 프론트엔드 개발자</h3>
          <p className='text-gray-700'>Next.js와 React를 활용하여 사용자 친화적인 UI/UX를 개발합니다.</p>
          <ul className='list-disc pl-5 text-gray-700 space-y-1'>
            <li>📌 모집 중</li>
            <li>📌 담당 업무: 웹 서비스 UI 개발, 최적화</li>
            <li>📌 우대 사항: Tailwind CSS, Zustand 경험자</li>
            <li>📌 지원 방법: 이메일 지원 (tech@bookforest.com)</li>
          </ul>
        </div>

        <div className='border p-4 rounded-md bg-gray-50 space-y-2'>
          <h3 className='text-lg font-semibold'>🖥️ 백엔드 개발자</h3>
          <p className='text-gray-700'>Supabase 및 Next.js를 활용하여 서버 로직을 개발합니다.</p>
          <ul className='list-disc pl-5 text-gray-700 space-y-1'>
            <li>📌 모집 중</li>
            <li>📌 담당 업무: 데이터베이스 설계, API 개발</li>
            <li>📌 우대 사항: Supabase, Prisma 경험자</li>
            <li>📌 지원 방법: 이메일 지원 (tech@bookforest.com)</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className='text-xl font-semibold text-gray-900'>📈 마케팅 직군</h3>
        <p className='text-gray-700'>책숲의 브랜드를 알리고, 더 많은 독자들과 연결합니다.</p>
        <div className='border p-4 rounded-md bg-gray-50 space-y-2'>
          <h3 className='text-lg font-semibold'>📢 디지털 마케터</h3>
          <p className='text-gray-700'>SNS 및 온라인 채널을 통해 책숲의 서비스를 홍보합니다.</p>
          <ul className='list-disc pl-5 text-gray-700 space-y-1'>
            <li>📌 모집 중</li>
            <li>📌 담당 업무: 광고 기획, 데이터 분석, 콘텐츠 제작</li>
            <li>📌 우대 사항: SNS 마케팅 경험자</li>
            <li>📌 지원 방법: 이메일 지원 (marketing@bookforest.com)</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className='text-xl font-semibold text-gray-900'>📄 지원 안내</h3>
        <p className='text-gray-700'>책숲 채용에 관심이 있으신 분은 해당 직군의 이메일 주소로 이력서 및 포트폴리오를 보내주세요.</p>
        <p className='text-gray-700'>
          문의사항은 <strong>support@bookforest.com</strong> 으로 연락 주세요.
        </p>
      </section>
    </div>
  );
}
