export const OPTION_TEXT = [
  '옵션을 선택하세요',
  '거래처 견적서 조회',
  '거래처 견적서 기간에 따른 조회',
  '거래처 주문 내역 조회',
  '거래처 해당 날짜 견적서 제출 여부 파악',
  '거래처 지역 선택',
  '거래처 특이사항 작성',
  '거래처 삭제',
];

export const INPUT_TEXT = [
  '거래처 id',
  '거래처 아이디 입력',
  '페이지',
  '페이지 크기',
  '시작 날짜',
  '종료 날짜',
  '날짜 입력',
  '특이사항 입력',
];

export const BTN_TEXT = ['실행', '삭제'];

export const TABLE_TEXT = ['번호', '이름', '생성일', '수정일', '상태', '가격'];

export const ALERT_TEXT = [
  '해당 거래처의 지역이 변경되었습니다.',
  '특이사항이 저장되었습니다.',
  '거래처가 삭제되었습니다.',
];

export const REGION_TEXT = [
  '지역을 선택하세요',
  '노원',
  '의정부',
  '강남',
  '건대',
  '신촌',
];

export const clientStatusMapping: { [key: string]: string } = {
  COMPLETED: '제출됨',
  CREATED: '생성-미제출',
  NONE: '미제출',
};
