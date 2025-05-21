import { useQuery } from '@tanstack/react-query';
import { CategorySidebarDto } from '../../_dtos/getCategorySidebar.dto';

export const getCategorySidebarApi = async (categoryCode: string): Promise<CategorySidebarDto> => {
  const response = await fetch(`/api/category/sidebar?categoryCode=${categoryCode}`);
  if (!response.ok) throw new Error('사이드바 데이터를 불러오는 데 실패했습니다.');
  return response.json();
};

const CATEGORY_SIDEBAR = 'CATEGORY_SIDEBAR';

export const useGetCategorySidebar = (categoryCode: string) => {
  return useQuery({
    queryKey: [CATEGORY_SIDEBAR, categoryCode],
    queryFn: () => getCategorySidebarApi(categoryCode),
    enabled: !!categoryCode,
  });
};
