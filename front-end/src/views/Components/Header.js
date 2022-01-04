import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Root } from "config";
import { useHistory } from "react-router";

const useStyles = makeStyles(styles);

export default function Header({ activeTab, handleActiveTab, tabs, handleRegister }) {
    const classes = useStyles();
    const history = useHistory()
    const userData = JSON.parse(localStorage.getItem(Root.key))

    const goProfile = () => {
        history.push("/me/profile")
    }

    return (
        <Grid container justify="space-between" alignItems="center" className={classes.header}>
            <Typography variant="h5" style={{ fontSize: "22px" }}>Audio Visualization</Typography>
            {
                userData ?
                    <IconButton aria-label="profile" size="medium" onClick={() => goProfile()} style={{padding: "0px", fontSize: "2.5rem"}}>
                        <AccountCircle fontSize="inherit" />
                    </IconButton>
                    : <div></div>
            }
        </Grid>
    );
}