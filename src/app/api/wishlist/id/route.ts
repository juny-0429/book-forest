import { NextResponse } from 'next/server';
import { WishlistItemDto } from 'src/app/(main)/shop/wishlist/_dtos/GetWhislistItem.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const { data, error } = await supabase.rpc('get_wishlist_products_by_user_id', {
    _user_id: userId as string,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const formattedData: WishlistItemDto[] = (data ?? []).map((item) => ({
    productId: item.product_id,
    productName: item.product_name,
    productSummary: item.product_summary,
    authorName: item.author_name,
    publisher: item.publisher,
    price: item.price,
    discount: item.discount ?? 0,
    publishedDate: item.published_date,
    mainImageUrl: item.main_image_url,
  }));

  return NextResponse.json(formattedData);
}

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServer();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const body = await request.json();
    const productIds: number[] = body.productIds;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: '상품 ID 목록이 필요합니다.' }, { status: 400 });
    }

    const inserts = productIds.map((productId) => ({
      user_id: userId as string,
      product_id: productId,
    }));

    const { error } = await supabase.from('wishlist').upsert(inserts, {
      onConflict: 'user_id,product_id',
    });

    if (error) return NextResponse.json({ error: `찜 추가 중 오류가 발생했습니다: ${error.message}` }, { status: 500 });

    return NextResponse.json(true);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '알 수 없는 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createSupabaseServer();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const body = await request.json();
    const productIds: number[] = body.productIds;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: '삭제할 상품 ID 목록이 필요합니다.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('wishlist')
      .delete()
      .in('product_id', productIds)
      .eq('user_id', userId as string);

    if (error) return NextResponse.json({ error: `찜 삭제 중 오류가 발생했습니다: ${error.message}` }, { status: 500 });

    return NextResponse.json(true);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '알 수 없는 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
