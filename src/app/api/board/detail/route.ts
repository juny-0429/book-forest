import { NextResponse } from 'next/server';
import { PostDetailDto } from 'src/app/(main)/board/[boardCode]/_dtos/getPostDetail.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);

  const postId = Number(searchParams.get('postId'));

  if (!postId) return NextResponse.json({ error: '올바르지 않은 게시글 ID입니다.' }, { status: 400 });

  try {
    const { data, error } = await supabase
      .from('post')
      .select(
        `
        post_id,
        post_title,
        post_content,
        create_at,
        user:user_id (account_id)
      `
      )
      .eq('post_id', postId)
      .single();

    if (error || !data) return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });

    const formattedData: PostDetailDto = {
      postId: data.post_id,
      postTitle: data.post_title,
      postContent: data.post_content,
      createAt: new Date(data.create_at),
      accountId: data.user.account_id,
    };

    return NextResponse.json(formattedData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '게시글 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
