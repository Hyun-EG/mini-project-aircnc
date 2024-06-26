import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice.ts';
import roomDetailReducer from './slices/roomDetailSlice.ts';
import loginModalReducer from './slices/loginModalSlice.ts';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    rooms: roomDetailReducer,
    loginModal: loginModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
