const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  authenticated: false,
  error: "",
  registeredThisSession: false,
  authToken: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setRegistered: (state) => {
      state.registeredThisSession = true;
    },
    setUserInfo: (state, { payload }) => {
      state.user = payload;
    },
    setToken: (state, { payload }) => {
      state.authToken = payload;
    },
    logOutUser: (state) => {
      state.authenticated = initialState.authenticated;
      state.user = initialState.user;
      state.authToken = initialState.authToken;
      state.error = initialState.error;
      state.registeredThisSession = initialState.registeredThisSession;
    },
  },
});

export const {
  setError,
  setRegistered,
  setUserInfo,
  setToken,
  logOutUser,
} = authSlice.actions;

export default authSlice.reducer;
