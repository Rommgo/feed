export type responseType<T> = {
    config: any;
    data: any;
    headers: any;
    request: any;
    status: string | number;
    statusText: string;
};

export type loginIncomeType = {
    login: string;
    password: string;
    rememberMe: boolean;
};

export type loginReturnType = {
    login: string;
    password: string | Int32Array;
    rememberMe: boolean;
};

export type authActionType = {
    login: (data: loginIncomeType) => Promise<responseType<loginReturnType>>;
    logout: () => void;
    setLoggedIn: (value: boolean) => void;
};
