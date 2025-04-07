export interface CategoryListDto {
  no: number | null;
  categoryId: number;
  categoryName: string;
  categoryCode: string;
  parentName: string | null;
}
