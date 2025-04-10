export interface ProductDetailDto {
  productId: number;
  productName: string;
  productSummary: string;
  authorName: string;
  authorAwards: string | null;
  authorDescription: string | null;
  badgeNames: string[];
  categoryName: string;
  publisher: string;
  price: number;
  discount: number;
  deliveryPrice: number;
  publishedDate: Date;
  mainImages: string[];
  detailImages: string[];
}
