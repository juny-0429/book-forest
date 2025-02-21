import React from 'react';

interface Props {
  title: string;
  description: string;
}

export default function SectionTitle({ title, description }: Props) {
  return (
    <div className='flex items-center gap-2'>
      <h2 className='text-title-24b text-ui-text-title'>{title}</h2>
      <hr className='w-[1px] h-[15px] bg-gray-600' />
      <p className='text-body-16l text-ui-text-description'>{description}</p>
    </div>
  );
}
