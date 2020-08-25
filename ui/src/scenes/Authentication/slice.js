const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    error: false,
    registeredThisSession: false,
    authToken: "",
    user: {},
  },
  reducers: {
    setError: (state, { payload }) => (state.error = payload),
    setRegistered: (state) => (state.registeredThisSession = true),
    setUserInfo: (state, { payload }) => {
      state.authToken = payload.authToken;
      state.user = payload.userInfo;
    },
    setAuthenticated: (state, { payload }) => (state.authenticated = payload),
  },
});

export const {
  setError,
  setRegistered,
  setUserInfo,
  setAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;
