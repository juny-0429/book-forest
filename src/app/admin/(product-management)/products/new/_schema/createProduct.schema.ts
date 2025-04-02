import { z } from 'zod';

export const createProductSchema = z.object({
  productName: z.string().min(1, '상품명을 입력해주세요.'),
  authorId: z.number().int(),
  productSummary: z.string().optional(),
  publisher: z.string().min(1, '출판사를 입력해주세요.'),
  isbn: z.string().min(1, 'ISBN을 입력해주세요.'),
  price: z.number().min(0, '가격은 0 이상이어야 합니다.'),
  discount: z.number().min(0).max(100).optional(),
  stock: z.number().min(0, '재고는 0 이상이어야 합니다.'),
  publishedDate: z.coerce.date(),
  isActive: z.boolean(),
  deliveryInfo: z.number(),
  mainImageUrls: z.array(z.string().url('유효한 이미지 URL이 아닙니다.')).min(1, '대표 이미지는 최소 1장 이상 등록해야 합니다.').max(5, '대표 이미지는 최대 5장까지만 등록할 수 있습니다.'),
  detailImageUrl: z.string().url('유효한 이미지 URL이 아닙니다.').min(1, '상세 이미지는 반드시 1장이 필요합니다.'),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
