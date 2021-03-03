import store from "../redux/store";

import { appActionType } from "../types/actions/app";

export const app: appActionType = {
    setIsValidToken(value) {
        store.dispatch({
            type: "VALID_TOKEN",
            payload: {
                isValidToken: value,
            },
        });
    },

    setIsLoadedPage(value) {
        store.dispatch({
            type: "LOADED_PAGE",
            payload: {
                isLoadedPage: value,
            },
        });
    }
};
