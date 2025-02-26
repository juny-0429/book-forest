import React from 'react';

export default function PrivacyPage() {
  return (
    <div className='max-w-3xl mx-auto p-6 space-y-6'>
      {/* 학습용 사이트 안내 */}
      <div className='p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800'>
        <strong>⚠ 이 사이트는 학습용으로 제작된 사이트입니다.</strong>
        <p>실제 운영되는 전자상거래 사이트가 아니며, 개인정보처리방침의 내용은 학습 목적으로 제공됩니다.</p>
      </div>

      <h1 className='text-2xl font-bold text-gray-900'>개인정보처리방침</h1>

      <section>
        <h2 className='text-xl font-semibold'>1. 수집하는 개인정보 항목</h2>
        <p className='text-gray-700'>책숲(이하 "회사")은 다음과 같은 개인정보를 수집할 수 있습니다.</p>
        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>필수 항목: 이름, 이메일, 비밀번호, 전화번호</li>
          <li>선택 항목: 주소, 프로필 사진</li>
          <li>자동 수집 항목: IP 주소, 쿠키 정보, 방문 기록</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>2. 개인정보의 이용 목적</h2>
        <p className='text-gray-700'>수집된 개인정보는 다음의 목적으로 사용됩니다.</p>
        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>회원 가입 및 관리</li>
          <li>서비스 제공 및 개선</li>
          <li>고객 문의 및 불만 처리</li>
          <li>마케팅 및 광고 활용 (선택 동의 시)</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>3. 개인정보 보유 및 이용 기간</h2>
        <p className='text-gray-700'>
          회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 관련 법령에 따라 일정 기간 동안 보관할 필요가 있는 경우에는 다음과 같이 보관됩니다.
        </p>
        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
          <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
          <li>소비자의 불만 또는 분쟁 처리에 관한 기록: 3년 (전자상거래법)</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>4. 개인정보의 제공 및 공유</h2>
        <p className='text-gray-700'>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>사용자가 사전에 동의한 경우</li>
          <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요청이 있는 경우</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>5. 개인정보 보호를 위한 조치</h2>
        <p className='text-gray-700'>회사는 이용자의 개인정보 보호를 위해 다음과 같은 조치를 취하고 있습니다.</p>
        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>개인정보 암호화 저장 및 전송</li>
          <li>방화벽 및 보안 시스템 운영</li>
          <li>개인정보 접근 제한 및 직원 교육</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>6. 개인정보 보호책임자 및 문의</h2>
        <p className='text-gray-700'>개인정보 보호와 관련하여 궁금한 점이 있으시면 아래의 연락처로 문의해 주세요.</p>
        <ul className='text-gray-700 space-y-1'>
          <li>
            📧 <strong>이메일:</strong>{' '}
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
