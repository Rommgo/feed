import React, { FC } from "react";

// Components
import Dialog from "@material-ui/core/Dialog";
import GeneralButton from "../../atoms/GeneralButton";

// Styles
import "./style.scss";

type modalType = {
    open: boolean;
    title: string;
    description?: string;
    classes?: string;
    children?: React.ReactNode;
    isDeleting?: boolean;
    handleClose: () => void;
    handleSubmit?: () => void;
    closeTitle?: string;
    submitTitle?: string;
};

const ModalWindow: FC<modalType> = (props: modalType) => {
    let classes = "modal-window ";
    if (props.classes) {
        classes += props.classes;
    }

    let actionClasses = "unit-wrap actions ";
    if ((!props.handleSubmit && props.handleClose) || (!props.handleClose && props.handleSubmit)) {
        actionClasses += "center";
    }

    return (
        <Dialog id="modal-window" onClose={props.handleClose} open={props.open} className={classes}>
            <div className="inside">
                <div className="title">{props.title}</div>
                {props.description && <p className="unit-wrap">{props.description}</p>}
                {props.children}
                <div className={actionClasses}>
                    {props.handleClose && (
                        <GeneralButton classes={!props.isDeleting ? "cancel" : "cancel-delete"} handleClick={props.handleClose}>
                            {props.closeTitle ? props.closeTitle : "close"}
                        </GeneralButton>
                    )}
                    {props.handleSubmit && (
                        <GeneralButton classes={!props.isDeleting ? "submit" : "submit-delete"} handleClick={props.handleSubmit}>
                            {props.submitTitle ? props.submitTitle : "submit"}
                        </GeneralButton>
                    )}
                </div>
            </div>
        </Dialog>
    );
};

export default ModalWindow;
