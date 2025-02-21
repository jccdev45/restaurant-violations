export interface RedaxiosError {
  response?: {
    status: number;
    data: any;
  };
  request?: any;
  message?: string;
}
