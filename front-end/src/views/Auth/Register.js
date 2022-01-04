import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Backdrop, Button, Fade, Grid, Link, Modal, Paper, Snackbar, TextField, Typography } from "@material-ui/core";
import { Axios } from "redux/services";
import MuiAlert from '@material-ui/lab/Alert';
import { handleLogin } from "redux/actions/auth";
import { handleActiveTab } from "redux/actions/theme";

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Register({ open, handleOpenModal, handleLoginModal }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })

    useEffect(() => {
    }, [])

    const handleSubmit = async () => {
        const response = await Axios({
            url: "api/auth/register",
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
                        <Typography align="center" variant="h5" className={classes.mt20}>REGISTER</Typography>
                        <Typography align="center" variant="body2" style={{ inlineSize: "350px", padding: "0 20px" }}>You'll be able to create your own SoundViz once you register.</Typography>
                        <Grid container justify="center" direction="column" className={classNames(classes.pv10, classes.loginModal)}>
                            <TextField
                                id="outlined-firstname-input"
                                label="First name"
                                variant="outlined"
                                className={classes.mv10}
                                value={state.firstName}
                                onChange={(e) => setState({ ...state, firstName: e.target.value })}
                            />
                            <TextField
                                id="outlined-lastname-input"
                                label="Last name"
                                variant="outlined"
                                className={classes.mv10}
                                value={state.lastName}
                                onChange={(e) => setState({ ...state, lastName: e.target.value })}
                            />
                            <TextField
                                id="outlined-email-input"
                                label="Email"
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
                            <Typography variant="caption" className={classes.mv10} align="center">By creating an account you agree to our <Link>terms and conditions</Link> and <Link>privacy policy.</Link></Typography>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Register</Button>
                            <Link align="center" className={classes.mt10} href="#" onClick={handleLoginModal}>
                                Already have an account?
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