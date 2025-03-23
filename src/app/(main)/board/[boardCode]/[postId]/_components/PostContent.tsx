import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import LineButton from 'src/components/Button/LineButton';
import LucideIcons from 'src/theme/lucideIcon';
import { copyToClipboard } from 'src/utils/copyToClipboard';

interface PostContentProps {
  postContent: string;
}

export default function PostContent({ postContent }: PostContentProps) {
  const router = useRouter();
  const { boardCode } = useParams();

  return (
    <section className='flex flex-col gap-5 p-5 border-b border-solid border-gray-300'>
      <p className='text-body-16r text-ui-text-title whitespace-pre-line'>{postContent}</p>

      <div className='flex justify-center items-center gap-1 w-full'>
        <LineButton height={40} className='w-fit' leftIcon={<LucideIcons.Menu size={20} />} onClick={() => router.push(`/board/${boardCode}`)}>
          목록으로 가기
        </LineButton>
        <LineButton height={40} className='w-fit' leftIcon={<LucideIcons.Share2 size={20} />} onClick={() => copyToClipboard(window.location.href)}>
          공유하기
        </LineButton>
      </div>
    </section>
  );
}
