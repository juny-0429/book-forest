import { NextResponse } from 'next/server';
import { GetProductListDto } from 'src/app/admin/(product-management)/products/_dtos/getProductList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  try {
    const supabase = await createSupabaseServer();
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') ?? '1'); // 현재 페이지 번호 (기본 1페이지)
    const limit = 10; // 한 페이지당 항목 수
    const from = (page - 1) * limit; // 조회 시작 인덱스 (0부터 시작)
    const to = from + limit - 1; // 조회 끝 인덱스

    const { data, count } = await supabase
      .from('product')
      .select(
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
      )
      .order('product_id', { ascending: true })
      .range(from, to);

    if (!data || data.length === 0) return NextResponse.json({ error: '존재하는 상품이 없습니다.' }, { status: 404 });

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
