import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomData } from '../../assets/interfaces.ts';

interface RoomsState {
  selectedRoom: RoomData | null;
}

const initialState: RoomsState = {
  selectedRoom: null,
};

const roomDetailSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    selectRoom(state, action: PayloadAction<RoomData>) {
      state.selectedRoom = action.payload;
    },
  },
});

export const { selectRoom } = roomDetailSlice.actions;
export default roomDetailSlice.reducer;
