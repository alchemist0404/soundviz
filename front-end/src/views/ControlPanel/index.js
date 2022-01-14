import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";

import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { ColorLens, MusicNote, Tune, FontDownload, Print, AspectRatio, CheckCircle } from "@material-ui/icons";
import FormatColorFillOutlinedIcon from '@mui/icons-material/FormatColorFillOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UploadAudio from 'views/ControlPanel/Audios';
import SetColor from './SetColor';
import SetStyle from './SetStyle';
import SetText from "./SetText";
import Prints from "./Print";
import SetSize from "./SetSize";
import TourComplete from './TourComplete';
import FooterNavigation from 'views/Components/FooterNavigation';
import Login from "views/Auth/Login";
import Register from "views/Auth/Register";
import Header from "views/Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { handleActiveTab } from "redux/actions/theme";
import { Root } from "config";
import './control-panel.scss';
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
    const dispatch = useDispatch();
    const userData = JSON.parse(localStorage.getItem(Root.key))
    const activeTab = useSelector(state => state.theme.activeTab);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false)
    const tabs = userData ? [0, 1, 2, 3, 4, 5] : [7, 1, 2, 3, 6]

    const handleChange = (event, activeTab) => {
        dispatch(handleActiveTab(activeTab));
    };

    const handleLoginModal = () => {
        setOpenRegister(false)
        setOpenLogin(!openLogin)
    }

    const handleRegisterModal = () => {
        setOpenLogin(false)
        setOpenRegister(!openRegister)
    }

    return (
        <div className="tabs">
            <Header />
            <Tabs
                value={activeTab}
                onChange={handleChange}
                variant="fullWidth"
                scrollButtons="off"
                indicatorColor="primary"
                textColor="primary"
                className={classes.controlTabs}
            >
                {userData ? <Tab className={classes.controlTab} icon={<MusicNote />} aria-label="Audio" value={0} {...a11yProps(0)} /> : null}
                <Tab className={classes.controlTab} icon={<FormatColorFillOutlinedIcon />} aria-label="Color" value={1} {...a11yProps(1)} />
                <Tab className={classes.controlTab} icon={<TuneOutlinedIcon />} aria-label="Style" value={2} {...a11yProps(2)} />
                <Tab className={classes.controlTab} icon={<TextFieldsIcon />} aria-label="Text" value={3} {...a11yProps(3)} />
                {userData ? <Tab className={classes.controlTab} icon={<Print />} aria-label="Print" value={4} {...a11yProps(4)} /> : null}
                {
                    userData ?
                        <Tab className={classes.controlTab} icon={<AspectRatio />} aria-label="Size" value={5} {...a11yProps(5)} />
                        : <Tab className={classes.controlTab} icon={<CheckCircle />} aria-label="Size" value={6} {...a11yProps(6)} />
                }
                <Tab className={classes.controlTab} aria-label="Welcome message" style={{ display: "none" }} value={7} {...a11yProps(7)} />
            </Tabs>
            <TabPanel className={classes.tabPanel} value={activeTab} index={7}>
                <div className={classes.p10}>
                    <Grid className="title">
                        <Typography variant="h4" className="title-heading">WELCOME!</Typography>
                        <Typography variant="body1" className="title-description">{`We’ve loaded a demo sound so you can play around and see how this works.`}</Typography>
                        <Typography variant="body1" className='title-description'>{`Begin our short tutorial or create your own sound wave at any time.`}</Typography>
                    </Grid>
                </div>
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={0}>
                <UploadAudio />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={1}>
                <SetColor />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={2}>
                <SetStyle />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={3}>
                <SetText />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={4}>
                <Prints />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={5}>
                <SetSize />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={6}>
                <TourComplete />
            </TabPanel>
            <FooterNavigation activeTab={activeTab} tabs={tabs} handleRegister={handleRegisterModal} />
            <Login open={openLogin} handleOpenModal={handleLoginModal} handleRegisterModal={handleRegisterModal} />
            <Register open={openRegister} handleOpenModal={handleRegisterModal} handleLoginModal={handleLoginModal} />
        </div>
    );
}