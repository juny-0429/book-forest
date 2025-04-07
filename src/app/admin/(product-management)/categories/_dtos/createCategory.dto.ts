export interface CreateCategoryDto {
  categoryName: string;
  categoryCode: string;
  parentName: string | null;
}
