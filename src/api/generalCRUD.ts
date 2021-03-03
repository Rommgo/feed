import axios from "axios";
import { CONSTS } from "../config/objectConst";

import { generalCRUDApiType } from "../types/api/generalCRUD";

export const generalCRUD: generalCRUDApiType = {
    getAllFeeds: async (path, token) => {
        return axios({
            url: CONSTS.API.url + path + `?userId=1`,
            method: "get",
            headers: {
                "user-token": token,
            },
        });
    },
    getFeed: async (path, token, id) => {
        return axios({
            url: CONSTS.API.url + `${path}/${id}`,
            method: "get",
            headers: {
                "user-token": token,
            },
        });
    },
    addFeed: async (path, token, data) => {
        return fetch(CONSTS.API.url + `${path}`, {
            method: 'POST',
            body: JSON.stringify({
                title: data.title,
                body: data.body,
                userId: data.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => response.json());
    },
    editFeed: async (path, token, id, data) => {
        return fetch(CONSTS.API.url + `${path}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: data.id,
                title: data.title,
                body: data.body,
                userId: data.userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((response) => response.json());
    },
    deleteFeed: async (path, token, id) => {
        return fetch(CONSTS.API.url + `${path}/${id}`, {
            method: 'DELETE',
        });
    },
};
