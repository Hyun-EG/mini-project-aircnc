import { useMutation } from '@tanstack/react-query';
import { validateEmail } from '../api/fetchUsers.ts';

function useValidateEmail() {
  return useMutation({
    mutationFn: validateEmail,
    onError: (error) => {
      console.error(error);
    },
  });
}

export default useValidateEmail;
