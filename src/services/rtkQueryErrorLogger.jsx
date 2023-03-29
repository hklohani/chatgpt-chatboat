import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { resetState } from "./slice/authSlice";

export const rtkQueryErrorLogger =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      dispatch(resetState());
    }
    return next(action);
  };
