import React from 'react';

export default function MarketingConsentPage() {
  return (
    <div className='w-full mx-auto p-6 space-y-10'>
      <div className='p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800'>
        <strong>⚠ 이 사이트는 학습용으로 제작된 사이트입니다.</strong>
        <p>실제 운영되는 전자상거래 사이트가 아니며, 개인정보 마케팅 활용 동의 내용은 학습 목적으로 제공됩니다.</p>
      </div>

      <h1 className='text-2xl font-bold text-gray-900'>개인정보 마케팅 활용 동의</h1>

      <section className='space-y-5'>
        <h2 className='text-xl font-semibold'>1. 개인정보 수집 및 이용</h2>

        <div className='overflow-x-auto'>
          <table className='w-full border border-gray-300 text-left text-gray-700'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='p-3 border border-gray-300'>수집방법</th>
                <th className='p-3 border border-gray-300'>수집항목</th>
                <th className='p-3 border border-gray-300'>수집 및 이용목적</th>
                <th className='p-3 border border-gray-300'>보유 및 이용기간</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className='p-3 border border-gray-300'>회원 가입 시</td>
                <td className='p-3 border border-gray-300'>닉네임, 이메일, 성별 및 생일 (간편가입 시)</td>
                <td className='p-3 border border-gray-300 font-semibold text-gray-900'>
                  - 프로모션 및 이벤트 정보 등의 전달 및 참여기회 제공
                  <br />
                  - 맞춤형 광고 전송 등 광고 및 마케팅 목적의 활용
                  <br />- 고객 분석, 설문조사 등
                </td>
                <td className='p-3 border border-gray-300 font-semibold text-gray-900'>동의 철회 시까지</td>
              </tr>

              <tr>
                <td className='p-3 border border-gray-300'>스토어 서비스 이용 시</td>
                <td className='p-3 border border-gray-300'>이름, 이메일, 휴대전화번호, 구매 내역, 배송정보, 결제 내역, 상담 내역 등</td>
                <td className='p-3 border border-gray-300'>
                  - 맞춤형 상품 추천 및 마케팅 분석
                  <br />- 고객 서비스 지원 및 응대
                </td>
                <td className='p-3 border border-gray-300'>동의 철회 시까지</td>
              </tr>

              <tr>
                <td className='p-3 border border-gray-300'>서비스 이용 과정</td>
                <td className='p-3 border border-gray-300'>서비스 이용 기록, 접속 로그, IP, 쿠키, 광고 ID 및 이용자 고유식별자</td>
                <td className='p-3 border border-gray-300'>
                  - 서비스 이용 통계 및 맞춤형 콘텐츠 제공
                  <br />- 광고 및 이벤트 효과 분석
                </td>
                <td className='p-3 border border-gray-300'>동의 철회 시까지</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className='space-y-5'>
        <h2 className='text-xl font-semibold'>2. 동의 철회 방법</h2>
        <p className='text-gray-700'>고객은 언제든지 마케팅 활용 동의를 철회할 수 있으며, 동의 철회 시 더 이상 마케팅 정보를 제공받지 않습니다.</p>
        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>홈페이지 내 개인정보 설정에서 철회</li>
          <li>고객센터를 통한 철회 요청</li>
          <li>수신된 이메일 또는 SMS 내 &apos;수신거부&apos; 클릭</li>
        </ul>
      </section>

      <section className='space-y-5'>
        <h2 className='text-xl font-semibold'>3. 개인정보 보호 책임자 및 문의</h2>
        <p className='text-gray-700'>개인정보 보호와 관련하여 궁금한 점이 있으시면 아래의 연락처로 문의해 주세요.</p>
        <ul className='text-gray-700 space-y-1'>
          <li>
            📧 <strong>이메일:</strong>
            <a href='mailto:support@책숲.com' className='text-blue-600 hover:underline'>
              support@bookforest.com
            </a>
          </li>
          <li>
            📞 <strong>전화번호:</strong> 1588-1234
          </li>
        </ul>
      </section>
    </div>
  );
}
