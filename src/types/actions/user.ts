import { responseType } from "./auth";

export type myDataType = {
    id: null | number;
    name: null | string;
    phone: null | string;
    email: null | string;
    username: null | string;
    website: null | string;
};

export type userActionType = {
    saveMyData: (data: myDataType) => void;
    getMyData: () => Promise<responseType<myDataType>>;
};
