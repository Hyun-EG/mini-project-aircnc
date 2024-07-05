import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRoom } from '../../api/request.ts';

export const fetchRoomDetails = createAsyncThunk(
  'roomDetail/fetchRoomDetails',
  async (roomId: number, { rejectWithValue }) => {
    try {
      const response = await getRoom(roomId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const roomDetailSlice = createSlice({
  name: 'roomDetail',
  initialState: {
    room: null,
    reserved_date: null,
    status: 'idle',
    error: null,
  },
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
        state.error = action.payload || action.error.message;
      });
  },
});

export default roomDetailSlice.reducer;
