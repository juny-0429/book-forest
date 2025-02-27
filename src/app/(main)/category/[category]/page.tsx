import { notFound } from 'next/navigation';
import { CATEGORY_PATHS } from './_data/mockCategories.data';

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  if (!CATEGORY_PATHS.includes(category)) return notFound();

  return (
    <div>
      <h1>{category} 카테고리</h1>
    </div>
  );
}
