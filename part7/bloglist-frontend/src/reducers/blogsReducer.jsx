import { createSlice } from '@reduxjs/toolkit';
import blogServices from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    newBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const returnedBlog = await blogServices.create(blogObject);
    dispatch(newBlog(returnedBlog));
  };
};

export const { newBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
