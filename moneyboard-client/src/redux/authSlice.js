import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    info: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.info = null;
    },
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setUser, setUserInfo, logoutUser } = authSlice.actions;
export default authSlice.reducer;