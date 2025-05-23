export default function YouthProtectionPage() {
  return (
    <div className='max-w-3xl mx-auto p-6 space-y-10'>
      {/* 학습용 사이트 안내 */}
      <div className='p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800'>
        <strong>⚠ 이 사이트는 학습용으로 제작된 사이트입니다.</strong>
        <p>실제 운영되는 전자상거래 사이트가 아니며, 청소년 보호 정책의 내용은 학습 목적으로 제공됩니다.</p>
      </div>

      <div className='print-area space-y-10'>
        <h1 className='text-2xl font-bold text-gray-900'>청소년 보호 정책</h1>

        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>1. 청소년 보호 정책 개요</h2>
          <p className='text-gray-700'>
            책숲(이하 &quot;회사&quot;)은 청소년이 각종 유해 정보로부터 보호받을 수 있도록 하기 위해 <strong>&apos; 청소년보호법&apos;</strong>,
            <strong>&apos; 정보통신망 이용촉진 및 정보보호 등에 관한 법률&apos;</strong>등 관련 법령을 준수하며, 청소년 보호 정책을 시행하고 있습니다.
          </p>
          <p className='text-gray-700'>회사는 청소년의 건전한 성장을 저해하는 유해 정보 및 비윤리적, 반사회적 행위를 엄격하게 제재하고 있습니다.</p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>2. 유해 정보에 대한 청소년 접근 제한 및 관리 조치</h2>
          <p className='text-gray-700'>
            회사는 19세 미만 청소년이 유해 정보에 접근할 수 없도록 <strong>별도의 인증 장치를 마련</strong>하고 있으며, 동시에 청소년 유해 매체물 표시를 통해 청소년 유해 정보가 노출되지 않도록 사전
            예방 조치를 시행하고 있습니다.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>3. 청소년 유해 상품 판매 제한</h2>
          <p className='text-gray-700'>
            회사는 <strong>청소년 유해 상품 및 유해 매체</strong>를 청소년에게 판매하지 않도록 주문 및 판매를 제한하고 있습니다.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>4. 유해 정보로부터 청소년 보호를 위한 업무 담당자 교육</h2>
          <p className='text-gray-700'>
            회사는 정보통신 업무 종사자를 대상으로 <strong>청소년 보호 관련 법령 및 제재 기준</strong>, 유해 정보 발견 시 대처 방법, 위반 사항 처리 절차 등을 교육하고 있습니다.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>5. 유해 정보로 인한 피해 상담 및 신고</h2>
          <p className='text-gray-700'>회사는 청소년 유해 매체물 유통으로 인한 피해 신고 및 처리를 위해 신고 센터를 운영하고 있습니다.</p>
          <p className='text-gray-700'>신고된 유해 매체물은 확인 후 경고 조치되며, 위법성이 발견될 경우 삭제 등의 조치를 취합니다.</p>
          <p className='text-gray-700'>자체적으로 처리가 곤란할 경우, 관련 기관에 신고할 수 있도록 안내하고 있습니다.</p>

          <ul className='list-disc pl-5 text-gray-700 space-y-2'>
            <li>
              🔹 여성가족부 (
              <a href='https://www.mogef.go.kr' className='text-blue-600 hover:underline'>
                www.mogef.go.kr
              </a>
              , 02-2100-6000)
            </li>
            <li>
              🔹 방송통신위원회 (
              <a href='https://www.kcc.go.kr' className='text-blue-600 hover:underline'>
                www.kcc.go.kr
              </a>
              , 02-500-9000)
            </li>
            <li>
              🔹 한국저작권위원회 (
              <a href='https://www.copyright.or.kr' className='text-blue-600 hover:underline'>
                www.copyright.or.kr
              </a>
              , 1800-5455)
            </li>
            <li>
              🔹 경찰청 사이버수사국 (
              <a href='https://cyberbureau.police.go.kr' className='text-blue-600 hover:underline'>
                cyberbureau.police.go.kr
              </a>
              , 국번 없이 182)
            </li>
          </ul>
        </section>

        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>6. 청소년 보호 책임자 및 문의</h2>
          <p className='text-gray-700'>책숲은 청소년이 좋은 정보를 안전하게 이용할 수 있도록 최선을 다하고 있습니다. 청소년 보호와 관련하여 궁금한 점이 있으시면 아래의 연락처로 문의해 주세요.</p>
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
    </div>
  );
}
