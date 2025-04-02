import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(request: Request) {
  const supabase = await createSupabaseServer();
  const body = await request.json();

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

export async function DELETE(request: Request) {
  const supabase = await createSupabaseServer();

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  if (!categoryId) return NextResponse.json({ error: 'categoryId는 필수입니다.' }, { status: 400 });

  const { data, error: logError } = await supabase.from('category_log').select('product_id', { count: 'exact', head: true }).eq('category_id', Number(categoryId));

  if (logError) return NextResponse.json({ error: '카테고리 상태를 확인할 수 없습니다.' }, { status: 500 });

  if (data && data.length > 0) {
    return NextResponse.json({ error: '사용중인 상품이 있습니다. 확인해주세요.' }, { status: 400 });
  }

  const { error } = await supabase.from('category').delete().eq('category_id', Number(categoryId));

  if (error) return NextResponse.json({ error: error.message || '카테고리 삭제 실패' }, { status: 500 });

  return NextResponse.json({ success: true });
}
