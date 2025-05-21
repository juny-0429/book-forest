import { NextResponse } from 'next/server';
import { CategoryProductListItem } from 'src/app/(main)/category/[categoryCode]/_dtos/getCategoryProductList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request, { params }: { params: { categoryCode: string } }) {
  const supabase = await createSupabaseServer();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const categoryCode = (await params).categoryCode;

  const { data, error } =
    categoryCode === '00'
      ? await supabase.rpc('get_all_products', { _page: page, _limit: limit })
      : await supabase.rpc('get_products_by_category_code', {
          _category_code: categoryCode,
          _page: page,
          _limit: limit,
        });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const flattenedData: CategoryProductListItem[] = data.map((product) => ({
    productId: product.product_id,
    productName: product.product_name,
    productSummary: product.product_summary,
    authorName: product.author_name,
    CategoryName: product.category_name,
    publisher: product.publisher,
    price: product.price,
    discount: product.discount,
    publishedDate: new Date(product.published_date),
    mainImageUrl: product.main_image_url,
  }));

  const nextPage = data.length === limit ? page + 1 : null;

  return NextResponse.json({
    categoryProductList: flattenedData,
    paginationMeta: {
      currentPage: page,
      nextPage,
      pageSize: limit,
    },
  });
}
