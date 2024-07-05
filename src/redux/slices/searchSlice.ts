import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Coordinates {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface SearchState {
  location: string;
  checkInDate: string | null;
  checkOutDate: string | null;
  guestCount: number;
  coordinates: Coordinates;
  mode: boolean;
}

const initialState: SearchState = {
  location: '',
  checkInDate: new Date().toISOString(),
  checkOutDate: new Date(Date.now() + 86400000).toISOString(),
  guestCount: 0,
  coordinates: { top: 0, bottom: 0, right: 0, left: 0 },
  mode: true,
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
      state.coordinates = action.payload;
    },
    setMode: (state, action: PayloadAction<boolean>) => {
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
