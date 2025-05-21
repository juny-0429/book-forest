export interface SearchProductListItemDto {
  productId: number;
  productName: string;
  productSummary: string;
  authorName: string;
  publisher: string;
  price: number;
  discount: number | null;
  mainImageUrl: string | null;
}
