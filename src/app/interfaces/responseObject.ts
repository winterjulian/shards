export interface ResponseObject {
  status: number;
  message: string;
  isError: boolean;
  errorMessage?: string;
}
