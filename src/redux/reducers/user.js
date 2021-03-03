/*
 *
 * user reducer
 *
 */
const initialState = {
    id: null,
    name: null,
    phone: null,
    email: null,
    username: null,
    website: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case "MY_DATA":
            return Object.assign({}, state, {
                id: action.payload.myData.id,
                name: action.payload.myData.name,
                phone: action.payload.myData.phone,
                email: action.payload.myData.email,
                username: action.payload.myData.username,
                website: action.payload.myData.website,
            });

        default:
            return state;
    }
};

export default user;
