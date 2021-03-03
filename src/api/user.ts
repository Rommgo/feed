/*
  Action on api
  https://github.com/public-apis/public-apis
*/
import axios from "axios";
import { CONSTS } from "../config/objectConst";

import { userApiType } from "../types/api/user";

export const user: userApiType = {
    getMyData: async (token) => {
        return axios({
            url: CONSTS.API.url + "users/" + localStorage.getItem("userId"),
            method: "get",
            headers: {
                "user-token": token,
            },
        });
    },
    checkToken: async (token) => {
        return true
    },
};
