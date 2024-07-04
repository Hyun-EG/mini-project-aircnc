import { useMutation } from '@tanstack/react-query';
import { getValidateEmail, postLogIn, postSignUp } from '../api/fetchUsers.ts';

export function useValidateEmail() {
  return useMutation({
    mutationFn: getValidateEmail,
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: postLogIn,
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: postSignUp,
    onError: (error) => {
      console.error(error);
    },
  });
}
