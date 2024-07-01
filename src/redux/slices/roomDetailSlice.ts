import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomDetailData } from '../../assets/interfaces.ts';

interface RoomsState {
  selectedRoom: RoomDetailData | null;
}

const initialState: RoomsState = {
  selectedRoom: null,
};

const roomDetailSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    selectRoom(state, action: PayloadAction<RoomDetailData>) {
      state.selectedRoom = action.payload;
    },
  },
});

export const { selectRoom } = roomDetailSlice.actions;
export default roomDetailSlice.reducer;
