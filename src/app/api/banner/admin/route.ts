import { NextResponse } from 'next/server';
import { BannerListItemDto } from 'src/app/(main)/_dtos/getBannerList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();

  const { searchParams } = new URL(request.url);
  const position = searchParams.get('position');

  const { data, error } = await supabase
    .from('banner')
    .select('banner_id, banner_name, banner_image_url, banner_link, is_active')
    .eq('banner_position', position || '');

  if (error) {
    return new Response(JSON.stringify({ message: '데이터 조회 싪패', error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  const response: { message: string; data: BannerListItemDto[] } = {
    message: '데이터 조회 성공',
    data,
  };

  return new Response(JSON.stringify(response), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}

export async function PUT(request: Request) {
  try {
    const { banner_id, is_active } = await request.json();

    if (!banner_id) return NextResponse.json({ message: '배너 id가 필요합니다.' }, { status: 400 });
    if (typeof is_active !== 'boolean') return NextResponse.json({ message: '올바른 활성화 상태가 필요합니다.' }, { status: 400 });

    const supabase = await createSupabaseServer();

    const { error } = await supabase.from('banner').update({ is_active }).eq('banner_id', banner_id);

    if (error) return NextResponse.json({ message: `에러 발생: ${error.message}` }, { status: 500 });

    return NextResponse.json({ message: '배너 활성화 상태 변경 성공' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '서버 에러 발생' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { banner_id } = await request.json();

  if (!banner_id) {
    return NextResponse.json({ message: '배너 ID가 필요합니다.' }, { status: 400 });
  }

  const supabase = await createSupabaseServer();

  const { error } = await supabase.from('banner').delete().eq('banner_id', banner_id);

  if (error) return NextResponse.json({ message: `배너 삭제 실패: ${error.message}` }, { status: 500 });

  return NextResponse.json({ message: '배너 삭제 성공' }, { status: 200 });
}
