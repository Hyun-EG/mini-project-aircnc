import { configureStore } from '@reduxjs/toolkit';
import roomDetailReducer from './slices/roomDetailSlice.ts';
import loginModalReducer from './slices/loginModalSlice.ts';

const store = configureStore({
  reducer: {
    rooms: roomDetailReducer,
    loginModal: loginModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
