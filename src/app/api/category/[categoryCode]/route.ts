import { NextResponse } from 'next/server';
import { CategoryProductListItem } from 'src/app/(main)/category/[categoryCode]/_dtos/getCategoryProductList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request, { params }: { params: { categoryCode: string } }) {
  const supabase = await createSupabaseServer();
  const { categoryCode } = params;

  const categoryPath = [{ code: '00', name: '전체' }];

  if (categoryCode !== '00') {
    const { data: subCategory } = await supabase.from('category').select('category_name').eq('category_code', categoryCode).single();

    if (categoryCode.length === 2) {
      // 대분류
      categoryPath.push({
        code: categoryCode,
        name: subCategory?.category_name ?? '',
      });
    } else {
      // 중분류
      const parentCode = categoryCode.slice(0, 2);

      const { data: parentCategory } = await supabase.from('category').select('category_name').eq('category_code', parentCode).single();

      categoryPath.push({
        code: parentCode,
        name: parentCategory?.category_name ?? '',
      });

      categoryPath.push({
        code: categoryCode,
        name: subCategory?.category_name ?? '',
      });
    }
  }

  // 상품 목록 조회
  const { data, error } =
    categoryCode === '00'
      ? await supabase.rpc('get_all_products')
      : await supabase.rpc('get_products_by_category_code', {
          _category_code: categoryCode,
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

  return NextResponse.json({
    categoryPath,
    categoryProductList: flattenedData,
  });
}
