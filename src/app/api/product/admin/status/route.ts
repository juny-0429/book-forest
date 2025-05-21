import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function PUT(request: Request) {
  try {
    const { productId, isActive } = await request.json();

    if (!productId) return NextResponse.json({ message: '상품 id가 필요합니다.' }, { status: 400 });
    if (typeof isActive !== 'boolean') return NextResponse.json({ message: '올바른 활성화 상태가 필요합니다.' }, { status: 400 });

    const supabase = await createSupabaseServer();

    const { error } = await supabase.from('product').update({ is_active: isActive }).eq('product_id', productId);

    if (error) return NextResponse.json({ message: `에러 발생: ${error.message}` }, { status: 500 });

    return NextResponse.json({ message: '상품 활성화 상태 변경 성공' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: '서버 에러 발생' }, { status: 500 });
    }
  }
}
