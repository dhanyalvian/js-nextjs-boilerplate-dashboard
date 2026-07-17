//- src/types/response.ts

export interface ApiResp<T> {
  meta: ApiRespMeta;
  message: string;
  pagination: ApiRespDataPagination;
  records?: T[];
  record?: T;
}

interface ApiRespMeta {
  reqId: string;
  code: number;
}

interface ApiRespDataPagination {
  page: number;
  next: number;
  record: number;
  totalPage: number;
  totalRecord: number;
}
