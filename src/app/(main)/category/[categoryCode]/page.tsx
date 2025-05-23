import { createSupabaseServer } from 'src/lib/supabaseServer';
import CategoryPage from './CategoryPage';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ categoryCode: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryCode } = await params;
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.from('category').select('category_name').eq('category_code', categoryCode).single();

  if (error || !data) {
    return {
      title: '카테고리 정보를 불러올 수 없습니다 | 책숲',
    };
  }

  return {
    title: `${data.category_name} | 책숲`,
  };
}

export default function Page() {
  return <CategoryPage />;
}
