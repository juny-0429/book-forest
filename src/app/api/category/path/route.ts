import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();

  const url = new URL(request.url);
  const categoryCode = url.searchParams.get('categoryCode');

  if (!categoryCode) return NextResponse.json({ error: 'categoryCode is required' }, { status: 400 });

  const categoryPath = [{ code: '00', name: '전체' }];

  if (categoryCode !== '00') {
    const { data: subCategory } = await supabase.from('category').select('category_name').eq('category_code', categoryCode).single();

    if (categoryCode.length === 2) {
      categoryPath.push({
        code: categoryCode,
        name: subCategory?.category_name ?? '',
      });
    } else {
      const parentCode = categoryCode.slice(0, 2);

      const { data: parentCategory, error } = await supabase.from('category').select('category_name').eq('category_code', parentCode).single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

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

  return NextResponse.json({ categoryPath });
}
