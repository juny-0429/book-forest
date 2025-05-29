import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import LineButton from 'src/components/Button/LineButton';
import LucideIcons from 'src/theme/lucideIcon';
import { copyToClipboard } from 'src/utils/copyToClipboard';

interface PostContentProps {
  postContent: string;
  postImageUrl: string | null;
}

export default function PostContent({ postContent, postImageUrl }: PostContentProps) {
  const router = useRouter();
  const { boardCode } = useParams();

  return (
    <section className='flex flex-col gap-5 p-5 border-b border-solid border-gray-300'>
      {postImageUrl && (
        <div className='mx-auto w-[500px] text-center text-body-14 text-ui-text-sub'>
          파일 :
          <a href={`/api/download?url=${encodeURIComponent(postImageUrl)}`} className='underline hover:text-ui-cta transition-colors'>
            {postImageUrl.split('/').pop()}
          </a>
        </div>
      )}
      {postImageUrl && (
        <div className='mx-auto w-[300px]'>
          <Image src={postImageUrl} width={300} height={0} alt='게시글 이미지' className='w-full h-auto' />
        </div>
      )}
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
