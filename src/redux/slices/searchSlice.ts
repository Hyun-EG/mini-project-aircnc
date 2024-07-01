// searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  location: string;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  guestCount: number;
}

const initialState: SearchState = {
  location: '',
  checkInDate: new Date(), // 여기 Date 정보 number나 string으로 변환 필요할듯(nonserial)
  checkOutDate: new Date(Date.now() + 86400000),
  guestCount: 0,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setCheckInDate: (state, action: PayloadAction<Date | null>) => {
      state.checkInDate = action.payload;
    },
    setCheckOutDate: (state, action: PayloadAction<Date | null>) => {
      state.checkOutDate = action.payload;
    },
    setGuestCount: (state, action: PayloadAction<number>) => {
      state.guestCount = action.payload;
    },
    resetSearch: () => initialState,
  },
});

export const {
  setLocation,
  setCheckInDate,
  setCheckOutDate,
  setGuestCount,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
