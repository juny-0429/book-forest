import { NextResponse } from 'next/server';
import { CreateProductSchema } from '../../../admin/(product-management)/products/new/_schema/createProduct.schema';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function POST(request: Request) {
  try {
    const { productName, authorId, categoryId, productSummary, publisher, isbn, price, discount, stock, publishedDate, isActive, deliveryInfo, mainImageUrls, detailImageUrls }: CreateProductSchema =
      await request.json();

    if (!productName || !authorId || !categoryId || !publisher || !isbn || price === undefined || stock === undefined || !publishedDate || isActive === undefined || deliveryInfo === undefined) {
      return NextResponse.json({ error: '필수값이 누락되었습니다.' }, { status: 400 });
    }

    const supabase = await createSupabaseServer();

    const { data: productData, error: productError } = await supabase
      .from('product')
      .insert({
        product_name: productName,
        product_summary: productSummary,
        author_id: authorId,
        publisher,
        isbn,
        price,
        stock,
        is_active: isActive,
        discount,
        delivery_price: deliveryInfo,
        published_date: new Date(publishedDate).toISOString(),
      })
      .select()
      .single();

    if (productError || !productData) return NextResponse.json({ error: '상품 등록 실패' }, { status: 500 });

    const productId = productData.product_id;

    const { error: categoryLogError } = await supabase.from('category_log').insert({
      category_id: categoryId,
      product_id: productId,
    });

    if (categoryLogError) {
      await supabase.from('product').delete().eq('product_id', productId);
      return NextResponse.json({ error: '카테고리 연결 실패' }, { status: 500 });
    }

    const imageInsertData = [
      ...(mainImageUrls ?? []).map((url, index) => ({
        product_id: productId,
        image_url: url,
        image_type: 'main',
      })),
      ...(detailImageUrls ?? []).map((url, index) => ({
        product_id: productId,
        image_url: url,
        image_type: 'detail',
      })),
    ];

    if (imageInsertData.length > 0) {
      const { error: imageError } = await supabase.from('product_image').insert(imageInsertData);

      if (imageError) {
        await supabase.from('product').delete().eq('product_id', productId);
        await supabase.from('category_log').delete().eq('product_id', productId);
        return NextResponse.json({ error: '이미지 등록 실패' }, { status: 500 });
      }
    }

    return NextResponse.json({ message: '상품 등록 완료', productId }, { status: 200 });
  } catch (error) {
    console.error('[PRODUCT_POST_ERROR]', error);
    return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
  }
}
