import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CalendarState = {
  currentDate: string;
  nextMonthDate: string;
  isOpen: boolean;
};

const initialState: CalendarState = {
  currentDate: new Date().toISOString(),
  nextMonthDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1,
  ).toISOString(),
  isOpen: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    setNextMonthDate: (state, action: PayloadAction<string>) => {
      state.nextMonthDate = action.payload;
    },
  },
});

export const { setCurrentDate, setNextMonthDate } = calendarSlice.actions;
export default calendarSlice.reducer;
