import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomDetailData } from '../../assets/interfaces.ts';

interface RoomsState {
  rooms: RoomDetailData[];
  selectedRoom: RoomDetailData | null;
}

const initialState: RoomsState = {
  rooms: [],
  selectedRoom: null,
};

const roomDetailSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<RoomDetailData[]>) {
      state.rooms = action.payload;
    },
    selectRoom(state, action: PayloadAction<number>) {
      state.selectedRoom =
        state.rooms.find((room) => room.id === action.payload) || null;
    },
  },
});

export const { setRooms, selectRoom } = roomDetailSlice.actions;
export default roomDetailSlice.reducer;
