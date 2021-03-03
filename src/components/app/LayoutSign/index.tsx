import React, { useEffect, FC, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { app } from "../../../actions/app";
import { user } from "../../../actions/user";
import * as userApi from "../../../api/user";

// Components
import LoaderLocal from "../../atoms/LoaderLocal";

// types
type LayoutSignType = {
    component: any;
    path?: string;
    exact?: boolean;
    app?: any;
    user?: any;
};

const LayoutSign: FC<LayoutSignType> = ({ component: Component, ...args }: LayoutSignType) => {
    const [allowed, setAllowed] = useState(false);
    const history = useHistory();
    const checkPermission = () => {
        const token: string | null = localStorage.getItem("token");
        const userId: string | null = localStorage.getItem("userId");
        if (token && userId && token !== "undefined" && userId !== "undefined") {
            userApi.user
                .checkToken(token)
                .then((res) => {
                    if (res) {
                        app.setIsValidToken(true);
                        if (!args.user.id) {
                            user.getMyData();
                        }
                        setAllowed(true);
                    }
                })
                .catch((err) => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    history.push("/login");
                });
        } else {
            history.push("/login");
        }
    };
    useEffect(() => {
        checkPermission();
    }, [Component]);


    return allowed ? (
        <Route
            render={() => {
                return <Component {...args} />;
            }}
        />
    ) : (
        <LoaderLocal />
    );
};

const mapStateToProps = function (state: any) {
    return {
        app: state.app,
        user: state.user,
    };
};

export default connect(mapStateToProps)(LayoutSign);
