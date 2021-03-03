import { generalCRUD as generalCRUDApi } from "../api/generalCRUD";

import { generalCRUDActionType } from "../types/actions/generalCRUD";

export const generalCRUD: generalCRUDActionType = {
    async getAllFeeds(path) {
        const token = localStorage.getItem("token");
        try {
            const response = await generalCRUDApi.getAllFeeds(path, token);
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            return e.response.data;
        }
    },
    async getFeed(path, id) {
        const token = localStorage.getItem("token");
        try {
            const response = await generalCRUDApi.getFeed(path, token, id);
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            return e.response.data;
        }
    },
    async addFeed(path, data) {
        const token = localStorage.getItem("token");
        try {
            const response = await generalCRUDApi.addFeed(path, token, data);
            if (response) {
                return response;
            }
        } catch (e) {
            return e.response.data;
        }
    },
    async editFeed(path, id, data) {
        const token = localStorage.getItem("token");
        try {
            const response = await generalCRUDApi.editFeed(path, token, id, data);
            if (response) {
                return response;
            }
        } catch (e) {
            return e.response.data;
        }
    },
    async deleteFeed(path, id) {
        const token = localStorage.getItem("token");
        try {
            const response = await generalCRUDApi.deleteFeed(path, token, id);
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            return e.response.data;
        }
    },
};
