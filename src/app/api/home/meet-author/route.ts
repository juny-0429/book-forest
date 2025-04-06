import { NextResponse } from 'next/server';
import { MeetAuthorDto } from 'src/app/(main)/_dtos/getMeetAuthor.dto';
import { createSupabaseServer } from 'src/lib/supabaseServer';

export async function GET(request: Request) {
  const supabase = await createSupabaseServer();
  const { searchParams } = new URL(request.url);

  const authorNameListParam = searchParams.get('authorNameList');

  if (!authorNameListParam) return NextResponse.json({ error: '작가명이 필요합니다.' }, { status: 400 });

  const authorNameList = authorNameListParam.split(',');

  const { data, error } = await supabase.from('author').select('author_id, author_name, author_description, author_profile_image_url').in('author_name', authorNameList);

  if (!data || error) {
    return new Response(JSON.stringify({ message: '작가 정보를 불러오는 데 실패했습니다.' }), { status: 500 });
  }

  const formattedData = data.map((author) => ({
    authorId: author.author_id,
    authorName: author.author_name,
    authorDescription: author.author_description,
    authorProfileUrl: author.author_profile_image_url,
  }));

  return NextResponse.json(formattedData);
}
