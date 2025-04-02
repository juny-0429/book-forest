import { useQuery } from '@tanstack/react-query';
import { supabaseBrowser } from 'src/lib/supabaseBrowser';

export const searchAuthorApi = async (keyword: string) => {
  const { data, error } = await supabaseBrowser.from('author').select('author_id, author_name').ilike('author_name', `%${keyword}%`).order('author_name');

  if (error) throw new Error('작가 검색 요청에 싪패했습니다.');

  return data?.map((author) => ({
    id: author.author_id,
    name: author.author_name,
  }));
};

export const useSearchAuthor = (keyword: string) => {
  return useQuery({
    queryKey: ['authorSearch', keyword],
    queryFn: () => searchAuthorApi(keyword),
    enabled: !!keyword,
  });
};
