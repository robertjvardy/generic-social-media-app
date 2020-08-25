import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./scenes/Authentication/slice";

const rootReducer = combineReducers({ auth: AuthReducer });

export default rootReducer;
