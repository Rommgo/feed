import React, { FC } from "react";

// Styles
import "./style.scss";

type buttonType = {
    type?: "button" | "reset" | "submit";
    children: React.ReactNode;
    classes?: string;
    width?: number;
    disabled?: boolean;
    handleClick?: () => void;
};

const GeneralButton: FC<buttonType> = (props: buttonType) => {
    let classes = "main-btn ";
    if (props.classes) {
        classes += props.classes;
    }
    const width = props.width ? `${props.width}` : "";

    return (
        <button
            className={classes}
            style={{ width }}
            disabled={props.disabled}
            type={props.type ? props.type : "button"}
            onClick={props.handleClick}
        >
            {props.children}
        </button>
    );
};

export default GeneralButton;
