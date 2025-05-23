import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className='max-w-3xl mx-auto space-y-20'>
      {/* 학습용 사이트 안내 */}
      <div className='p-4 bg-yellow-100 border-l-4 border-yellow-z00 text-yellow-800'>
        <strong>⚠ 이 사이트는 학습용으로 제작된 사이트입니다.</strong>
        <p>실제 운영되는 전자상거래 사이트가 아니며, 이용약관의 내용은 학습 목적으로 제공됩니다.</p>
      </div>

      <h1 className='text-2xl font-bold text-gray-900'>전자상거래 표준약관</h1>

      <section>
        <h2 className='text-xl font-semibold'>제1조 (목적)</h2>
        <p className='text-gray-700'>
          이 약관은 책숲(전자상거래 사업자)이 운영하는 책숲 웹사이트(이하 &quot; 몰&quot; )에서 제공하는 인터넷 관련 서비스(이하 &quot; 서비스&quot; )를 이용함에 있어 사이버몰과 이용자의 권리·의무 및
          책임사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>제2조 (정의)</h2>
        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>① &quot; 몰&quot; 이란 전자상거래를 통해 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.</li>
          <li>② &quot; 이용자&quot; 란 &quot; 몰&quot; 에 접속하여 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
          <li>③ &quot; 회원&quot; 이란 &quot; 몰&quot; 에 회원등록을 한 자로서 계속적으로 서비스를 이용할 수 있는 자를 말합니다.</li>
          <li>④ &quot; 비회원&quot; 이란 회원가입 없이 &quot; 몰&quot; 이 제공하는 서비스를 이용하는 자를 말합니다.</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>제4조 (서비스의 제공 및 변경)</h2>
        <p className='text-gray-700'>&quot; 몰&quot; 은 다음과 같은 업무를 수행합니다.</p>
        <ul className='list-disc pl-5 text-gray-700 space-y-2'>
          <li>1. 재화 또는 용역에 대한 정보 제공 및 구매계약 체결</li>
          <li>2. 구매계약이 체결된 재화 또는 용역의 배송</li>
          <li>3. 기타 &quot; 몰&quot; 이 정하는 업무</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>제6조 (회원가입)</h2>
        <p className='text-gray-700'>이용자는 &quot; 몰&quot; 이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의함으로써 회원가입을 신청합니다.</p>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>제7조 (회원 탈퇴 및 자격 상실)</h2>
        <p className='text-gray-700'>회원은 언제든지 &quot; 몰&quot; 에 탈퇴를 요청할 수 있으며, &quot; 몰&quot; 은 즉시 회원탈퇴를 처리합니다.</p>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>제17조 (개인정보 보호)</h2>
        <p className='text-gray-700'>
          &quot; 몰&quot; 은 이용자의 개인정보를 보호하기 위해 최소한의 정보를 수집하며, 개인정보 수집 및 이용에 대한 내용은
          <a href='/privacy-policy' className='text-blue-600 hover:underline'>
            {' '}
            개인정보 처리방침
          </a>
          을 통해 확인할 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>제24조 (재판권 및 준거법)</h2>
        <p className='text-gray-700'>&quot; 몰&quot; 과 이용자 간 발생한 전자상거래 분쟁과 관련된 소송은 민사소송법상의 관할법원에 제기하며, 한국법을 적용합니다.</p>
      </section>
    </div>
  );
}
