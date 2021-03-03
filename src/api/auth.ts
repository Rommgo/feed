import axios from "axios";
import {CONSTS} from "../config/objectConst";
import {authApiType} from "../types/api/auth";

export const auth: authApiType = {
    login: async (data) => {
        return axios({
            url: CONSTS.API.url + "users/" + data.login,
            method: "get",
            headers: {
                login: data.login,
                password: data.password,
                "remember-me": data.rememberMe,
            },
        });
    },
    logout: async (token) => {
        return axios({
            url: CONSTS.API.url + "/logout",
            method: "post",
            headers: {
                "Access-Control-Allow-Origin": "*",
                token: token,
            },
        });
    },
};
