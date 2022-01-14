import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Snackbar, Typography } from "@material-ui/core";
import { GraphicEq, PlayArrow, Stop, Delete } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import { Axios } from 'redux/services';
import { audioList, selectedAudio, updateAudioStyle, playAudio } from 'redux/actions/audio'
import AudioRecording from "./AudioRecording";
import { Root } from "config";
import UploadingProgressModal from "views/Components/UploadingProgressModal";
import axios from "axios";
import SpotifySearch from "./SpotifySearch";

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UploadAudio(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })
    const [openRecording, setOpenRecording] = useState(false)
    const [showUploadingProgress, handleUploadingProgress] = useState(false);
    const [uploadingProgress, setUploadingProgress] = useState(0);

    const userData = JSON.parse(localStorage.getItem(Root.key))

    const audios = useSelector(state => state.audio.audioList)
    const currentAudio = useSelector(state => state.audio.selectedAudio)
    const playingAudio = useSelector(state => state.audio.playingAudio)
    const playingAudioId = useSelector(state => state.audio.playingAudioId)

    const uploadAudio = async (e) => {
        if (!e.target.files[0] || (e.target.files[0] && e.target.files[0].type.indexOf("audio") === -1)) {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: "You should upload an audio file." })
            return
        }

        const color_style = {
            color: Root.defaultColors[0]._id,
            backgroundColor: "#FFFFFF"
        }

        const graph_style = {
            graph_type: "bar",
            bar_width: 2,
            bar_space: 0,
            circle_radius: 0,
            circle_rotate: 0,
            bar_shape: 0
        }

        const text_style = {
            displayText: "",
            textFont: "Alfa Slab One",
            textColor: "#000000",
            fontSize: 14,
            textJustification: 1,
            textVerticalAlign: 1
        }

        const formData = new FormData();
        formData.append("audio", e.target.files[0])
        formData.append("user_id", userData._id)
        formData.append("color", JSON.stringify(color_style))
        formData.append("style", JSON.stringify(graph_style))
        formData.append("text", JSON.stringify(text_style))

        handleUploadingProgress(true)

        const sessionToken = JSON.parse(localStorage.getItem(Root.sessionKey))

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest',
                'access-token': sessionToken
            },
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadingProgress(percentCompleted)
            }
        }

        const response = await axios.post(`${Root.baseurl}api/audio/uploadAudio`, formData, config)

        if (response.data.status) {
            setOpenAlert({ ...openAlert, open: true, status: "success", text: "An audio file has been uploaded successfully!" })
            dispatch(audioList(response.data.data))
            handleUploadingProgress(false)
        }
    }

    const loadAudioJson = async (e) => {
        const response = await Axios({ url: 'api/audio/getJson', data: { filename: e.json_name } })
        if (response.status) {
            dispatch(selectedAudio({ id: e._id, data: response.data }))
        } else {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: response.data })
        }
    }

    const loadAudioData = async (item) => {
        // loadAudioJson(item);
        const response = await Axios({ url: 'api/audio/getAudioStyle', data: { user_id: userData._id, audio_id: item._id } })
        if (response.status) {
            dispatch(updateAudioStyle(response.data))
            dispatch(selectedAudio({ id: item._id, data: item.json_data }))
        } else {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: response.data })
        }

    }

    const makeRecords = () => {
        setOpenRecording(!openRecording)
    }

    const playMusic = (id) => {
        stopMusic();
        const audio_name = audios.find(e => e._id == id).audio_name
        dispatch(playAudio(new Audio(`${Root.baseurl}music/${audio_name}`), id));
    }

    const stopMusic = () => {
        if (playingAudio) {
            playingAudio.pause();
            dispatch(playAudio(null, ""));
        }
    }

    const deleteMusic = async (id) => {
        const response = await Axios({ url: 'api/audio/deleteAudio', data: { user_id: userData._id, _id: id } })
        if (response.status) {
            setOpenAlert({ ...openAlert, open: true, status: "success", text: "An audio file has been deleted successfully!" })
            dispatch(audioList(response.data))
        }
    }

    useEffect(() => {
        if (playingAudio) {
            playingAudio.play();
            playingAudio.addEventListener("ended", function () {
                dispatch(playAudio(null, ""));
            });
        }
    }, [playingAudio])

    // useEffect(() => {
    //     return () => {
    //         if (playAudio) {
    //             playAudio.pause();
    //             setPlayAudio(null);
    //             setPlayAudioId("");
    //         }
    //     }
    // })

    return (
        <div className={classNames(classes.uploadAudio, classes.p10)}>
            <Typography variant="h5">LOAD A SOUND</Typography>
            <Typography variant="body2" className={classes.uploadDescription}>Create or upload your own sound, or choose from your library below.</Typography>
            <Typography variant="caption" color="primary">Max file size: 40mb</Typography>
            <Grid spacing={2} container className={classes.pv10}>
                <Grid item md={6}>
                    <Button variant="contained" color="primary" className={classNames(classes.w100, classes.tCenter)} onClick={() => makeRecords()} disableElevation>Record a sound</Button>
                </Grid>
                <Grid item md={6}>
                    <Button variant="contained" color="primary" className={classNames(classes.w100, classes.tCenter)} disableElevation component="label">
                        Upload a sound
                        <input type="file" hidden accept="audio/*" onChange={uploadAudio} />
                    </Button>
                </Grid>
            </Grid>
            <SpotifySearch />
            <div className={classes.audioList}>
                <List>
                    {
                        audios.map((item, i) => (
                            <ListItem key={i} button className={classes.audioListItem} onClick={() => loadAudioData(item)} style={{ border: currentAudio && currentAudio.id === item._id ? "1px solid #ffba39" : "none", paddingRight: "70px" }}>
                                <ListItemAvatar>
                                    {
                                        !item.image ?
                                            <Avatar>
                                                <GraphicEq />
                                            </Avatar>
                                            : <Avatar src={item.image} />
                                    }
                                </ListItemAvatar>
                                <Grid container className={classes.overflowHidden}>
                                    <Grid item className={classes.overflowHidden}>
                                        <Typography noWrap>{item.origin_name}</Typography>
                                        <Typography variant="body2" noWrap>{item.artist_name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">{new Date(item.date).toLocaleString()}</Typography>
                                    </Grid>
                                </Grid>
                                <ListItemSecondaryAction>
                                    {
                                        playingAudioId === item._id ?
                                            <IconButton edge="end" aria-label="stop music" onClick={() => stopMusic()}>
                                                <Stop />
                                            </IconButton>
                                            :
                                            <IconButton edge="end" aria-label="play music" onClick={() => playMusic(item._id)}>
                                                <PlayArrow />
                                            </IconButton>
                                    }
                                    <IconButton edge="end" aria-label="delete music" onClick={() => deleteMusic(item._id)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
            <AudioRecording open={openRecording} handleOpenModal={makeRecords} />
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({ ...openAlert, open: false })}>
                <Alert onClose={() => setOpenAlert({ ...openAlert, open: false })} severity={openAlert.status}>
                    {openAlert.text}
                </Alert>
            </Snackbar>
            <UploadingProgressModal open={showUploadingProgress} value={uploadingProgress} />
        </div>
    );
}