export interface CategoryListDto {
  no: number;
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  parentName: string | null;
}
