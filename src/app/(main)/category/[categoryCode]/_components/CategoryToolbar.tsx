import LineButton from 'src/components/Button/LineButton';
import { cn } from 'src/lib/utils';
import LucideIcons from 'src/theme/lucideIcon';

interface CategoryToolbarProps {
  view: 'grid' | 'list';
  onUpdateViewType: (type: 'grid' | 'list') => void;
  onAddToCart: () => void;
}

export default function CategoryToolbar({ view, onUpdateViewType, onAddToCart }: CategoryToolbarProps) {
  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex justify-center items-center gap-1 w-fit'>
        <LineButton height={40} color='gray' leftIcon={<LucideIcons.Heart size={20} />}>
          찜하기
        </LineButton>
        <LineButton height={40} color='gray' leftIcon={<LucideIcons.ShoppingCart size={20} />} onClick={onAddToCart}>
          카트담기
        </LineButton>
      </div>

      <div className='flex justify-center items-center gap-3'>
        <button
          onClick={() => {
            if (view !== 'grid') onUpdateViewType('grid');
          }}
        >
          <LucideIcons.Grid2X2 size={30} className={cn(view === 'grid' ? 'text-gray-900' : 'text-gray-600')} />
        </button>
        <button
          onClick={() => {
            if (view !== 'list') onUpdateViewType('list');
          }}
        >
          <LucideIcons.Menu size={30} className={cn(view === 'list' ? 'text-gray-900' : 'text-gray-600')} />
        </button>
      </div>
    </div>
  );
}
