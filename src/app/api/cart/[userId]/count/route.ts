import { NextResponse } from 'next/server';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const supabase = await createSupabaseServer();
  const userId = (await params).userId;

  const { count, error } = await supabase.from('cart').select('*', { count: 'exact', head: true }).eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count });
}
