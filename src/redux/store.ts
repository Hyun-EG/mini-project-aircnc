import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice.ts';
import roomDetailReducer from './slices/roomDetailSlice.ts';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    rooms: roomDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
