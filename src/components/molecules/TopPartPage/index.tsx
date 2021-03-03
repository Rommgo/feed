import React, { FC } from "react";

// Styles
import "./style.scss";
import GeneralButton from "../../atoms/GeneralButton";

type TopPartPageType = {
    title: string;
    children?: React.ReactNode;
    classes?: string;
    buttonTitle?: string;
    handleClick?: () => void;
};

const TopPartPage: FC<TopPartPageType> = (props: TopPartPageType) => {
    let classes = "";
    if (props.classes) {
        classes += props.classes;
    }

    return (
        <div id="top-part" className={classes}>
            <p className="title">{props.title}</p>
            {props.buttonTitle && (
                <GeneralButton classes="submit" handleClick={props.handleClick}>
                    {props.buttonTitle}
                </GeneralButton>
            )}
        </div>
    );
};

export default TopPartPage;
