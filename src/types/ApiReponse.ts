export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}