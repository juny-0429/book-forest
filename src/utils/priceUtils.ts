/**
 * 상품 가격과 할인율을 받아 최종 할인된 가격을 계산하는 함수
 * @param originalPrice 원래 가격 (정가)
 * @param discountRate 할인율 (예: 10, 20, 30 등)
 * @returns 할인 적용된 최종 가격 (반올림 적용)
 */

export function calculateDiscountedPrice(originalPrice: number, discountRate: number | null): number {
  if (discountRate === null || discountRate === 0) return originalPrice;

  if (discountRate < 0 || discountRate > 100) {
    throw new Error('할인율은 0에서 100 사이여야 합니다.');
  }

  const discountedPrice = originalPrice * (1 - discountRate / 100);
  return Math.round(discountedPrice);
}
