import { auth as authApi } from "../api/auth";
import { user } from "./user";
import store from "../redux/store";
import {Md5 as md5} from "ts-md5";

import { authActionType} from '../types/actions/auth';

export const auth: authActionType = {
    async login(data) {
        try {
            const newData = {
                login: data.login,
                password: md5.hashStr(data.password),
                rememberMe: data.rememberMe
            };
            const result = await authApi.login(newData);
            if (result.status === 200) {
                auth.setLoggedIn(true);
                user.saveMyData(result.data);
                localStorage.setItem("token", "token");
                localStorage.setItem("userId", result.data.id);
                return result.data;
            }
        } catch (e) {
            return false;
        }
    },
    logout() {
        const token = localStorage.getItem("token");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        if (token) {
            authApi.logout(token);
        }
        this.setLoggedIn(false);
        document.location.href = "/login";
        if (!token) {
            return "This user is logged in on another device.";
        }
    },

    setLoggedIn(value) {
        store.dispatch({
            type: "LOGGED_IN",
            payload: {
                isLogged: value
            }
        });
    },
};
