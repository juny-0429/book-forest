export interface CreateCategoryDto {
  categoryName: string;
  categoryCode: string;
  parentCode: string | null;
}
