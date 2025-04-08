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

export interface CategoryProductListDto {
  categoryProductList: CategoryProductListItem[];
  paginationMeta: {
    currentPage: number;
    nextPage: number | null;
    pageSize: number;
  };
}
