export * from './sysMenu';
export * from './sysRole';

export type PageQuery<T = any> = T & {
  pageNumber: number;
  pageSize: number;
};

export type PageResp<T = any> = {
  pageNumber: number;
  pageSize: number;
  records: T[];
  searchCount: boolean;
  total: number;
  totalPages: number;
};
