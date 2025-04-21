import { createSupabaseServer } from 'src/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createSupabaseServer();
  const { productIds } = await req.json();

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return NextResponse.json({ error: '상품 ID가 필요합니다.' }, { status: 400 });
  }

  const { data, error } = await supabase.rpc('get_cart_products', {
    product_ids: productIds,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const flattenedData = data.map((item) => ({
    productId: item.product_id,
    productName: item.product_name,
    price: item.price,
    discount: item.discount,
    delivery_price: item.delivery_price,
    mainImageUrl: item.main_image_url,
  }));

  return NextResponse.json(flattenedData);
}
