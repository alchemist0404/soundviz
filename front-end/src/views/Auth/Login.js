import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Avatar, Backdrop, Button, Fade, Grid, IconButton, Link, Modal, Paper, Snackbar, TextField, Typography } from "@material-ui/core";
import { GraphicEq, PlayArrow } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import { handleLogin } from "redux/actions/auth";
import { Axios } from "redux/services";
import { handleActiveTab } from "redux/actions/theme";

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Login({ open, handleOpenModal, handleRegisterModal }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })

    const handleSubmit = async () => {
        const response = await Axios({
            url: "api/auth/login",
            data: state
        })
        if (response.status) {
            dispatch(handleLogin(response.data.userData, response.data.session_token))
            dispatch(handleActiveTab(0))
            handleOpenModal()
        } else {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: response.data })
        }
    }

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classNames(classes.modal)}
                open={open}
                onClose={handleOpenModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} >
                    <Paper className={classes.modalBody}>
                        <Typography align="center" variant="h5" className={classes.mt20}>LOGIN</Typography>
                        <Typography align="center" variant="subtitle2">Welcome back!</Typography>
                        <Grid container justify="center" direction="column" className={classNames(classes.pv10, classes.loginModal)}>
                            <TextField
                                id="outlined-username-input"
                                label="Username"
                                variant="outlined"
                                className={classes.mv10}
                                value={state.email}
                                onChange={(e) => setState({ ...state, email: e.target.value })}
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                className={classes.mv10}
                                value={state.password}
                                onChange={(e) => setState({ ...state, password: e.target.value })}
                            />
                            <Link align="center" className={classes.mv10} href="#" style={{ fontSize: "14px" }}>
                                Forgot Password?
                            </Link>
                            <Button variant="contained" color="primary" onClick={() => handleSubmit()}>LOGIN</Button>
                            <Link align="center" className={classes.mt10} href="#" onClick={handleRegisterModal}>
                                Create an account
                            </Link>
                        </Grid>
                    </Paper>
                </Fade>
            </Modal>
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({ ...openAlert, open: false })}>
                <Alert onClose={() => setOpenAlert({ ...openAlert, open: false })} severity={openAlert.status}>
                    {openAlert.text}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}