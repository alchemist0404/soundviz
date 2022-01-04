import React from 'react'
import { Button, Card, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import styles from "assets/jss/control-panel.js";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        background: "#fff",
        borderRadius: "5px"
    },
    content: {
        padding: theme.spacing(2)
    },
    item: {
        padding: theme.spacing(2)
    },
    input: {
        margin: "5px 0"
    }
}))
const useStylesBase = makeStyles(styles);

export default function Profile() {

    const classes = useStyles();
    const classesBase = useStylesBase();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Grid container>
                    <Grid item xs={12} md={7} className={classes.item}>
                        <Typography variant="h5" className={classesBase.mb10}>Personal Information</Typography>
                        <TextField
                            id="outlined-required"
                            label="First name"
                            variant="outlined"
                            fullWidth
                            className={classes.input}
                        />
                        <TextField
                            id="outlined-required"
                            label="Last name"
                            variant="outlined"
                            fullWidth
                            className={classes.input}
                        />
                        <TextField
                            id="outlined-required"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            className={classes.input}
                        />
                        <TextField
                            id="outlined-required"
                            label="Phone Number (optional)"
                            variant="outlined"
                            fullWidth
                            className={classes.input}
                        />
                        <Grid container justify="space-between" className={classesBase.mt10}>
                            <Button variant="outlined">Change Password</Button>
                            <Button variant="contained" color="primary">
                                Update Profile
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5} className={classes.item}>
                        <Grid>
                            <Typography variant="h5">Default Shipping Address</Typography>
                            <Button variant="contained" className={classesBase.mv10} disableElevation>Update Address</Button>
                        </Grid>
                        <Grid>
                            <Typography variant="h5">Account Control</Typography>
                            <Button variant="contained" color="secondary" className={classesBase.mv10} disableElevation>Delete Account</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
