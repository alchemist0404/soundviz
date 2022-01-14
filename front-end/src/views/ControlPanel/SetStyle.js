import React, { useEffect, Fragment, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, IconButton, Typography,Button } from "@material-ui/core";
import { BarChart, Flare } from "@material-ui/icons";
import {
  handleGraphType,
  handleBarWidth,
  handleBarMaxWidth,
  handleBarSpace,
  handleRadius,
  handleRotate,
  handleBarShape,
  updateAudioStyles,
} from "../../redux/actions/style";
import RCSlider from "../Components/RCSlider";
import { Root } from "config";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import './control-panel.scss';
const useStyles = makeStyles(styles);

export default function SetStyle(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const graphType = useSelector((state) => state.style.graph_type);
  const { bar_width, bar_space, bar_max_width, circle_radius, circle_rotate, bar_shape } = useSelector((state) => state.style);
  const { print_type, print_size } = useSelector(state => state.print_size)
  const contentSize = Root.printSizes[print_type].filter(item => item.id == print_size)[0].size;

  var size = print_size.slice(4, 6)

  const handleChangeGraphType = (e) => {
    dispatch(handleGraphType(e));
    dispatch(updateAudioStyles());
  };

  useEffect(() => {
    if (graphType === "bar") {
      dispatch(handleBarMaxWidth(Math.ceil(contentSize[0] / 68)))
    } else {
      dispatch(handleBarMaxWidth(Math.ceil(contentSize[0] / 24)))
    }
  }, [contentSize, graphType])

  useEffect(() => {
    if (bar_max_width < bar_width) {
      dispatch(handleBarWidth(bar_max_width));
      dispatch(updateAudioStyles());
    }
  }, [graphType, bar_max_width])

  return (
    <div className={classes.setStyle}>
      <Grid className="title">
        <Typography variant="h5" className="title-heading">Style</Typography>
        <Typography variant="body2" className="title-description">
          Select from a radial or linear style. Move the sliders to customize
          the shape.
        </Typography>
      </Grid>
       <Grid className="btn-container">
          <Grid className="btn-box">
              <Button  className={(graphType == 'bar') ? 'primary-btn' : 'secondary-btn'} startIcon={<GraphicEqIcon />} onClick={() => handleChangeGraphType("bar")}>Linear</Button>
          </Grid>
          <Grid className="btn-box">
              <Button  className={(graphType == 'radio') ? 'primary-btn' : 'secondary-btn'} startIcon={<CameraRoundedIcon />} onClick={() => handleChangeGraphType("radio")}>Redial</Button>
          </Grid>
      </Grid>
      {/* <Grid className="">
        <Grid
          className={classNames(
            classes.dFlex,
            classes.fColumn,
            classes.aCenter,
            classes.mh5
          )}
        >
          <IconButton
            aria-label="linear"
            onClick={() => handleChangeGraphType("bar")}
          >
            <BarChart
              fontSize="large"
              htmlColor={graphType === "bar" ? "red" : ""}
            />
          </IconButton>
          <Typography variant="caption">Linear</Typography>
        </Grid>
        <Grid
          className={classNames(
            classes.dFlex,
            classes.fColumn,
            classes.aCenter,
            classes.mh5
          )}
        >
          <IconButton
            aria-label="radio"
            onClick={() => handleChangeGraphType("radio")}
          >
            <Flare
              fontSize="large"
              htmlColor={graphType === "radio" ? "red" : ""}
            />
          </IconButton>
          <Typography variant="caption">Radio</Typography>
        </Grid>
      </Grid> */}
      <div className="color-container">
        <div className="color-box">
          <div className="title p-0">
            <h4 className="title-heading">Style Slider</h4>
            <p className="title-description">Adjust The Slider To Customize.</p>
          </div>
          <Grid className="slider-container">
            <Grid 
              className="slider-box"
            >
              <Typography variant="subtitle2" className="label-text">
                Width
              </Typography>
              <div className="slide-box">
                <RCSlider
                  value={bar_width}
                  min={1}
                  step={1}
                  max={bar_max_width}
                  onChange={(e, value) => {
                    dispatch(handleBarWidth(value));
                    dispatch(updateAudioStyles());
                  }}
                />
              </div>
            </Grid>
            <Grid
              className="slider-box"
            >
              <Typography variant="subtitle2" className="label-text">
                Spacing
              </Typography>
              <div className="slide-box">
                <RCSlider
                  value={bar_space}
                  min={0}
                  step={1}
                  max={bar_max_width}
                  onChange={(e, value) => {
                    dispatch(handleBarSpace(value));
                    dispatch(updateAudioStyles());
                  }}
                />
              </div>
            </Grid>
            {graphType === "bar" ? (
              <Grid
                className="slider-box"
              >
                <Typography variant="subtitle2" className="label-text">
                  Shape
                </Typography>
                <div className="slide-box">
                  <RCSlider
                    value={bar_shape}
                    min={0}
                    step={1}
                    max={400}
                    onChange={(e, value) => {
                      dispatch(handleBarShape(value));
                      dispatch(updateAudioStyles());
                    }}
                  />
                </div>
              </Grid>
            ) : (
              <Fragment>
                <Grid
                  className="slider-box"
                >
                  <Typography variant="subtitle2" className="label-text">
                    Radius
                  </Typography>
                  <div className="slide-box">
                    <RCSlider
                      value={circle_radius}
                      min={0}
                      step={1}
                      max={size === "A1" ? 700 : size === "A2" ? 600 : size === "A3" ? 400 : 300}
                      onChange={(e, value) => {
                        dispatch(handleRadius(value));
                        dispatch(updateAudioStyles());
                      }}
                    />
                  </div>
                </Grid>
                <Grid
                  className="slider-box"
                >
                  <Typography variant="subtitle2" className="label-text">
                    Rotation
                  </Typography>
                  <div className="slide-box">
                    <RCSlider
                      value={circle_rotate}
                      min={0}
                      step={1}
                      max={360}
                      onChange={(e, value) => {
                        dispatch(handleRotate(value));
                        dispatch(updateAudioStyles());
                      }}
                    />
                  </div>
                </Grid>
              </Fragment>
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
}
