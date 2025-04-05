import { NextResponse } from 'next/server';
import { GetProductListDto } from 'src/app/admin/(product-management)/products/_dtos/getProductList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServer();
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') ?? '1');
    const searchType = searchParams.get('searchType') ?? '';
    const keyword = searchParams.get('keyword') ?? '';

    const limit = 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from('product').select(
      `
        product_id,
        product_name,
        author_id,
        publisher,
        isbn,
        price,
        stock,
        is_active,
        discount,
        delivery_price,
        published_date,
        author (author_name)
        `,
      { count: 'exact' }
    );

    if (searchType && keyword) {
      if (searchType === 'productName') {
        query = query.ilike('product_name', `%${keyword}%`);
      } else if (searchType === 'publisher') {
        query = query.ilike('publisher', `%${keyword}%`);
      } else if (searchType === 'authorName') {
        const authorResult = await supabase.from('author').select('author_id').ilike('author_name', `%${keyword}%`);

        const authorIds = authorResult.data?.map((a) => a.author_id) ?? [];

        if (authorIds.length === 0) {
          return NextResponse.json({ productList: [], total: 0, totalPages: 0 });
        }

        query = query.in('author_id', authorIds);
      }
    }

    const { data, count } = await query.order('product_id', { ascending: true }).range(from, to);

    if (!data || data.length === 0) {
      return NextResponse.json({ error: '존재하는 상품이 없습니다.' }, { status: 404 });
    }

    const flattenedData: GetProductListDto[] = data.map((product) => ({
      productId: product.product_id,
      productName: product.product_name,
      authorName: product.author?.author_name ?? '',
      publisher: product.publisher,
      isbn: product.isbn,
      price: product.price,
      stock: product.stock,
      isActive: product.is_active,
      discount: product.discount,
      deliveryPrice: product.delivery_price,
      publishedDate: new Date(product.published_date),
    }));

    const totalPages = count ? Math.ceil(count / limit) : 0;

    return NextResponse.json({ productList: flattenedData, total: count, totalPages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '상품 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
