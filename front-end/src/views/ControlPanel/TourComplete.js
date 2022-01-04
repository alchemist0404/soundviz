import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function TourComplete(props) {
    const classes = useStyles();

    return (
        <div className={classes.tourComplete}>
            <Grid className={classes.title}>
                <Typography variant="h5">YOU MADE IT!</Typography>
                <Typography variant="body2" className={classes.uploadDescription}>Now create your own sound wave by either uploading an audio file or by making a recording.</Typography>
            </Grid>
        </div>
    );
}