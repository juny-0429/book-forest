import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const productId = searchParams.get('productId');

  if (!productId) return NextResponse.json({ error: 'Missing productId' }, { status: 400 });

  const { data, error } = await supabase
    .from('wishlist')
    .select('product_id')
    .eq('user_id', userId as string)
    .eq('product_id', Number(productId))
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ isWished: !!data });
}
