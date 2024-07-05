import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RoomResponse } from '../../assets/interfaces.ts';

export const fetchRoomDetails = createAsyncThunk(
  'rooms/fetchRoomDetails',
  async (room_id: string) => {
    const response = await fetch(
      `http://ec2-52-79-187-32.ap-northeast-2.compute.amazonaws.com/api/rooms/${room_id}`,
    );
    const data = await response.json();
    return {
      room_response: data.body.room_response,
      reserved_date: data.body.reserved_date,
    };
  },
);

interface Reservation {
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  totalPrice: number;
}

interface RoomState {
  selectedRoom: RoomResponse | null;
  reservedDate: any[]; // reservedDate 타입 체크 후 명시
  reservations: Reservation[]; // 예약 정보를 저장할 배열 추가
}

const initialState: RoomState = {
  selectedRoom: null,
  reservedDate: [],
  reservations: [],
};

const roomDetailSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    selectRoom: (state, action) => {
      state.selectedRoom = action.payload.room_response;
      state.reservedDate = action.payload.reserved_date;
    },
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomDetails.fulfilled, (state, action) => {
      state.selectedRoom = action.payload.room_response;
      state.reservedDate = action.payload.reserved_date;
    });
  },
});

export const { selectRoom, addReservation } = roomDetailSlice.actions;
export default roomDetailSlice.reducer;
