import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Root } from "config";
import { useHistory } from "react-router";
import logo from '../../assets/img/logo.png';
import "./control.scss";
const useStyles = makeStyles(styles);

export default function Header({ activeTab, handleActiveTab, tabs, handleRegister }) {
    const classes = useStyles();
    const history = useHistory()
    const userData = JSON.parse(localStorage.getItem(Root.key))

    const goProfile = () => {
        history.push("/me/profile")
    }

    return (
        <Grid className="header">
            <div className="logo" styles="width: 100%;padding: 40px 20px;text-align: center;">
                <img src={logo} />
            </div>
            {
                userData ?
                    <IconButton aria-label="profile" size="medium" onClick={() => goProfile()} className="profile">
                        <AccountCircle fontSize="inherit" />
                    </IconButton>
                    : <div></div>
            }
        </Grid>
    );
}