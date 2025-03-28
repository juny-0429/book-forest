import { NextResponse } from 'next/server';
import { CategoryListDto } from 'src/app/admin/product-management/categories/_dtos/getCategoryList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);

  const categoryLevel = searchParams.get('categoryLevel'); // 'ALL' | 'TOP' | 'SUB' (or undefined = ALL)

  try {
    const { data } = await supabase.from('category').select(`
      category_id,
      category_name,
      category_code,
      parent_id
    `);

    if (!data || data.length === 0) return NextResponse.json({ error: '카테고리가 존재하지 않습니다.' }, { status: 404 });

    const categoryMap = new Map<number, string>();
    data.forEach((item) => {
      categoryMap.set(item.category_id, item.category_name);
    });

    const filtered = data.filter((category) => {
      if (categoryLevel === 'TOP') return category.parent_id === null;
      if (categoryLevel === 'SUB') return category.parent_id !== null;
      return true;
    });

    const flattenedData: CategoryListDto[] = filtered
      .map((category) => ({
        categoryId: category.category_id,
        categoryName: category.category_name,
        categoryCode: category.category_code,
        parentName: category.parent_id ? (categoryMap.get(category.parent_id) ?? '-') : '-',
      }))
      .sort((a, b) => a.categoryId - b.categoryId);

    return NextResponse.json({ categoryList: flattenedData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '카테고리 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
