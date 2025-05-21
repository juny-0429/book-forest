import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);
  const categoryCode = searchParams.get('categoryCode');

  if (!categoryCode) return NextResponse.json({ error: '카테고리 코드가 없습니다.' }, { status: 400 });

  const parentCode = categoryCode.slice(0, 2);

  const { data: categories, error } = await supabase.from('category').select('category_code, category_name');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const currentGroup = {
    parent:
      categories
        .filter((c) => c.category_code === parentCode)
        .map((c) => ({
          categoryCode: c.category_code,
          categoryName: c.category_name,
        }))[0] ?? null,
    children: categories
      .filter((c) => c.category_code.startsWith(parentCode) && c.category_code.length === 4)
      .map((c) => ({
        categoryCode: c.category_code,
        categoryName: c.category_name,
      }))
      .sort((a, b) => a.categoryCode.localeCompare(b.categoryCode)),
  };

  const otherTopCategoryList = categories
    .filter((c) => c.category_code.length === 2 && c.category_code !== parentCode)
    .map((c) => ({
      categoryCode: c.category_code,
      categoryName: c.category_name,
    }))
    .sort((a, b) => a.categoryCode.localeCompare(b.categoryCode));

  return NextResponse.json({
    currentGroup,
    otherTopCategoryList,
  });
}
