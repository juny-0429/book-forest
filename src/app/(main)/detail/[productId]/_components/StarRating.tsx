import React from 'react';
import LucideIcons from 'src/theme/lucideIcon';

export default function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating); // ⭐ 전체 색칠된 별 개수
  const hasHalfStar = rating % 1 !== 0; // ⭐ 0.5 별 여부
  const totalStars = 5; // ⭐ 전체 별 개수

  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: totalStars }).map((_, index) => (
        <div key={index} className='relative'>
          <LucideIcons.Star size={24} fill='currentColor' className='text-gray-400' />

          {index < fullStars && <LucideIcons.Star size={24} fill='currentColor' className='text-green-500 absolute top-0 left-0' />}

          {index === fullStars && hasHalfStar && (
            <LucideIcons.Star size={24} fill='currentColor' className='text-green-500 absolute top-0 left-0' style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
          )}
        </div>
      ))}
    </div>
  );
}
