import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const supabase = await createSupabaseServer();
  const userId = (await params).userId;

  const { data, error } = await supabase.rpc('get_cart_products_by_user_id', {
    _user_id: userId,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const flattenedData = data.map((item) => ({
    productId: item.product_id,
    productName: item.product_name,
    price: item.price,
    discount: item.discount,
    deliveryPrice: item.delivery_price,
    stock: item.stock,
    mainImageUrl: item.main_image_url,
  }));

  return NextResponse.json(flattenedData);
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServer();
  const { userId, cart }: { userId: string; cart: { productId: number; stock: number }[] } = await request.json();

  if (!userId || !Array.isArray(cart)) return NextResponse.json({ error: '요청이 올바르지 않습니다.' }, { status: 400 });

  const results = await Promise.all(
    cart.map(async ({ productId, stock }) => {
      const { data: existing, error: selectError } = await supabase.from('cart').select('stock').eq('user_id', userId).eq('product_id', productId).maybeSingle();

      if (selectError) {
        return { error: selectError };
      }

      const newStock = (existing?.stock ?? 0) + stock;

      return supabase.from('cart').upsert({ user_id: userId, product_id: productId, stock: newStock }, { onConflict: 'user_id,product_id' });
    })
  );

  results.forEach((res, i) => {
    if (res.error) {
      console.error(`업서트 실패한 항목:`, cart[i], res.error);
    }
  });

  const hasError = results.some((res) => res.error);
  if (hasError) return NextResponse.json({ error: '일부 상품을 동기화하지 못했습니다.' }, { status: 500 });

  return NextResponse.json({ success: true });
}
