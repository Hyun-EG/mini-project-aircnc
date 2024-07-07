import { useQuery, useMutation } from '@tanstack/react-query';
import { getWishes, postWish, deleteWish } from '../api/request.ts';

export function useWishes() {
  return useQuery({
    queryKey: ['wishes'],
    queryFn: async () => {
      const response = await getWishes();

      return response.body.wish_response_list;
    },
  });
}

export function useAddWish() {
  return useMutation({
    mutationFn: postWish,
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useDeleteWish() {
  return useMutation({
    mutationFn: deleteWish,
    onError: (error) => {
      console.error(error);
    },
  });
}
