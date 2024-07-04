import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RoomDetailData } from '../../assets/interfaces.ts';

export const fetchRoomDetails = createAsyncThunk(
  'rooms/fetchRoomDetails',
  async (id: string) => {
    const response = await fetch(`http://54.180.158.55:8080/api/rooms/${id}`);
    const data: RoomDetailData = await response.json();
    return data;
  },
);

interface RoomState {
  selectedRoom: RoomDetailData | null;
}

const initialState: RoomState = {
  selectedRoom: null,
};

const roomDetailSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    selectRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomDetails.fulfilled, (state, action) => {
      state.selectedRoom = action.payload;
    });
  },
});

export const { selectRoom } = roomDetailSlice.actions;
export default roomDetailSlice.reducer;
