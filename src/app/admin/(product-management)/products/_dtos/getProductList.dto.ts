export interface GetProductListDto {
  productId: number; // 상품 id
  productName: string; // 상품명
  authorName: string; // 작가명
  publisher: string; // 출판사
  isbn: number; // isbn
  price: number; // 가격
  stock: number; // 재고
  isActive: boolean; // 활성화여부
  discount: number | null; // 할인율
  deliveryPrice: number; // 배송비
  publishedDate: Date; // 출판일
}

export interface ProductListResponse {
  productList: GetProductListDto[];
  total: number;
  totalPages: number;
}
