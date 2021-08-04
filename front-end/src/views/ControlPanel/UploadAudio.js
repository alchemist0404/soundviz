import React, { useState } from "react";
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);


export default function UploadAudio(props) {
    const classes = useStyles();

    return (
        <div className={classes.uploadAudio}>
            <Typography>LOAD A SOUND</Typography>
            <Typography>Create or upload your own sound, or choose from your library below.</Typography>
            <Typography>Max file size: 40mb</Typography>
        </div>
    );
}