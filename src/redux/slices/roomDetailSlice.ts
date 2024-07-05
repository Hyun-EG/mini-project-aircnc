import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RoomResponse } from '../../assets/interfaces.ts';
import { getRoom } from '../../api/request.ts'; // 기존 API 함수 사용

export const fetchRoomDetails = createAsyncThunk(
  'rooms/fetchRoomDetails',
  async (room_id: number) => {
    const response = await getRoom(room_id); // 기존 API 함수 사용
    return {
      room_response: response.room_response,
      reserved_date: response.reserved_date,
    };
  },
);

interface RoomState {
  selectedRoom: RoomResponse | null;
  reservedDate: any[]; // reservedDate 한번 추가해보고 타입 체크해서 명시해주기
}

const initialState: RoomState = {
  selectedRoom: null,
  reservedDate: [],
};

const roomDetailSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    selectRoom: (state, action) => {
      state.selectedRoom = action.payload.room_response;
      state.reservedDate = action.payload.reserved_date;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomDetails.fulfilled, (state, action) => {
      state.selectedRoom = action.payload.room_response;
      state.reservedDate = action.payload.reserved_date;
    });
  },
});

export const { selectRoom } = roomDetailSlice.actions;
export default roomDetailSlice.reducer;
