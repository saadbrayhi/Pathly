export interface IResponse<T = undefined> {
  data?: T;
  message?: string;
  status?: number;
}