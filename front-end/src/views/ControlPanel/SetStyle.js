import React, { useEffect, Fragment, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, IconButton, Typography } from "@material-ui/core";
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
      <Grid className={classes.title}>
        <Typography variant="h5">Style</Typography>
        <Typography variant="body2" className={classes.uploadDescription}>
          Select from a radial or linear style. Move the sliders to customize
          the shape.
        </Typography>
      </Grid>
      <Grid container className={classes.mb20}>
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
      </Grid>
      <Grid className={classes.divideBar}></Grid>
      <Grid className={classes.ph20}>
        <Grid
          className={classNames(classes.mt20)}
          container
          direction="column"
          alignItems="center"
        >
          <Typography variant="subtitle2" className={classes.sLeft}>
            Width
          </Typography>
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
        </Grid>
        <Grid
          className={classNames(classes.mt20)}
          container
          direction="column"
          alignItems="center"
        >
          <Typography variant="subtitle2" className={classes.sLeft}>
            Spacing
          </Typography>
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
        </Grid>
        {graphType === "bar" ? (
          <Grid
            className={classNames(classes.mt20)}
            container
            direction="column"
            alignItems="center"
          >
            <Typography variant="subtitle2" className={classes.sLeft}>
              Shape
            </Typography>
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
          </Grid>
        ) : (
          <Fragment>
            <Grid
              className={classNames(classes.mt20)}
              container
              direction="column"
              alignItems="center"
            >
              <Typography variant="subtitle2" className={classes.sLeft}>
                Radius
              </Typography>
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
            </Grid>
            <Grid
              className={classNames(classes.mt20)}
              container
              direction="column"
              alignItems="center"
            >
              <Typography variant="subtitle2" className={classes.sLeft}>
                Rotation
              </Typography>
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
            </Grid>
          </Fragment>
        )}
      </Grid>
    </div>
  );
}
