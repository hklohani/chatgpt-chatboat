import { isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
import { resetState } from './slice/authSlice';

export const rtkQueryErrorLogger =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    try {
      if (isRejectedWithValue(action)) {
        dispatch(resetState());
      }
      return next(action);
    } catch (error) {
      return error;
    }
  };
