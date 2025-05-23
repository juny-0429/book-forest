import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const { count, error } = await supabase
    .from('wishlist')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId as string);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ count });
}
