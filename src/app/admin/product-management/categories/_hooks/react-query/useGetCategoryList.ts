import { useQuery } from "@tanstack/react-query";
import { CategoryListDto } from "../../_dtos/getCategoryList.dto";
import { CategoryLevelType } from "src/types/categoryLevel.types";

const getCategoryListApi = async(categoryLevel: CategoryLevelType): Promise<CategoryListDto[]> => {
  const response = await fetch(`/api/category?categoryLevel=${categoryLevel}`);
  if (!response.ok) throw new Error('댓글을 불러오는 데 실패했습니다.');

  const data = await response.json();

  return data.categoryList;
};

export const useGetCategoryList = (categoryLevel: CategoryLevelType) => {
  return useQuery({
    queryKey: ['categoryList', categoryLevel],
    queryFn: () => getCategoryListApi(categoryLevel),
  })
}