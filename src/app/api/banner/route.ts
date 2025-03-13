import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();

  const { searchParams } = new URL(request.url);
  const position = searchParams.get('position');

  const { data, error } = await supabase
    .from('banner')
    .select('banner_name, banner_image_url')
    .eq('is_active', true)
    .eq('banner_position', position || '');

  if (error) {
    return new Response(JSON.stringify({ message: '데이터 조회 싪패', error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: '데이터 조회 성공', data }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
