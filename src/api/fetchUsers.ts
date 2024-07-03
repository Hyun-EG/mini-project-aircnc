import { EmailFormSchemaType } from '../schema/userSchema.ts';

const baseUrl = 'http://54.180.158.55:8080/api/auth';

export const validateEmail = async (email: EmailFormSchemaType['email']) => {
  const response = await fetch(`${baseUrl}/email/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'http://localhost:5173/',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'content-type',
    },
    body: null,
  });

  if (!response) {
    throw new Error();
  }

  const body = await response.json();
  return {
    resultCode: body.result.result_code,
    resultMessage: body.result.result_message,
  };
};

export const signUp = async () => {};
