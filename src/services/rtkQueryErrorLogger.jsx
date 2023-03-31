import { isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
import { resetState } from './slice/authSlice';

export const rtkQueryErrorLogger =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    try {
      console.log('action', action);
      if (isRejectedWithValue(action)) {
        dispatch(resetState());
      }
      return next(action);
    } catch (error) {
      console.log('error', error);
      return error;
    }
  };
