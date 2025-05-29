import { NextResponse } from 'next/server';
import { BoardCategoryItemDto } from 'src/app/(main)/board/write/_dtos/getBoardCategoryItem.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.from('board').select('board_name, board_code');

  if (error) return NextResponse.json({ message: '게시판 카테고리 조회 실패', error }, { status: 500 });

  const formatted: BoardCategoryItemDto[] = data.map((item) => ({
    boardName: item.board_name,
    boardCode: item.board_code,
  }));

  return NextResponse.json(formatted);
}
