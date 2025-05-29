import { NextResponse } from 'next/server';
import { GetPostItemDto } from 'src/app/(main)/board/[boardCode]/_dtos/getPostList.dto';

import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);

  const boardCode = searchParams.get('boardCode');

  if (!boardCode) return NextResponse.json({ error: '게시판 코드가 필요합니다.' }, { status: 400 });

  try {
    const keyword = searchParams.get('keyword');

    let query = supabase.from('post').select('post_id, post_title, create_at, user:user_id(account_id)').eq('board_code', boardCode);

    if (keyword) query = query.ilike('post_title', `%${keyword}%`);

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) return NextResponse.json({ error: '해당 게시판에 게시글이 없습니다.' }, { status: 404 });

    const flattenedData: GetPostItemDto[] = data
      .map((post) => ({
        postId: post.post_id,
        postTitle: post.post_title,
        createAt: new Date(post.create_at!),
        accountId: post.user.account_id,
      }))
      .sort((a, b) => b.createAt.getTime() - a.createAt.getTime());

    return NextResponse.json(flattenedData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message || '게시글 조회 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
