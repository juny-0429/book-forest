import { BoardCategoryType } from 'src/types/boardCategory.types';

const boardTitleMap: Record<BoardCategoryType, string> = {
  NOTICE: '공지사항',
  EVENT: '이벤트',
  QNA: 'Q&A',
};

export function getBoardTitle(boardCode: BoardCategoryType): string {
  return boardTitleMap[boardCode] + ' 게시판';
}
