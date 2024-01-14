export interface IValidateResponce {
  status: number;
  data: {
    errorMessages: Array<{ field: InputsType; message: string }>;
    message: string;
    path: string;
    statusCode: number;
    timestamp: string;
  };
}

export type InputsType = 'password';
