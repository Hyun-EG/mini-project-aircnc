import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../schema/roomSchema.ts';

interface Coordinates {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SearchState {
  location: City | '';
  checkInDate: string | null;
  checkOutDate: string | null;
  guestCount: number;
  coordinates: Coordinates;
  mode: 'city' | 'map';
}

const initialState: SearchState = {
  location: '',
  checkInDate: new Date().toISOString(),
  checkOutDate: new Date(Date.now() + 86400000).toISOString(),
  guestCount: 0,
  coordinates: { top: 0, bottom: 0, right: 0, left: 0 },
  mode: 'city',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setCheckInDate: (state, action: PayloadAction<string | null>) => {
      state.checkInDate = action.payload;
    },
    setCheckOutDate: (state, action: PayloadAction<string | null>) => {
      state.checkOutDate = action.payload;
    },
    setGuestCount: (state, action: PayloadAction<number>) => {
      state.guestCount = action.payload;
    },
    setCoordinates: (state, action: PayloadAction<Coordinates>) => {
      console.log(action.payload);
      state.coordinates = action.payload;
    },
    setMode: (state, action: PayloadAction<'city' | 'map'>) => {
      state.mode = action.payload;
    },
    resetSearch: () => initialState,
  },
});

export const {
  setLocation,
  setCheckInDate,
  setCheckOutDate,
  setGuestCount,
  setCoordinates,
  setMode,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
