import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();

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
      .is('parent_name', null);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) return NextResponse.json({ error: '카테고리가 존재하지 않습니다.' }, { status: 404 });

    const categoryList = data.map((category) => ({
      categoryId: category.category_id,
      categoryName: category.category_name,
      categoryCode: category.category_code,
    }));

    return NextResponse.json({ categoryList });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '카테고리 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
