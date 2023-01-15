import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { eraseCookie, extractToken, setCredentials } from '../../utils/utils';
import { getUser, login, logout, patchUser, register } from '../actions/auth';
import { Tokens } from '../../utils/constants';

const initialState = { user: null, isLoading: false, error: null, isAuthorized: false };
const isAnyActionsPending = isPending(getUser, login, logout, patchUser, register);
const isAuthActionsFulfilled = isFulfilled(login, logout, register);
const isUserActionsFulfilled = isFulfilled(getUser, patchUser);
const isAnyActionsRejected = isRejected(getUser, login, logout, patchUser, register);
const isAuthActionsRejected = isRejected(login, logout, register);
const isUserActionsRejected = isRejected(getUser, patchUser);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state, action) => {
        const { message, success } = action.payload;
        if (success) {
          state.user = null;
          eraseCookie(Tokens.ACCESS_TOKEN);
          eraseCookie(Tokens.REFRESH_TOKEN);
        } else {
          console.log(message);
        }
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(isAnyActionsPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyActionsRejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      .addMatcher(isAuthActionsFulfilled, (state, action) => {
        const { success, message, user, accessToken, refreshToken } = action.payload;
        if (success) {
          state.user = user;
          state.error = null;
          state.isAuthorized = true;
          setCredentials(extractToken(accessToken), refreshToken);
        } else {
          state.error = message;
          state.isAuthorized = false;
        }
        state.isLoading = false;
      })
      .addMatcher(isUserActionsFulfilled, (state, action) => {
        const { success, user, message } = action.payload;
        if (success) {
          state.user = user;
          state.error = null;
        } else {
          state.error = message;
        }
        state.isLoading = false;
      });
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
