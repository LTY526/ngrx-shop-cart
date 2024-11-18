export interface DataState<T> {
  data: T[];
  error: string | null;
  status: DataStateStatus;
}

export enum DataStateStatus {
  Pending = 'pending',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}