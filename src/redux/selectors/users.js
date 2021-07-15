import { createSelector } from "reselect";

const user = (state) => state.usersReducer.user;
const error = (state) => state.usersReducer.error;
const loading = (state) => state.usersReducer.loading;
const token = (state) => state.usersReducer.user.token;

export const userSelector = createSelector(user, (user) => user);

export const authErrorSelector = createSelector(error, (error) => error);

export const loadingLoginSelector = createSelector(
  loading,
  (loading) => loading
);

export const tokenSelector = createSelector(token, (token) => token);
