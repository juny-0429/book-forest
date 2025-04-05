import { createSupabaseServer } from 'src/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const body = await request.json();

  const { productIds, isActive } = body;

  if (!Array.isArray(productIds) || typeof isActive !== 'boolean') {
    return NextResponse.json({ message: '요청 형식이 올바르지 않습니다.' }, { status: 400 });
  }

  const supabase = await createSupabaseServer();
  const { error } = await supabase.from('product').update({ is_active: isActive }).in('product_id', productIds);

  if (error) {
    return NextResponse.json({ message: '상품 상태 변경에 실패했습니다.', error }, { status: 500 });
  }

  return NextResponse.json({ message: '상품 상태가 성공적으로 변경되었습니다.' }, { status: 200 });
}
