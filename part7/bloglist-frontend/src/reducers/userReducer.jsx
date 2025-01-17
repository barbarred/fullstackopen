import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    closeSession(state) {
      return null;
    },
  },
});

export const saveUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    dispatch(setUser(user));
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    blogService.setToken(user.token);
  };
};

export const { setUser, closeSession } = userSlice.actions;
export default userSlice.reducer;
