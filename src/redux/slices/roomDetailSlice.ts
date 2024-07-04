import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RoomResponse } from '../../assets/interfaces.ts';

export const fetchRoomDetails = createAsyncThunk(
  'rooms/fetchRoomDetails',
  async (id: string) => {
    const response = await fetch(`http://54.180.158.55:8080/api/rooms/${id}`);
    const data = await response.json();
    return {
      room_response: data.body.room_response,
      reserved_date: data.body.reserved_date,
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
