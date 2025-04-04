import { useState, useMemo } from 'react';
import { GetProductListDto } from '../_dtos/getProductList.dto';

export const useProductSelection = (productList: GetProductListDto[]) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const itemIds = useMemo(() => productList.map((p) => p.productId), [productList]);

  const isAllSelected = itemIds.length > 0 && selectedIds.length === itemIds.length;

  const onCheckItem = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const onCheckItemAll = () => {
    setSelectedIds(isAllSelected ? [] : itemIds);
  };

  const onClearSelectedIds = () => setSelectedIds([]);

  return {
    selectedIds,
    isAllSelected,
    onCheckItem,
    onCheckItemAll,
    onClearSelectedIds,
  };
};
