import { appRoutes } from 'src/routes/appRoutes';

export const mockCategoryNavigationList = [
  {
    label: '소설',
    url: appRoutes.category.novel,
    isActive: true,
  },
  {
    label: '시/에세이',
    url: appRoutes.category.poetryEssay,
    isActive: true,
  },
  {
    label: '인문',
    url: appRoutes.category.humanities,
    isActive: true,
  },
  {
    label: '건강',
    url: appRoutes.category.health,
    isActive: true,
  },
  {
    label: '자기계발',
    url: appRoutes.category.selfDevelopment,
    isActive: true,
  },
  {
    label: '정치/사회',
    url: appRoutes.category.politicsSociety,
    isActive: true,
  },
  {
    label: '과학',
    url: appRoutes.category.science,
    isActive: true,
  },
  {
    label: '어린이',
    url: appRoutes.category.children,
    isActive: true,
  },
];
