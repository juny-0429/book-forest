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
        user_id,
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
      userId: comment.user_id,
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: '댓글 조회 중 오류 발생' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServer();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

    const body = await request.json();
    const { postId, commentContent } = body;

    if (!postId || !commentContent) return NextResponse.json({ error: '필수 값 누락' }, { status: 400 });

    const { data, error } = await supabase
      .from('comment')
      .insert({
        post_id: postId,
        comment_content: commentContent,
        user_id: user.id,
      })
      .select(
        `
      comment_id,
      comment_content,
      create_at,
      parent_comment_id,
      user:user_id (account_id)
    `
      )
      .single();

    if (error) throw error;

    const newComment = {
      commentId: data.comment_id,
      commentContent: data.comment_content,
      createAt: new Date(data.create_at),
      accountId: data.user.account_id,
      parentCommentId: data.parent_comment_id ?? 0,
      replies: [],
    };

    return NextResponse.json(newComment);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: '댓글 등록 중 오류 발생' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);
  const commentId = Number(searchParams.get('commentId'));

  if (!commentId) return NextResponse.json({ error: 'commentId가 필요합니다.' }, { status: 400 });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

  try {
    const { data: commentData, error: commentError } = await supabase.from('comment').select('user_id').eq('comment_id', commentId).single();

    if (commentError || !commentData) return NextResponse.json({ error: '댓글 정보를 찾을 수 없습니다.' }, { status: 404 });

    if (commentData.user_id !== user.id) return NextResponse.json({ error: '본인의 댓글만 삭제할 수 있습니다.' }, { status: 403 });

    const { error } = await supabase.from('comment').update({ is_delete: true }).eq('comment_id', commentId);

    if (error) throw error;

    return NextResponse.json({ message: '댓글이 삭제되었습니다.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: '댓글 삭제 중 오류 발생' }, { status: 500 });
  }
}
