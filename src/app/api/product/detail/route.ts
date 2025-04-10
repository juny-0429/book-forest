import { NextResponse } from 'next/server';
import { ProductDetailDto } from 'src/app/(main)/detail/[productId]/_dtos/getProductDetail.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: '상품 id가 존재하지 않습니다.' }, { status: 400 });
  }

  const { data, error } = await supabase.rpc('get_product_by_id', {
    _product_id: Number(productId),
  });

  if (error || !data || data.length === 0) {
    return NextResponse.json({ error: error?.message ?? '상품 정보를 불러올 수 없습니다.' }, { status: 500 });
  }

  const item = data[0];

  const productDetail: ProductDetailDto = {
    productId: item.product_id,
    productName: item.product_name,
    productSummary: item.product_summary,
    authorName: item.author_name,
    authorAwards: item.author_awards,
    authorDescription: item.author_description,
    badgeNames: item.badge_names || [],
    categoryName: item.category_name,
    publisher: item.publisher,
    price: item.price,
    discount: item.discount,
    deliveryPrice: item.delivery_price,
    publishedDate: new Date(item.published_date),
    mainImages: item.main_images || [],
    detailImages: item.detail_images || [],
  };

  return NextResponse.json({ productDetail });
}
