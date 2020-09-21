import { createSelector } from "@reduxjs/toolkit";

const authSlice = (state) => state.auth;

export const getAuthToken = createSelector(authSlice, (auth) => auth.authToken);
export const getUser = createSelector(authSlice, (auth) => auth.user);
export const getError = createSelector(authSlice, (auth) => auth.error);
