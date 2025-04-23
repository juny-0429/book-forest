import { NextResponse } from 'next/server';
import { WishlistItemDto } from 'src/app/(main)/shop/wishlist/_dtos/GetWhislistItem.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const supabase = await createSupabaseServer();
  const userId = (await params).userId;

  const { data, error } = await supabase.rpc('get_wishlist_products_by_user_id', {
    _user_id: userId,
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

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = (await params).userId;
    const { searchParams } = new URL(request.url);
    const productId = Number(searchParams.get('productId'));
    const supabase = await createSupabaseServer();

    if (!productId) return NextResponse.json({ error: '상품 ID가 필요합니다.' }, { status: 400 });

    const { error } = await supabase.from('wishlist').insert({
      user_id: userId,
      product_id: productId,
    });

    if (error) return NextResponse.json({ error: `찜 추가 중 오류가 발생했습니다: ${error.message}` }, { status: 500 });

    return NextResponse.json(true);
  } catch (err) {
    return NextResponse.json({ error: '알 수 없는 오류가 발생했습니다.' }, { status: 500 });
  }
}
