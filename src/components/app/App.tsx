import React, { useEffect, FC, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import LayoutSign from "./LayoutSign";
import LoginContainer from "../containers/Login";
import NotFoundContainer from "../containers/NotFound";
import FeedsContainer from "../containers/Feeds";
import FeedContainer from "../containers/Feed";
import ReduxToastr from "react-redux-toastr";

// style
import "./style.scss";

const App: FC = () => {
  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    const userId: string | null = localStorage.getItem("userId");
    if (token && userId) {
    }
  });
  return (
      <Suspense fallback={null}>
        <Router>
          <Switch>
            <LayoutSign exact path={`/`} component={FeedsContainer} />
            <LayoutSign exact path={`/feeds`} component={FeedsContainer} />
            <LayoutSign exact path={`/feed/*`} component={FeedContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="*" component={NotFoundContainer} />
          </Switch>
        </Router>
        <ReduxToastr
            timeOut={5000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
            className="toastr-custom"
        />
      </Suspense>
  );
};

export default App;
