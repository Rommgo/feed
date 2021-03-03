import React, { FC } from 'react';
import {connect} from "react-redux";

// components
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../../organisms/header";
import Footer from "../../organisms/footer";

type MainTemplateType = {
    children: React.ReactNode;
    isValidToken: boolean;
}

const MainTemplate: FC<MainTemplateType> = (props: MainTemplateType) => {
    const component = props.isValidToken ?
        props.children :
        <div className="loader-wrapper-g">
            <CircularProgress color="primary"/>
        </div>;

    return (
        <>
            <div>
                <Header />
                {component}
                <Footer />
            </div>
        </>
    );
};

const mapStateToProps = function(state: any) {
    return {
        isValidToken: state.app.isValidToken
    };
};

export default connect(mapStateToProps)(MainTemplate);
