import { NextResponse } from 'next/server';
import { SearchProductListItemDto } from 'src/app/(main)/_dtos/getSearchProductList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '4', 10);

  if (!keyword || keyword.trim().length < 1) {
    return NextResponse.json({ data: [], message: '검색어가 없습니다.' }, { status: 400 });
  }

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.rpc('get_search_bar_products', {
    keyword,
    _limit: limit,
    _page: page,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

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

  const totalItems = data[0]?.total_count ?? 0;
  const totalPages = Math.ceil(totalItems / limit);

  return NextResponse.json({
    productList: formattedData,
    totalPages,
  });
}
