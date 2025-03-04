'use client';

import React, { useState } from 'react';
import Button from 'src/components/Button/Button';
import TextInput from 'src/components/TextInput/TextInput';
import LucideIcons from 'src/theme/lucideIcon';

export default function Review() {
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedRating === 0) {
      alert('별점을 선택해주세요!');
      return;
    }
    if (!reviewText.trim()) {
      alert('리뷰를 입력해주세요!');
      return;
    }

    const reviewData = {
      rating: selectedRating,
      comment: reviewText,
    };

    console.log('전송할 데이터:', reviewData);

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert('리뷰가 성공적으로 등록되었습니다!');
        setSelectedRating(0);
        setReviewText('');
      } else {
        alert('리뷰 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('리뷰 등록 중 오류 발생:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className='pb-8 border-b border-solid border-gray-300'>
      <h3 className='mb-5 text-title-24r text-ui-text-title'>리뷰</h3>

      <div className='flex flex-col gap-10'>
        <div>
          <div className='flex items-center gap-1 mb-4'>
            {Array.from({ length: 5 }).map((_, index) => {
              const ratingValue = index + 1; // ⭐ 1~5
              return (
                <button key={ratingValue} onClick={() => handleStarClick(ratingValue)}>
                  <LucideIcons.Star
                    fill='currentColor'
                    size={30}
                    className={ratingValue <= selectedRating ? 'text-green-500' : 'text-gray-500'} // ✅ 선택된 별 개수만큼 초록색 변경
                  />
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className='flex justify-center items-center gap-2'>
            <TextInput placeholder='배송 문의나 욕설 및 인신공격성 글은 노출 제외 처리됩니다.' value={reviewText} onChange={handleInputChange} />
            <Button height={48} className='w-[100px]' type='submit'>
              등록
            </Button>
          </form>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='flex items-center gap-5'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
              </div>

              <span className='text-body-18b text-ui-text-body'>4.5</span>
            </div>

            <span className='text-body-16r text-ui-text-title'>리뷰(26)</span>
          </div>

          <hr className='w-full h-[1px] bg-gray-600' />

          <ul className='flex flex-col gap-10 mx-10'>
            <li className='flex gap-5'>
              <div className='flex gap-1'>
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
                <LucideIcons.Star fill='currentColor' className='text-gray-500' />
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-body-18r text-ui-text-title'>이 책 강추합니다.</p>

                <div className='flex items-center gap-3'>
                  <span className='text-body-14r text-ui-text-description'>juny_0429</span>
                  <time className='text-body-14r text-ui-text-description'>2025-06-11</time>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
