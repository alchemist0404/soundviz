import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, Typography } from "@material-ui/core";
import congImage from '../../assets/img/congratulation.png';
const useStyles = makeStyles(styles);
import './control-panel.scss';
export default function TourComplete(props) {
    const classes = useStyles();

    return (
        <div className="tour-complete">
            <Grid className="title">
                <Typography variant="h5" className="title-heading">You made it!</Typography>
                <Typography variant="body2" className="title-description">Now create your own sound wave by either uploading an audio file or by making a recording.</Typography>
            </Grid>
            <div className="img-box">
                <img src={congImage} />
            </div>
        </div>
    );
}