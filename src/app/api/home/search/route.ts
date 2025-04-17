import { NextResponse } from 'next/server';
import { SearchProductListItemDto } from 'src/app/(main)/_dtos/getSearchProductList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(req: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(req.url);

  const keyword = searchParams.get('keyword');
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '3');

  if (!keyword) {
    return NextResponse.json({ error: '검색어는 필수입니다.' }, { status: 400 });
  }

  const { data, error } = await supabase.rpc('get_search_products_with_count', {
    keyword,
    _limit: limit,
    _page: page,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const totalCount = data[0]?.total_count ?? 0;

  const formattedData: SearchProductListItemDto[] = data.map((item) => ({
    productId: item.product_id,
    productName: item.product_name,
    productSummary: item.product_summary,
    authorName: item.author_name,
    publisher: item.publisher,
    price: item.price,
    discount: item.discount,
    mainImageUrl: item.main_image_url,
  }));

  return NextResponse.json({
    items: formattedData,
    totalCount,
  });
}
