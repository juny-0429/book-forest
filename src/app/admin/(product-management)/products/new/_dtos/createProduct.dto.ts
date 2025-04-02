export interface CreateProductDto {
  productName: string;
  authorId: number;
  categoryId: number;
  publisher: string;
  isbn: string;
  price: number;
  discount?: number;
  stock: number;
  deliveryInfo: number;
  isActive: boolean;
  publishedDate: Date;
  mainImageUrls: string[];
  detailImageUrls: string[];
}
