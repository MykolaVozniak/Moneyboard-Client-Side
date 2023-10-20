import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    info: null,
    isProjectsExist: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.info = null;
      state.isProjectsExist = false;
    },
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },
    setProjectsExist: (state, action) => {
      state.isProjectsExist = action.payload;
    },
  },
});

export const { setUser, setUserInfo, logoutUser, setProjectsExist } = authSlice.actions;
export default authSlice.reducer;