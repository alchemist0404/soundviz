import React, { useState } from "react";
import PropTypes from 'prop-types';
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";

import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { ColorLens, MusicNote, Tune, FontDownload, Print, AspectRatio } from "@material-ui/icons";
import UploadAudio from './UploadAudio';

const useStyles = makeStyles(styles);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}


export default function ControlPanel(props) {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, activeTab) => {
        setActiveTab(activeTab);
    };
    return (
        <div className={classes.controlPanel}>
            <Tabs
                value={activeTab}
                onChange={handleChange}
                variant="fullWidth"
                scrollButtons="off"
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab className={classes.controlTab} icon={<MusicNote />} aria-label="Audio" {...a11yProps(0)} />
                <Tab className={classes.controlTab} icon={<ColorLens />} aria-label="Color" {...a11yProps(1)} />
                <Tab className={classes.controlTab} icon={<Tune />} aria-label="Style" {...a11yProps(2)} />
                <Tab className={classes.controlTab} icon={<FontDownload />} aria-label="Text" {...a11yProps(3)} />
                <Tab className={classes.controlTab} icon={<Print />} aria-label="Print" {...a11yProps(4)} />
                <Tab className={classes.controlTab} icon={<AspectRatio />} aria-label="Size" {...a11yProps(5)} />
            </Tabs>
            <TabPanel className={classes.tabPanel} value={activeTab} index={0}>
                <UploadAudio />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={1}>
                Set Color
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={2}>
                Set Style
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={3}>
                Set Text
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={4}>
                Print
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={5}>
                Set Size
            </TabPanel>
        </div>
    );
}