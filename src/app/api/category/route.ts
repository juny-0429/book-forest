import { NextResponse } from 'next/server';
import { CategoryListDto } from 'src/app/admin/(product-management)/categories/_dtos/getCategoryList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);

  const categoryLevel = searchParams.get('categoryLevel'); // 'ALL' | 'TOP' | 'SUB' (or undefined = ALL)

  try {
    const { data } = await supabase
      .from('category')
      .select(
        `
      category_id,
      category_name,
      category_code,
      parent_name
    `
      )
      .order('category_code', { ascending: true });

    if (!data || data.length === 0) return NextResponse.json({ error: '카테고리가 존재하지 않습니다.' }, { status: 404 });

    const categoryMap = new Map<string, string>();
    data.forEach((item) => {
      categoryMap.set(item.category_code, item.category_name);
    });

    const filtered = data.filter((category) => {
      if (categoryLevel === 'TOP') return category.category_code.length === 2;
      if (categoryLevel === 'SUB') return category.category_code.length > 2;
      return true;
    });

    const flattenedData: CategoryListDto[] = filtered.map((category, index) => ({
      no: index + 1,
      categoryId: category.category_id,
      categoryName: category.category_name,
      categoryCode: category.category_code,
      parentName: category.parent_name ? category.parent_name : '-',
    }));

    return NextResponse.json({ categoryList: flattenedData });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || '카테고리 조회 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
