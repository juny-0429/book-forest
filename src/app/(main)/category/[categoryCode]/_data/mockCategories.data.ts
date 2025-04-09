export const mockCategories = [
  { id: 'all', name: '전체' },
  { id: 'novel', name: '소설' },
  { id: 'poetry-essay', name: '시/에세이' },
  { id: 'humanities', name: '인문' },
  { id: 'health', name: '건강' },
  { id: 'self-development', name: '자기계발' },
  { id: 'politics-society', name: '정치/사회' },
  { id: 'science', name: '과학' },
  { id: 'children', name: '어린이' },
];

export const CATEGORY_PATHS = mockCategories.map((category) => category.id);
