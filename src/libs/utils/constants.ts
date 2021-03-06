import { ReportType } from 'types/dashboard';

export const SERVER_URL = 'http://localhost:8080';

export const WEEK_CHANGE_TYPE = 'WEEK_REQUESTED';

export const INITIAL_WEEK_STATE = ['1900-01-01', '1900-12-31'];

export const COMMON_DATE_FORMAT = 'yyyy-MM-dd';

export const KOREAN_DATE_FORMAT = 'yyyy년 MM월 dd일';

export const BASIC_SCROLL_TIMER = 500;

export const GRAPH_LOADING_TYPE = 'GRAPH_LOADING';

export const HEADERS_ARRAY = [
  'ROAS',
  '광고비',
  '노출수',
  '클릭수',
  '전환수',
  '매출',
];

export const DATA_KEYS: ReportType[] = [
  'roas',
  'cost',
  'imp',
  'click',
  'conv',
  'convValue',
];
