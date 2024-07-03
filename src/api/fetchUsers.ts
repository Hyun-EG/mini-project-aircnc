import {
  EmailFormSchemaType,
  LoginFormSchemaType,
} from '../schema/userSchema.ts';

const baseUrl = 'http://54.180.158.55:8080/api/auth';

interface ResponseResult {
  resultCode: 200 | 4002;
  resultMessage: string;
}

const getIsSuccessfulFromResponse = async (
  response: Response,
): Promise<boolean> => {
  const body = await response.json();

  console.log(body);
  const result: ResponseResult = {
    resultCode: body.result.result_code,
    resultMessage: body.result.result_message,
  };
  return result.resultCode === 200;
};

export const getValidateEmail = async (email: EmailFormSchemaType['email']) => {
  const response = await fetch(`${baseUrl}/email/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'http://localhost:5173/',
    },
    body: null,
  });

  if (!response) {
    throw new Error();
  }

  const isSuccessful = await getIsSuccessfulFromResponse(response);

  return isSuccessful;
};

export const postLogin = async (
  user: EmailFormSchemaType & LoginFormSchemaType,
) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'http://localhost:5173/',
    },
    body: JSON.stringify(user),
  });

  if (!response) {
    throw new Error();
  }

  const token = response.headers.get('authorization');
  if (token) {
    localStorage.setItem('token', token);
  }

  const isSuccessful = await getIsSuccessfulFromResponse(response);

  return isSuccessful;
};

export const signUp = async () => {};
