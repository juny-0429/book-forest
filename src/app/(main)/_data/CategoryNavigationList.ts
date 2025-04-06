import { appRoutes } from 'src/routes/appRoutes';
import NovelIcon from '@/assets/icons/categories/novel-icon.png';
import PoetryEssayIcon from '@/assets/icons/categories/poetry-essay-icon.png';
import HumanitiesIcon from '@/assets/icons/categories/humanities-icon.png';
import HealthIcon from '@/assets/icons/categories/health-icon.png';
import SelfImprovementIcon from '@/assets/icons/categories/self-improvement-icon.png';
import PoliticsSocietyIcon from '@/assets/icons/categories/politics-society-icon.png';
import ScienceIcon from '@/assets/icons/categories/science-icon.png';
import ChildrenIcon from '@/assets/icons/categories/children-icon.png';

export const categoryNavigationList = [
  {
    label: '소설',
    url: appRoutes.category.novel,
    icon: NovelIcon,
    isActive: true,
  },
  {
    label: '시/에세이',
    url: appRoutes.category.poetryEssay,
    icon: PoetryEssayIcon,
    isActive: true,
  },
  {
    label: '인문',
    url: appRoutes.category.humanities,
    icon: HumanitiesIcon,
    isActive: true,
  },
  {
    label: '건강',
    url: appRoutes.category.health,
    icon: HealthIcon,
    isActive: true,
  },
  {
    label: '자기계발',
    url: appRoutes.category.selfDevelopment,
    icon: SelfImprovementIcon,
    isActive: true,
  },
  {
    label: '정치/사회',
    url: appRoutes.category.politicsSociety,
    icon: PoliticsSocietyIcon,
    isActive: true,
  },
  {
    label: '과학',
    url: appRoutes.category.science,
    icon: ScienceIcon,
    isActive: true,
  },
  {
    label: '어린이',
    url: appRoutes.category.children,
    icon: ChildrenIcon,
    isActive: true,
  },
];
