import React, { FC } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const NotFoundContainer: FC = props => {
    return (
        <div id="not-found">Not Found</div>
    );
};

const mapStateToProps = function(state: any) {
    return {
        app: state.app
    };
};

export default connect(mapStateToProps)(withRouter(NotFoundContainer));
