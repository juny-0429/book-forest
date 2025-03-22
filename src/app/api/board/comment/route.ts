import { NextResponse } from 'next/server';
import { CommentListDto } from 'src/app/(main)/board/[boardCode]/_dtos/getCommentList.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);

  const postId = Number(searchParams.get('postId'));

  if (!postId) return NextResponse.json({ error: 'post_id가 필요합니다.' }, { status: 400 });

  try {
    const { data, error } = await supabase
      .from('comment')
      .select(
        `
        comment_id,
        comment_content,
        create_at,
        parent_comment_id,
        user:user_id (account_id)
      `
      )
      .eq('post_id', postId);

    if (error) throw error;

    const formattedData = data.map((comment) => ({
      commentId: comment.comment_id,
      commentContent: comment.comment_content,
      createAt: new Date(comment.create_at),
      accountId: comment.user.account_id,
      parentCommentId: comment.parent_comment_id ?? 0,
      replies: [], // 대댓글을 담을 배열 추가
    }));

    const commentMap = new Map();

    formattedData.forEach((comment) => {
      commentMap.set(comment.commentId, comment);
    });

    const commentList: CommentListDto[] = [];

    formattedData.forEach((comment) => {
      if (comment.parentCommentId === 0) {
        commentList.push(comment);
      } else {
        // 대댓글이면 부모 댓글의 replies 배열에 추가
        const parentComment = commentMap.get(comment.parentCommentId);
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      }
    });

    return NextResponse.json({ commentList });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '댓글 조회 중 오류 발생' }, { status: 500 });
  }
}
