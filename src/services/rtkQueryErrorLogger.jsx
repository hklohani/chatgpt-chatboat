import { isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
import { resetState } from './slice/authSlice';

export const rtkQueryErrorLogger =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    try {
      if (isRejectedWithValue(action)) {
        if (action.payload.status === 401) {
          dispatch(resetState());
        }
      }
      return next(action);
    } catch (error) {
      return error;
    }
  };
