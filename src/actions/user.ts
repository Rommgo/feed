import { user as userApi } from "../api/user";
import store from "../redux/store";

import { userActionType } from "../types/actions/user";

export const user: userActionType = {
    async getMyData() {
        const token = localStorage.getItem("token");
        try {
            const response = await userApi.getMyData(token);
            if (response.status === 200) {
                this.saveMyData(response.data);
                return response.data;
            }
        } catch (e) {
            return e.response;
        }
    },

    saveMyData(data) {
        store.dispatch({
            type: "MY_DATA",
            payload: {
                myData: data,
            },
        });
    },
};
