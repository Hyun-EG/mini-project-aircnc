import {
  EmailFormSchemaType,
  LoginFormSchemaType,
  User,
} from '../schema/userSchema.ts';

const baseUrl = 'http://54.180.158.55:8080/api/auth';

type FetchMethod = 'GET' | 'POST';
export type ResultCode = 200 | 4000 | 4001 | 4002 | 4003 | 4004;

export const RESULT_MESSAGE = {
  200: '성공',
  4000: 'SignUp Failed',
  4001: 'Login Failed',
  4002: 'Unusable Email',
  4003: 'Unusable Nickname',
  4004: 'Not Match Answer',
} as const;

export interface ResponseResult {
  resultCode: ResultCode;
  resultMessage: string;
}

const responseToResultCode = async (response: Response) => {
  const body = await response.json();

  const result: ResponseResult = {
    resultCode: body.result.result_code,
    resultMessage: body.result.result_message,
  };
  return result.resultCode;
};

interface FetchUserArgs<T> {
  url: string;
  method: FetchMethod;
  body?: T | null;
  setToken?: boolean;
}

const fetchUser = async <T>({
  url,
  method,
  body = null,
  setToken = false,
}: FetchUserArgs<T>): Promise<ResultCode> => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Origin: 'http://localhost:5173/',
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response) {
    throw new Error();
  }

  if (setToken) {
    const token = response.headers.get('authorization');
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  const isSuccessful = await responseToResultCode(response);

  return isSuccessful;
};

export const getValidateEmail = async (email: EmailFormSchemaType['email']) =>
  await fetchUser({ url: `${baseUrl}/email/${email}`, method: 'GET' });

export const postLogIn = async (
  user: EmailFormSchemaType & LoginFormSchemaType,
) =>
  await fetchUser<EmailFormSchemaType & LoginFormSchemaType>({
    url: `${baseUrl}/login`,
    method: 'POST',
    body: user,
    setToken: true,
  });

export const postSignUp = async (user: User) =>
  await fetchUser<User>({
    url: `${baseUrl}/signup`,
    method: 'POST',
    body: user,
  });
