import { NextResponse } from 'next/server';
import { PostListDto } from 'src/app/(main)/board/[boardCode]/_dtos/getPostList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);

  const boardCode = searchParams.get('boardCode');

  if (!boardCode) return NextResponse.json({ error: '게시판 코드가 필요합니다.' }, { status: 400 });

  try {
    const { data, error } = await supabase
      .from('board')
      .select(
        `
        post:board_id (
          post_id,
          post_title,
          create_at,
          user (account_id)
          )
        `
      )
      .eq('board_code', boardCode)
      .filter('post.is_delete', 'eq', false);

    if (!data || data.length === 0) return NextResponse.json({ error: '해당 게시판에 게시글이 없습니다.' }, { status: 404 });

    const flattenedData: PostListDto[] = data
      .flatMap((board) =>
        board.post.map((post) => ({
          postId: post.post_id,
          postTitle: post.post_title,
          createAt: new Date(post.create_at),
          accountId: post.user.account_id,
        }))
      )
      .sort((a, b) => b.createAt.getTime() - a.createAt.getTime());

    return NextResponse.json(flattenedData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '게시글 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
