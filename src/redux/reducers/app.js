/*
 *
 * app reducer
 *
 */
const initialState = {
    isLogged: false,
    isLoadedPage: false,
    isValidToken: true,
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case "LOGGED_IN":
            return Object.assign({}, state, {
                isLogged: action.payload.isLogged,
            });

        case "LOADED_PAGE":
            return Object.assign({}, state, {
                isLoadedPage: action.payload.isLoadedPage,
            });

        case "VALID_TOKEN":
            return Object.assign({}, state, {
                isValidToken: action.payload.isValidToken,
            });

        default:
            return state;
    }
};

export default app;
