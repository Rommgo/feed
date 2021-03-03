import { combineReducers } from "redux";
import app from "./app";
import user from "./user";
import { reducer as toastrReducer } from "react-redux-toastr";

export type rootReducerType = {
    app: any;
    user: any;
    toastr: any;
};

export const rootReducer = combineReducers({
    app,
    user,
    toastr: toastrReducer,
});
