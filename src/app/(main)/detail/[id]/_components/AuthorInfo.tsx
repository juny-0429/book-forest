import React from 'react';

export default function AuthorInfo() {
  const mockAuthorInfoData = {
    name: '김기태',
    awards: '1996 한국출판평론상, 2003 책의 날 문화관광부장관 표창, 2005 제26회 한국출판학회상(저술, 연구부문), 2007 책의 날 국무총리 표창',
    profile:
      "경희대학교 국어국문학과를 졸업하고, 같은 학교 대학원 신문방송학과에서 '뉴미디어의 기술진전과 저작권 보호에 관한 연구'로 박사학위를 받았다. 1988년 출판계에 입문하여 삼성출판사, 지학사, 아이템풀, 삼진기획 등에서 기획 및 편집자로 활동했다. 1994년부터 대학에서 강의를 시작하여 혜천대학, 김포대학, 광주대학교, 인하대학교, 서울여자대학교, 경희대학교, 건국대 언론홍보대학원, 동국대 언론정보대학원, 중앙대 신문방송대학원, 경희대 언론정보대학원 등에서 저작권 및 출판에 대한 강의를 진행했다. 현재 세명대학교 미디어창작학과 교수로 재직 중이며, 한국출판학회 연구이사, 대한출판문화협회 저작권상담실 전문위원, 한국출판인회의 부설 서울북인스티튜트(SBI) 저작권실무과정 책임교수, 저작권위원회 전문강사, 청풍영상위원회 운영위원 및 이사 등으로 활동하고 있다. 출판평론가로서 다양한 매체에서 비평 활동을 펼치고 있으며, 저작권 및 출판정책 관련 자문과 강의를 담당하고 있다. 주요 저서로 '책―베스트셀러, 향기의 이름 혹은 악취의 이름'(이채, 1999), '텍스트, 커뮤니티 그리고 출판'(삼진기획, 2001), '책 든 손 귀하고 읽는 눈 빛난다'(박이정, 2004), '한국저작권법개설'(이채, 2005), '매스 미디어와 저작권'(이채, 2005), '디지털 미디어 시대의 저작권'(이채, 2005), '현대사회와 언론(공저)'(커뮤니케이션북스, 2006), '신저작권법의 해석과 적용'(세계사, 2007), '웹 2.0 시대의 저작권 상식 100'(커뮤니케이션북스, 2008), '나는 오늘도 책마을 사랑방으로 간다'(박이정, 2008), '저작권―편집자를 위한 저작권 지식'(살림출판사, 2008) 등이 있다.",
  };

  return (
    <section className='pb-8 border-b border-solid border-gray-300'>
      <h3 className='mb-5 text-title-24r text-ui-text-title'>작가정보</h3>

      <dl className='flex flex-col gap-3 p-5 bg-gray-200 rounded-[15px]'>
        <div className='flex gap-3'>
          <dt className='w-[60px] whitespace-nowrap text-body-14r text-ui-text-description'>저자(글)</dt>
          <dd className='text-body-16r text-ui-text-body'>{mockAuthorInfoData.name}</dd>
        </div>

        <div className='flex gap-3'>
          <dt className='w-[60px] whitespace-nowrap text-body-14r text-ui-text-description'>수상 경력</dt>
          <dd className='text-body-16r text-ui-text-body'>{mockAuthorInfoData.awards}</dd>
        </div>

        <div className='flex gap-3'>
          <dt className='w-[60px] whitespace-nowrap text-body-14r text-ui-text-description'>작가 소개</dt>
          <dd className='text-body-16r text-ui-text-body'>{mockAuthorInfoData.profile}</dd>
        </div>
      </dl>
    </section>
  );
}
