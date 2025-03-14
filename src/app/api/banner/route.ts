import { BannerListItemDto } from 'src/app/(main)/_dtos/getBannerList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();

  const { searchParams } = new URL(request.url);
  const position = searchParams.get('position');

  const todayUTC = new Date();
  const todayKST = new Date(todayUTC.getTime() + 9 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('banner')
    .select('banner_name, banner_image_url, banner_link, is_active')
    .eq('is_active', true)
    .eq('banner_position', position || '')
    .lte('banner_start_date', todayKST)
    .gte('banner_end_date', todayKST);

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
