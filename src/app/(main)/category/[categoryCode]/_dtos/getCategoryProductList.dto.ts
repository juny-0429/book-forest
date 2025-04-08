export interface CategoryProductListItem {
  productId: number;
  productName: string;
  productSummary: string | null;
  authorName: string;
  CategoryName: string;
  publisher: string;
  price: number;
  discount: number | null;
  publishedDate: Date;
  mainImageUrl: string | null;
}

export interface CategoryPathItem {
  code: string;
  name: string;
}

export interface CategoryProductListDto {
  categoryPath: CategoryPathItem[];
  categoryProductList: CategoryProductListItem[];
}
