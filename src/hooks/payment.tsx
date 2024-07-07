import { useQuery, useMutation } from '@tanstack/react-query';
import { getPayments, postPayment } from '../api/request.ts';

export function usePayments() {
  return useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await getPayments();

      return response.body.payment_response_list;
    },
  });
}

export function usePay() {
  return useMutation({
    mutationFn: postPayment,
    onError: (error) => {
      console.error(error);
    },
  });
}
