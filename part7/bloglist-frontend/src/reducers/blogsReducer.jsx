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
    newComment(state, action) {
      const { id, comment } = action.payload;
      const blog = state.find((blog) => blog.id === id);
      if (blog) {
        blog.comments = [...blog.comments, comment];
      }
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

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const returnedComment = await blogServices.addComment(id, { comment });
    dispatch(newComment({ id, comment: returnedComment }));
    const blogs = await blogServices.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const updatePost = (postUpdated, id) => {
  return async (dispatch) => {
    await blogServices.updateLikes(postUpdated, id);
    const blogs = await blogServices.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const deletePost = (idPost) => {
  return async (dispatch) => {
    await blogServices.deletePost(idPost);
    const blogs = await blogServices.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const { newBlog, setBlogs, newComment } = blogSlice.actions;
export default blogSlice.reducer;
