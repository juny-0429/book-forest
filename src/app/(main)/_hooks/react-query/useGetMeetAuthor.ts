import { useQuery } from '@tanstack/react-query';
import { MeetAuthorDto } from '../../_dtos/getMeetAuthor.dto';

const getMeetAuthorApi = async (authorNameList: string): Promise<MeetAuthorDto[]> => {
  const response = await fetch(`/api/home/meet-author?authorNameList=${authorNameList}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('작가 조회에 실패했습니다.');

  const result = await response.json();

  return result;
};

const MEET_AUTHOR = 'MEET_AUTHOR';

export const useGetMeetAuthor = (authorNameList: string) => {
  return useQuery({
    queryKey: [MEET_AUTHOR, authorNameList],
    queryFn: () => getMeetAuthorApi(authorNameList),
    enabled: !!authorNameList,
  });
};
