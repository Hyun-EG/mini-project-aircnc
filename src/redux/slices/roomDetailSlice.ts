import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRoom } from '../../api/request.ts';
import { RoomResponse } from '../../assets/interfaces.ts';

export const fetchRoomDetails = createAsyncThunk(
  'roomDetail/fetchRoomDetails',
  async (roomId: number, { rejectWithValue }) => {
    try {
      const response = await getRoom(roomId);
      return response;
    } catch (error: any) {
      const errorMessage = error.response ? error.response.data : error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

interface RoomDetailState {
  room: RoomResponse | null;
  reserved_date: Date[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RoomDetailState = {
  room: null,
  reserved_date: [],
  status: 'idle',
  error: null,
};

const roomDetailSlice = createSlice({
  name: 'roomDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoomDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.room = action.payload.room_response || action.payload.room;
        state.reserved_date = action.payload.reserved_date || [];
      })
      .addCase(fetchRoomDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // action.payload가 undefined가 아닌 경우에만 string으로 타입 단언
      });
  },
});

export default roomDetailSlice.reducer;
