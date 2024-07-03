import { useMutation } from '@tanstack/react-query';
import { getValidateEmail, postLogin } from '../api/fetchUsers.ts';

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
    mutationFn: postLogin,
    onError: (error) => {
      console.error(error);
    },
  });
}
