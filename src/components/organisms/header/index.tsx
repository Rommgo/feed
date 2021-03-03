import React, {useState, FC, useRef } from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

import helpFunctions from "../../../tools/helpFunctions";
import { auth } from "../../../actions/auth";

import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";


import Phone from "../../../assets/images/phone.svg";
import Website from "../../../assets/images/building.svg";
import Envelop from "../../../assets/images/envelop.svg";
import Exit from "../../../assets/images/exit.svg";
import Close from "../../../assets/images/close.svg";
import Pen from "../../../assets/images/pen.svg";
import Profile from "../../../assets/images/profile.svg";
import ProfileAdmin from "../../../assets/images/profile-admin.svg";

// Styles
import "./style.scss";

type headerType = {
    app: any;
    user: any;
};

export const Header: FC<headerType> = (props: headerType) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    const editAdmin = () => {
        console.log("Edit");
    };

    const buildBackLink = () => {
        let linkData = {
            title: "",
            link: "",
        };
        if (Number(helpFunctions.getParamIdFromUrl())) {
            switch (helpFunctions.getActiveLinkFromUrl()) {
                case "feed":
                    linkData = {
                        title: "Feed",
                        link: "/feeds",
                    };
                    break;
            }
            return (
                <Link to={linkData.link} className="back-link">
                    Back to {linkData.title}
                </Link>
            );
        }
        return "";
    };


    return (
        <div id="header">
            <Link to="/" className={"logo"}>
                <span>Logo</span>
            </Link>
            {buildBackLink()}

            <div className="controll-wrapper">
                <Button
                    className="profile"
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <img src={ProfileAdmin} alt="profile-admin"/>
                    <span>{props.user.username}</span>
                </Button>
            </div>
            <Popper
                open={open}
                className="popper-wrapper"
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === "bottom" ? "center top" : "center bottom"}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <div className="profile-menu">
                                    <div className="top-part">
                                        <div className="name">
                                            <img src={Profile} alt="profile"/>
                                            <span>{props.user.username}</span>
                                        </div>
                                        <div className="actions">
                                            <Button onClick={editAdmin}>
                                                <img src={Pen} alt="pen" />
                                                <span>edit</span>
                                            </Button>
                                            <Button className="close" onClick={handleClose}>
                                                <img src={Close} alt="close"/>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="phone">
                                        <img src={Phone} alt="phone"/>
                                        <span>{props.user.phone}</span>
                                    </div>
                                    <div className="email">
                                        <img src={Envelop} alt="email"/>
                                        <span>{props.user.email}</span>
                                    </div>
                                    <div className="website">
                                        <img src={Website} alt="website"/>
                                        <span>{props.user.website}</span>
                                    </div>
                                    <Button className="exit" onClick={() => auth.logout()}>
                                        <img src={Exit} alt="exit"/>
                                        <span>log out</span>
                                    </Button>
                                </div>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};


const mapStateToProps = function (state: any) {
    return {
        app: state.app,
        user: state.user,
    };
};

export default connect(mapStateToProps)(Header);
