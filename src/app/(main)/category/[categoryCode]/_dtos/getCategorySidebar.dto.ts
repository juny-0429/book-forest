export interface CategoryItem {
  categoryCode: string;
  categoryName: string;
}

export interface CategorySidebarDto {
  currentGroup: {
    parent: CategoryItem | null;
    children: CategoryItem[];
  };
  otherTopCategoryList: CategoryItem[];
}
