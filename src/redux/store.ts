import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice.ts';
import roomDetailReducer from './slices/roomDetailSlice.ts';
import loginModalReducer from './slices/loginModalSlice.ts';
import userReducer from './slices/userSlice.ts';
import calendarReducer from './slices/calendarSlice.ts';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    rooms: roomDetailReducer,
    loginModal: loginModalReducer,
    user: userReducer,
    calendar: calendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
