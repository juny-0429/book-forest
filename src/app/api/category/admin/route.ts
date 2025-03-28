import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();
  const body = await req.json();

  const { categoryName, categoryCode, parentCode } = body;

  if (!categoryName || !categoryCode) return NextResponse.json({ error: '카테고리 이름과 코드가 필요합니다.' }, { status: 400 });

  const { data, error } = await supabase
    .from('category')
    .insert({
      category_name: categoryName,
      category_code: categoryCode,
      parent_code: parentCode ?? null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message || '카테고리 등록에 실패했습니다.' }, { status: 500 });

  return NextResponse.json({
    categoryId: data.category_id,
    categoryName: data.category_name,
    categoryCode: data.category_code,
    parentCode: data.parent_code,
  });
}
