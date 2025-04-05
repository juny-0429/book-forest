import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';
import { TaggedProductItemDto } from 'src/app/(main)/_dtos/getTagProductList.dto';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);
  const tagType = searchParams.get('productTagType');

  if (!tagType) return NextResponse.json({ error: 'tagType이 필요합니다.' }, { status: 400 });

  const { data, error } = await supabase.rpc('get_products_by_tag', { _tag_code: tagType });

  if (error || !data) return NextResponse.json({ error: error?.message || '상품 조회 실패' }, { status: 500 });

  const result: TaggedProductItemDto[] = data.map((item) => ({
    productId: item.product_id,
    productName: item.product_name,
    productSummary: item.product_summary ?? '',
    authorName: item.author_name ?? '',
    publisher: item.publisher,
    price: item.price,
    discount: item.discount,
    categoryName: item.category_name ?? '',
    mainImageUrl: item.main_image_url ?? null,
  }));

  return NextResponse.json({ products: result });
}
