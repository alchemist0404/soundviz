import React, { useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, IconButton, Typography,Button} from "@material-ui/core";
import { BarChart, DesktopMac } from "@material-ui/icons";
import SoundWaveColors from "./SoundWaveColors";
import Backgrounds from "./Backgrounds";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import './set-color.scss';
const useStyles = makeStyles(styles);

export default function SetColor(props) {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState("soundWave");

    return (
        <div className={classNames(classes.setColor, classes.p10)}>
            <Grid className="title">
                <Typography className="title-heading">COLOR</Typography>
                <Typography  className="title-description">Create or select a color palette for your sound wave.</Typography>
            </Grid>
            <Grid className="btn-container">
                <Grid className="btn-box">
                    {/* <IconButton aria-label="linear" >
                        <BarChart fontSize="large" htmlColor={activeTab === "soundWave" ? "red" : ""} />
                    </IconButton>
                    <Typography variant="caption">Sound Wave</Typography> */}
                    <Button  className={(activeTab == 'soundWave') ? 'primary-btn' : 'secondary-btn'} startIcon={<GraphicEqIcon />} onClick={() => setActiveTab("soundWave")}>Sound Wave</Button>
                </Grid>
                <Grid className="btn-box">
                    <Button  className={(activeTab != 'soundWave') ? 'primary-btn' : 'secondary-btn'} startIcon={<WallpaperIcon />} onClick={() => setActiveTab("background")}>Background</Button>
                    {/* <IconButton aria-label="radio" onClick={() => setActiveTab("background")}>
                        <DesktopMac fontSize="large" htmlColor={activeTab === "background" ? "red" : ""} />
                    </IconButton>
                    <Typography variant="caption">Background</Typography> */}
                </Grid>
            </Grid>
            {
                activeTab === "soundWave" ? <SoundWaveColors /> : <Backgrounds />
            }
        </div>
    );
}