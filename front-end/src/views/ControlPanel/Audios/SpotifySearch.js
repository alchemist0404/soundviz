import { Avatar, CircularProgress, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core'
import { PlayArrow, Stop } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import classNames from 'classnames';
import { Root } from 'config';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setFullPageLoading } from 'redux/actions/theme';
import { audioList } from 'redux/actions/audio'
import { Axios } from 'redux/services';
import ICO_Spotify from '../../../assets/img/Spotify_Icon_CMYK_Green.png'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    search: {
        width: "100%",
        marginTop: "5px"
    },
    searchInput: {
        width: "100%",
    },
    songList: {
        position: "relative",
        maxHeight: "200px",
        overflowY: "auto"
    },
    songListItem: {
        backgroundColor: "#ffffff",
        margin: "5px 0",
        paddingTop: "0px",
        paddingBottom: "0px"
    },
    loadingContent: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.1)",
    },
    overflowHidden: {
        overflow: "hidden"
    },
    songTitle: {
        overflow: "hidden",
        marginTop: "6px",
        marginBottom: "6px",
        flexDirection: "column"
    },
    w100: {
        width: "100%"
    },
    spotifyIcon: {
        width: "35px",
        height: "35px"
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SpotifySearch() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const userData = JSON.parse(localStorage.getItem(Root.key))

    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })
    const [playAudio, setPlayAudio] = useState(null);
    const [playAudioId, setPlayAudioId] = useState("");
    const [filteredSongs, setFilteredSongs] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    const handleFilterSong = async (e) => {
        const filter = e.target.value;
        const spotifySession = localStorage.getItem(Root.spotifyAuth);
        if (filter.length >= 3) {
            // setIsLoading(true)
            if (spotifySession) {
                searchSpotifySongs(filter)
            } else {
                authenticateSpotify(filter)
            }
        } else {
            setFilteredSongs([])
            // setIsLoading(false)
        }
    }

    const authenticateSpotify = async (filter) => {
        const response = await Axios({ url: 'api/audio/spotifyAuthentication' })
        if (response.status) {
            localStorage.setItem(Root.spotifyAuth, JSON.stringify(response.data))
            searchSpotifySongs(filter)
        } else {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: response.data })
        }
    }

    const searchSpotifySongs = async (filter) => {
        const spotifySession = JSON.parse(localStorage.getItem(Root.spotifyAuth));
        const response = await Axios({ url: 'api/audio/searchSpotifySongs', data: { filter, access_token: spotifySession.access_token } })
        if (response.status) {
            setFilteredSongs(response.data.tracks.items)
            // setIsLoading(false)
        } else {
            authenticateSpotify(filter)
        }
    }

    const playMusic = (id, url) => {
        stopMusic();
        setPlayAudio(new Audio(url));
        setPlayAudioId(id)
    }

    const stopMusic = () => {
        if (playAudio) {
            playAudio.pause();
            setPlayAudio(null);
            setPlayAudioId("")
        }
    }

    const selectMusic = async (item) => {
        dispatch(setFullPageLoading())
        const response = await Axios({ url: 'api/audio/loadingSpotifyMusic', data: { user_id: userData._id, preview_url: item.preview_url, name: item.name, image: item.album.images[1].url } })
        if (response.status) {
            dispatch(audioList(response.data))
        } else {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: response.data })
        }
        dispatch(setFullPageLoading())
    }

    useEffect(() => {
        if (playAudio) {
            playAudio.play();
            playAudio.addEventListener("ended", function () {
                setPlayAudio(null);
                setPlayAudioId("");
            });
        }
    }, [playAudio])

    return (
        <div className={classes.search}>
            {/* <Grid container justify="space-between" alignItems="center">
            </Grid> */}
            <TextField
                id="filled-search"
                className={classes.searchInput}
                label="Search over 70 million songs."
                onChangeCapture={handleFilterSong}
                type="search"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start"><img src={ICO_Spotify} alt="Spotify" className={classes.spotifyIcon} /></InputAdornment>,
                }}
            />
            <List className={classes.songList}>
                {
                    filteredSongs.map((item, i) => (
                        <ListItem button key={i} className={classes.songListItem} onClick={() => selectMusic(item)}>
                            <ListItemAvatar>
                                <Avatar src={item.album.images[2].url} />
                            </ListItemAvatar>
                            <Grid container className={classes.songTitle}>
                                <Grid item className={classNames(classes.overflowHidden, classes.w100)}>
                                    <Typography noWrap>{item.name}</Typography>
                                </Grid>
                                <Grid item className={classNames(classes.overflowHidden, classes.w100)}>
                                    <Typography variant="body2" noWrap>{item.artists[0].name}</Typography>
                                </Grid>
                            </Grid>
                            {/* <ListItemText primary={item.name} secondary={item.album.name} className={classes.songTitle} /> */}
                            <ListItemSecondaryAction>
                                {
                                    playAudioId === item.id ?
                                        <IconButton edge="end" aria-label="stop music" onClick={() => stopMusic()}>
                                            <Stop />
                                        </IconButton>
                                        :
                                        <IconButton edge="end" aria-label="play music" onClick={() => playMusic(item.id, item.preview_url)}>
                                            <PlayArrow />
                                        </IconButton>
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
                {/* {
                    isLoading ?
                        <div className={classes.loadingContent}>
                            <CircularProgress />
                        </div> : null
                } */}
            </List>
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({ ...openAlert, open: false })}>
                <Alert onClose={() => setOpenAlert({ ...openAlert, open: false })} severity={openAlert.status}>
                    {openAlert.text}
                </Alert>
            </Snackbar>
        </div>
    )
}
