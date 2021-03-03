import React, { FC } from "react";

// Components
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

// Styles
import "./style.scss";

type loaderType = {
    classes?: string;
};

const LoaderLocal: FC<loaderType> = (props: loaderType) => {
    let classes = "";
    if (props.classes) {
        classes += props.classes;
    }

    return (
        <div id="loader-local" className={classes}>
            <div className="backdrop">&nbsp;</div>
            <CircularProgress color="primary" />
        </div>
    );
};

export default LoaderLocal;
