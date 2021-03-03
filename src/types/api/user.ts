export type userApiType = {
    getMyData: (token: string | null) => Promise<any>;
    checkToken: (token: string) => Promise<any>;
};
