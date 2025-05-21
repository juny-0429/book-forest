export interface TaggedProductItemDto {
  productId: number;
  productName: string;
  productSummary: string | null;
  authorName: string;
  publisher: string;
  price: number;
  discount: number | null;
  categoryName: string;
  mainImageUrl: string | null;
}
