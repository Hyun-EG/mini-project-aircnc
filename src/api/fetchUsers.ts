import {
  EmailFormSchemaType,
  FindPasswordFormSchemaType,
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

interface FetchUserArgs<T> {
  url: string;
  method: FetchMethod;
  body?: T | null;
  setToken?: boolean;
}

interface FetchResult<T> {
  resultCode: ResultCode;
  body: T;
}

const responseToResultCode = async <T>(response: Response) => {
  const body = await response.json();

  const fetchResult: FetchResult<T> = {
    resultCode: body.result.result_code,
    body: body.body,
  };

  return fetchResult;
};

const fetchUser = async <T, K = null>({
  url,
  method,
  body = null,
  setToken = false,
}: FetchUserArgs<T>): Promise<FetchResult<K>> => {
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

  const result = await responseToResultCode<K>(response);

  return result;
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

export const postFindPassword = async (
  user: EmailFormSchemaType & FindPasswordFormSchemaType,
) =>
  await fetchUser<EmailFormSchemaType & FindPasswordFormSchemaType, string>({
    url: `${baseUrl}/help`,
    method: 'POST',
    body: user,
  });
