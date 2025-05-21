import { createSupabaseServer } from 'src/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createSupabaseServer();
  const { cart } = await req.json();

  if (!Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json({ error: '상품 정보가 필요합니다.' }, { status: 400 });
  }

  const productIds = cart.map((item) => item.productId);

  const { data, error } = await supabase.rpc('get_cart_products', {
    product_ids: productIds,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const flattenedData = data.map((item) => {
    const stock = cart.find((c) => c.productId === item.product_id)?.stock ?? 1;
    return {
      productId: item.product_id,
      productName: item.product_name,
      price: item.price,
      discount: item.discount,
      deliveryPrice: item.delivery_price,
      mainImageUrl: item.main_image_url,
      stock,
    };
  });

  return NextResponse.json(flattenedData);
}
