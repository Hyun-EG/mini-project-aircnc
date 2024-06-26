import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../schema/userSchema.ts';

export type UserState = {
  profile: User | null;
};

const initialState: UserState = {
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    clearUser: (state) => {
      state.profile = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
