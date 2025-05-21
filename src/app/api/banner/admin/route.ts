import { NextResponse } from 'next/server';
import { BannerListItemDto } from 'src/app/(main)/_dtos/getBannerList.dto';
import { CreateBannerSchema } from 'src/app/admin/banners/_schemas/createBanner.schema';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServer();
    const body: CreateBannerSchema = await request.json();

    const { banner_name, banner_image_url, is_active, banner_position, banner_start_date, banner_end_date, banner_link, banner_description } = body;

    if (!banner_name || !banner_image_url || is_active === undefined || !banner_position || !banner_start_date || !banner_end_date || !banner_link) {
      return NextResponse.json({ error: '필수 항목을 입력해야 합니다.' }, { status: 400 });
    }

    const startDate = new Date(banner_start_date);
    const endDate = new Date(banner_end_date);

    const { data: existingBanners, error: countError } = await supabase.from('banner').select('banner_id', { count: 'exact' }).eq('banner_position', banner_position);

    const maxBanners: Record<string, number> = {
      main: 20,
      side: 1,
      category: 10,
      dual: 2,
      triple: 3,
      popup: 1,
      showHide: 1,
    };

    // 배너 갯수 제한 체크
    if (existingBanners && existingBanners.length >= (maxBanners[banner_position] || Infinity)) {
      const errorMessage = `해당 위치(${banner_position})에는 최대 ${maxBanners[banner_position]}개의 배너만 등록할 수 있습니다.`;
      alert(errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('banner')
      .insert({
        banner_name,
        banner_image_url,
        is_active,
        banner_position,
        banner_start_date: startDate.toISOString(),
        banner_end_date: endDate.toISOString(),
        banner_link,
        banner_description: banner_description || null,
      })
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: '배너 등록 성공', data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}

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
