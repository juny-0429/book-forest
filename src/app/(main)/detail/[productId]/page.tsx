import { Metadata } from 'next';
import DetailPage from './DetailPage';
import { createSupabaseServer } from 'src/lib/supabaseServer';

type Props = {
  params: { productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = params;

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase.from('product').select('product_name').eq('product_id', Number(productId)).single();

  if (error || !data) {
    return {
      title: '상품 정보를 불러올 수 없습니다 | 책숲',
    };
  }

  return {
    title: `${data.product_name} | 책숲 상세페이지`,
  };
}

export default function Page() {
  return <DetailPage />;
}
