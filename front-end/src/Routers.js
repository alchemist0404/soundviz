import React from 'react'
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

// pages for this product
import Home from "views/Home";
import Profile from "views/me/Profile";
import Drafts from "views/me/Drafts";
import Carts from "views/me/Carts";
import ProfileLayout from 'views/Components/Layout/ProfileLayout';

const hist = createBrowserHistory();

export default function Routers() {
    return (
        <Router history={hist}>
            <Switch>
                <Route path="/" exact component={Home} />
                <ProfileLayout>
                    <Route path="/me/profile" exact component={Profile} />
                    <Route path="/me/drafts" exact component={Drafts} />
                    <Route path="/me/carts" exact component={Carts} />
                </ProfileLayout>
            </Switch>
        </Router>
    )
}
