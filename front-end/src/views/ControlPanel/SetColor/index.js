import React, { useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { BarChart, DesktopMac } from "@material-ui/icons";
import SoundWaveColors from "./SoundWaveColors";
import Backgrounds from "./Backgrounds";

const useStyles = makeStyles(styles);

export default function SetColor(props) {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState("soundWave");

    return (
        <div className={classNames(classes.setColor, classes.p10)}>
            <Grid className={classes.title}>
                <Typography variant="h5">COLOR</Typography>
                <Typography variant="body2" className={classes.uploadDescription}>Create or select a color palette for your sound wave.</Typography>
            </Grid>
            <Grid container className={classes.mb20}>
                <Grid className={classNames(classes.dFlex, classes.fColumn, classes.aCenter, classes.mh5)}>
                    <IconButton aria-label="linear" onClick={() => setActiveTab("soundWave")}>
                        <BarChart fontSize="large" htmlColor={activeTab === "soundWave" ? "red" : ""} />
                    </IconButton>
                    <Typography variant="caption">Sound Wave</Typography>
                </Grid>
                <Grid className={classNames(classes.dFlex, classes.fColumn, classes.aCenter, classes.mh5)}>
                    <IconButton aria-label="radio" onClick={() => setActiveTab("background")}>
                        <DesktopMac fontSize="large" htmlColor={activeTab === "background" ? "red" : ""} />
                    </IconButton>
                    <Typography variant="caption">Background</Typography>
                </Grid>
            </Grid>
            {
                activeTab === "soundWave" ? <SoundWaveColors /> : <Backgrounds />
            }
        </div>
    );
}