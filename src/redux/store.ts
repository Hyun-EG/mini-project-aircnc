import { configureStore } from '@reduxjs/toolkit';
import roomDetailReducer from './slices/roomDetailSlice.ts';

const store = configureStore({
  reducer: {
    rooms: roomDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
