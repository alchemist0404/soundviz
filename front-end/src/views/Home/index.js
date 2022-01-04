import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Header from "components/Header/Header.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import { Grid } from "@material-ui/core";

import ControlPanel from '../ControlPanel';
import GraphContent from '../GraphContent';
import styles from "assets/jss/home.js";
import { colorList, backgroundColorList } from "redux/actions/color";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from "redux/services";
import { audioList, selectedAudio, updateAudioStyle } from "redux/actions/audio";
import { Root } from "config";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { ...rest } = props;

  const userData = JSON.parse(localStorage.getItem(Root.key))

  const audios = useSelector(state => state.audio.audioList)

  useEffect(() => {
    userData ? loadData() : loadGuestData()
  }, [])

  const loadData = () => {
    loadColors()
    loadAudios()
  }

  const loadGuestData = () => {
    loadPublicColor()
    loadDefaultAudio()
  }

  const loadColors = async () => {
    const response = await Axios({
      url: "api/style/getColorsByUserId", data: {
        user_id: userData._id
      }
    })
    if (response.status) {
      dispatch(colorList(response.data))
    }
    const response_ = await Axios({ url: 'api/style/getBackgroundsByUserId', data: { user_id: userData._id } })
    if (response_.status) {
      dispatch(backgroundColorList(response_.data))
    }
  }

  const loadPublicColor = async () => {
    const response = await Axios({
      url: "api/style/getPublicColors"
    })
    if (response.status) {
      dispatch(colorList(response.data))
    }
  }

  const loadAudios = async () => {
    const response = await Axios({
      url: 'api/audio/getAudiosByUserId', data: {
        user_id: userData._id
      }
    })
    if (response.status) {
      dispatch(audioList(response.data))
      dispatch(updateAudioStyle(response.data[0]))
      dispatch(selectedAudio({ id: response.data[0]._id, data: response.data[0].json_data }))
    }
  }

  const loadDefaultAudio = async () => {
    const response = await Axios({ url: 'api/audio/getDefaultAudio' })
    if (response.status) {
      dispatch(audioList(response.data))
      dispatch(selectedAudio({ id: response.data[0]._id, data: response.data[0].json_data }))
    }
  }

  // useEffect(() => {
  //   if (audios.length > 0 && userData) {
  //     loadJSON()
  //   }
  // }, [audios])

  // const loadJSON = async () => {
  //   const audioStyle = await Axios({ url: 'api/audio/getAudioStyle', data: { user_id: userData._id, audio_id: audios[0]._id } })
  //   if (audioStyle.status) {
  //     dispatch(updateAudioStyle(audioStyle.data))
  //   }
  //   const response = await Axios({ url: 'api/audio/getJson', data: { filename: audios[0].json_name } })
  //   if (response.status) {
  //     dispatch(selectedAudio({ id: audios[0]._id, data: response.data }))
  //   }
  // }

  return (
    <React.Fragment>
      {/* <Header
        brand="Audio Visualization"
        rightLinks={<HeaderLinks />}
        fixed
        // color="#fff"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      /> */}
      <Grid container className={classes.root}>
        <Grid item md={4} lg={3} sm={5} xs={12}>
          <ControlPanel />
        </Grid>
        <Grid item md={8} lg={9} sm={7} xs={12}>
          <GraphContent />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
