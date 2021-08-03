import React from "react";
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import { Grid } from "@material-ui/core";

import ControlPanel from '../ControlPanel';
import GraphContent from '../GraphContent';
import styles from "assets/jss/home.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <React.Fragment>
      <Header
        brand="Audio Visualization"
        rightLinks={<HeaderLinks />}
        fixed
        // color="#fff"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Grid container className={classes.root}>
        <Grid item md={3}>
          <ControlPanel />
        </Grid>
        <Grid item md={9}>
          <GraphContent />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
