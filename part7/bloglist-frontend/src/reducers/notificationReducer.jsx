import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  successMessage: '',
  errorMessage: '',
  errorRemove: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    setErrorRemove(state, action) {
      state.errorRemove = action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const {
  setSuccessMessage,
  setError,
  setErrorRemove,
  clearNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
