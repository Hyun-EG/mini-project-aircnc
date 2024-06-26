import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type LoginModalStatus =
  | 'login'
  | 'signup'
  | 'findPassword'
  | 'newPassword'
  | 'changeComplete'
  | null;

export type LoginModalState = {
  status: LoginModalStatus;
};

const initialState: LoginModalState = {
  status: null,
};

const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    setModalStatus: (state, action: PayloadAction<LoginModalStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setModalStatus } = loginModalSlice.actions;
export default loginModalSlice.reducer;
