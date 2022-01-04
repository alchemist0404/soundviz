import React from "react";
import ReactDOM from "react-dom";

// ** Redux Imports
import { Provider } from 'react-redux'
import store from './redux/storeConfig/store'

import "assets/scss/material-kit-react.scss?v=1.10.0";

import Routers from './Routers'
import FullPageLoading from "views/Components/FullPageLoading";

ReactDOM.render(
  <Provider store={store}>
    <FullPageLoading />
    <Routers />
  </Provider>,
  document.getElementById("root")
);
