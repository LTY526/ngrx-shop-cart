export interface QueryModel {
  pageSize: number;
  page: number;
  predicates?: { [key: string]: any };
}