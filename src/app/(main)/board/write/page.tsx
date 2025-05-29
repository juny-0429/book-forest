'use client';

import React from 'react';
import Button from 'src/components/Button/Button';
import Select from 'src/components/Select/Select';
import TextInput from 'src/components/TextInput/TextInput';
import { SelectOption } from 'src/types/select.types';
import { useGetBoardCategory } from './_hooks/react-query/useGetBoardCategory';
import { Controller, useForm } from 'react-hook-form';
import { boardWriteFormSchema, BoardWriteFormSchema } from './_schemas/BoardWriteFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from './_hooks/react-query/useCreatePost';
import { usePostImageUpload } from './_hooks/usePostImageUpload';
import { useRouter } from 'next/navigation';
import { useAlertModal } from 'src/hooks/useModal';
import { CreatePostDto } from './_dtos/createPostDto';
import { useAuth } from 'src/provider/authProvider';
import { BoardCategoryType } from 'src/types/boardCategory.types';

export default function BoardWritePage() {
  const router = useRouter();
  const { data: categories = [] } = useGetBoardCategory();

  const { uploadImage, imageUrls, removeImage } = usePostImageUpload();
  const { openAlertModal } = useAlertModal();
  const { user } = useAuth();

  const options: SelectOption[] = categories.map((category) => ({
    value: category.boardCode,
    label: category.boardName,
  }));

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BoardWriteFormSchema>({
    resolver: zodResolver(boardWriteFormSchema),
    mode: 'onChange',
  });

  const selectedBoardCode = watch('boardCategory') as BoardCategoryType;
  const { mutate: createPost } = useCreatePost(selectedBoardCode);

  const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const result = await uploadImage(files[0]);
    if (result.success) {
      setValue('postImageUrl', result.url);
    }
  };

  const onSubmit = async (data: BoardWriteFormSchema) => {
    if (!data.boardCategory) {
      return openAlertModal({
        content: '카테고리를 선택해주세요.',
      });
    }

    const payload: CreatePostDto = {
      boardCode: data.boardCategory,
      userId: user?.id ?? '',
      postTitle: data.postTitle,
      postContent: data.postContent,
      postImageUrl: data.postImageUrl,
      isNotice: data.boardCategory === 'NOTICE',
    };

    if (!user?.id) return openAlertModal({ content: '로그인 정보가 없습니다.' });

    createPost(payload, {
      onSuccess: () => {
        openAlertModal({
          content: '게시글이 등록되었습니다.',
          onConfirm: () => router.push(`/board/${data.boardCategory.toLowerCase()}`),
        });
      },
      onError: async (_error) => {
        openAlertModal({
          content: '게시글 등록에 실패했습니다. 업로드한 이미지는 삭제됩니다.',
        });
        await Promise.all(imageUrls.map((url) => removeImage(url)));
      },
    });
  };

  return (
    <div className='flex flex-col gap-10 w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <label className='flex items-center'>
          <span className='w-[150px] text-body-18b text-ui-text-title'>카테고리</span>
          <Controller
            name='boardCategory'
            control={control}
            render={({ field }) => {
              const selectedOption = options.find((opt) => opt.value === field.value) ?? null;

              return <Select options={options} value={selectedOption} onChange={(option) => field.onChange(option?.value)} placeholder='카테고리를 선택하세요' />;
            }}
          />
        </label>

        <label className='flex items-center'>
          <span className='w-[150px] shrink-0 text-body-18b text-ui-text-title'>제목</span>
          <TextInput {...register('postTitle')} placeholder='제목을 입력해주세요.' />
        </label>

        <hr className='w-full h-[2px] bg-gray-300' />

        <label className='flex items-center'>
          <span className='w-[150px] shrink-0 text-body-18b text-ui-text-title'>내용</span>
          <textarea {...register('postContent')} placeholder='내용을 입력해주세요.' className='w-full h-[200px] p-5 outline-none bg-transparent border border-solid border-gray-600 rounded-[8px]' />
        </label>

        <label className='flex items-center'>
          <span className='w-[150px] shrink-0 text-body-18b text-ui-text-title'>이미지 첨부</span>
          <TextInput id='post-upload' type='file' accept='image/*' multiple onChange={onImageUpload} />
        </label>

        <div className='flex justify-center items-center w-full'>
          <Button type='submit' height={56} className='w-[200px]'>
            작성하기
          </Button>
        </div>
      </form>
    </div>
  );
}
