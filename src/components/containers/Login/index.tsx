import React, { useState, useEffect, FC, SyntheticEvent } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../../actions/auth";

// Components
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { toastr } from "react-redux-toastr";

// Styles
import "./style.scss";

type loginType = {
    children?: React.ReactNode;
};

const LoginContainer: FC<any> = (props: loginType) => {
    const history = useHistory();
    const token: string | null = localStorage.getItem("token");
    const userId: string | null = localStorage.getItem("userId");
    const [login, setLogin] = useState("1");
    const [password, setPassword] = useState("test");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (token && userId && token !== "undefined" && userId !== "undefined") {
            history.push("/");
        }
    }, []);

    const textHandler = (event: SyntheticEvent, setter: (n: string) => any) => {
        setter((event.target as HTMLInputElement).value);
    };

    const submitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (login.length > 0 && password.length > 0) {
            const response = await auth.login({ login, password, rememberMe });
            if (response) {
                history.push("/");
                toastr.success("Ok", "logined");
            } else {
                toastr.error("Error", "something went wrong");
            }
        } else {
            toastr.error("Error", "fields must be filled");
        }
    };
    return (
        <div id="login" className="wrapper">
            <div className="content">
                <h2 className="title">Enter in feed reader</h2>
                <form onSubmit={submitHandler}>
                    <div className="row fields">
                        <div className="label">
                            <label htmlFor="login-input">Id</label>
                        </div>
                        <TextField
                            id="login-input"
                            defaultValue={login}
                            label="number from 1 to 10"
                            onChange={(event) => textHandler(event, setLogin)}
                        />
                    </div>
                    <div className="row fields">
                        <div className="label">
                            <label htmlFor="pass-input">Password</label>
                        </div>
                        <TextField
                            id="pass-input"
                            defaultValue={password}
                            type="password"
                            onChange={(event) => textHandler(event, setPassword)}
                        />
                    </div>
                    <div className="row">
                        <div className="label pre-remember">&nbsp;</div>
                        <Checkbox id="remember" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                        <div className="label remember">
                            <label htmlFor="remember">Remember me</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="label">&nbsp;</div>
                        <Button
                            type="submit"
                            variant="contained"
                            value="Login"
                            classes={{ root: "login-btn" }}
                            onClick={(event) => submitHandler(event)}
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = function (state: any) {
    return {
        isValidToken: true,
    };
};

export default connect(mapStateToProps)(withRouter(LoginContainer));
