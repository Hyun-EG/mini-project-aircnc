import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getRoom,
  getRandomRooms,
  RandomRoomRequestParam,
  getRoomSearch,
} from '../api/request.ts';
import { RoomResponse } from '../assets/interfaces.ts';

export function useRoom(roomId: RoomResponse['room_id']) {
  return useQuery({
    queryKey: ['rooms', roomId],
    queryFn: async () => {
      const response = await getRoom(roomId);

      return response.body.room_response;
    },
  });
}

export function useRandomRooms(params: RandomRoomRequestParam) {
  return useQuery({
    queryKey: ['rooms', { map_x: params.map_x, map_y: params.map_y }],
    queryFn: async () => {
      const response = await getRandomRooms(params);

      return response.body.room_response_list;
    },
  });
}

export function useRoomSearch() {
  return useMutation({
    mutationFn: getRoomSearch,
    onError: (error) => {
      console.error(error);
    },
  });
}
