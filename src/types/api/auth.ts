import {loginReturnType} from "../actions/auth";

export type authApiType = {
    login: (data: loginReturnType) => Promise<any>;
    logout: (token: string) => void;
};
