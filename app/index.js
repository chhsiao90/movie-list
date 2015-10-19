import React from "react";
import {render} from "react-dom";
import {Router, Route} from "react-router";
import App from "./components/App";
import Channel from "./components/Channel";

render((
    <Router>
        <Route path="/" component={App}>
            <Route path="/channel/:startDate/:endDate/:channelNum" component={Channel} />
        </Route>
    </Router>
), document.getElementById("root"));
