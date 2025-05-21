export interface WishlistItemDto {
  productId: number;
  productName: string;
  productSummary: string;
  authorName: string;
  publisher: string;
  price: number;
  discount: number | null;
  publishedDate: Date;
  mainImageUrl: string;
}
