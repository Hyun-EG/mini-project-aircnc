import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EmailFormSchemaType } from '../../schema/userSchema.ts';

export type LoginModalStatus =
  | 'email'
  | 'login'
  | 'signup'
  | 'findPassword'
  | 'newPassword'
  | 'signUpComplete'
  | 'changeComplete'
  | null;

export type LoginModalState = EmailFormSchemaType & {
  status: LoginModalStatus;
  isFailed: boolean;
};

const initialState: LoginModalState = {
  status: null,
  email: '',
  isFailed: false,
};

const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    setModalStatus: (state, action: PayloadAction<LoginModalStatus>) => {
      state.status = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setIsFailed: (state, action: PayloadAction<boolean>) => {
      state.isFailed = action.payload;
    },
    clearModalState: (state) => {
      state.status = initialState.status;
      state.email = initialState.email;
      state.isFailed = initialState.isFailed;
    },
  },
});

export const { setModalStatus, setEmail, setIsFailed, clearModalState } =
  loginModalSlice.actions;
export default loginModalSlice.reducer;
