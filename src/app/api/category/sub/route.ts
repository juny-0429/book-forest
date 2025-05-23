import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);
  const parentName = searchParams.get('parentName');

  if (!parentName) return NextResponse.json({ error: 'parentName이 필요합니다.' }, { status: 400 });

  try {
    const { data, error } = await supabase
      .from('category')
      .select(
        `
        category_id,
        category_name,
        category_code
      `
      )
      .eq('parent_name', parentName)
      .order('category_code', { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) return NextResponse.json({ error: '중분류가 존재하지 않습니다.' }, { status: 404 });

    const categoryList = data.map((category) => ({
      categoryId: category.category_id,
      categoryName: category.category_name,
      categoryCode: category.category_code,
    }));

    return NextResponse.json({ categoryList });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || '중분류 조회 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
