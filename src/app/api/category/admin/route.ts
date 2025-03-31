import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(request: Request) {
  const supabase = await createSupabaseServer();
  const body = await request.json();

  const { categoryId, categoryName, categoryCode, parentCode } = body;

  if (!categoryId || !categoryName || !categoryCode) return NextResponse.json({ error: '카테고리 이름과 코드가 필요합니다.' }, { status: 400 });

  const { data, error } = await supabase
    .from('category')
    .insert({
      category_name: categoryName,
      category_code: categoryCode,
      parent_code: parentCode ?? null,
    })
    .eq('category_id', categoryId)
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

export async function PUT(request: Request) {
  const supabase = await createSupabaseServer();
  const body = await request.json();

  const { categoryId, categoryName, categoryCode, parentCode } = body;

  if (!categoryId || !categoryName || !categoryCode) return NextResponse.json({ error: '필수 값이 누락되었습니다.' }, { status: 400 });

  const { data, error } = await supabase
    .from('category')
    .update({
      category_name: categoryName,
      category_code: categoryCode,
      parent_code: parentCode ?? null,
    })
    .eq('category_id', categoryId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message || '카테고리 수정에 실패했습니다.' }, { status: 500 });

  return NextResponse.json({
    categoryId: data.category_id,
    categoryName: data.category_name,
    categoryCode: data.category_code,
    parentCode: data.parent_code,
  });
}
