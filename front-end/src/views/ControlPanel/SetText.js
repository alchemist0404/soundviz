import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import ColorPickerInput from "views/Components/ColorPickerInput";
import {
  setText,
  setFont,
  setTextColor,
  setFontSize,
  setJustification,
  setVerticalAlign,
} from "redux/actions/text";
import { Root } from "config";
import { Icon } from "@iconify/react";
import { updateAudioStyles } from "redux/actions/style";

const useStyles = makeStyles(styles);

export default function SetText(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const displayText = useSelector((state) => state.text.displayText);
  const textFont = useSelector((state) => state.text.textFont);
  const textColor = useSelector((state) => state.text.textColor);
  const fontSize = useSelector((state) => state.text.fontSize);
  const printSize = useSelector(state => state.print_size.print_size)

  const [sizes, setSizes] = useState([]);

  var onChangeTimer = null;
  const textJustification = useSelector(
    (state) => state.text.textJustification
  );
  const textVerticalAlign = useSelector(
    (state) => state.text.textVerticalAlign
  );

  useEffect(() => {
    if (displayText.length > 0) {
    }
  }, [displayText]);

  const handleChangeColorInput = (e) => {
    if (onChangeTimer !== null) {
      clearTimeout(onChangeTimer)
    }
    onChangeTimer = setTimeout(() => {
      dispatch(setTextColor(e.css.backgroundColor));
      dispatch(updateAudioStyles());
    }, 500)
  }

  const handleInputText = (e) => {
    dispatch(setText(e.target.value));
    dispatch(updateAudioStyles());
  };

  const handleJustification = (e) => {
    dispatch(setJustification(e))
    dispatch(updateAudioStyles());
  }

  const handleVerticalization = (e) => {
    dispatch(setVerticalAlign(e))
    dispatch(updateAudioStyles());
  }

  useEffect(() => {
    var type = printSize.slice(2, 3)
    var size = printSize.slice(4, 6)
    if (type == "l") {
      switch (size) {
        case "A4":
          setSizes(Root.fontSizes.slice(0, 9))
          break;
        case "A3":
          setSizes(Root.fontSizes.slice(0, 10))
          break;
        case "A2":
          setSizes(Root.fontSizes.slice(0, 11))
          break;
        case "A1":
          setSizes(Root.fontSizes.slice(0, 12))
          break;
        default:
          break;
      }
    } else if (type == "p") {
      switch (size) {
        case "A4":
          setSizes(Root.fontSizes.slice(0, 6))
          break;
        case "A3":
          setSizes(Root.fontSizes.slice(0, 8))
          break;
        case "A2":
          setSizes(Root.fontSizes.slice(0, 9))
          break;
        case "A1":
          setSizes(Root.fontSizes.slice(0, 10))
          break;
        default:
          break;
      }
    }
  }, [printSize])

  return (
    <div className={classes.setText}>
      <Grid className={classes.title}>
        <Typography variant="h5">TEXT</Typography>
        <Typography variant="body2" className={classes.uploadDescription}>
          Type in text that you would like displayed on your artwork, such as
          the song name or words that were recorded.
        </Typography>
      </Grid>
      <TextField
        id="outlined-basic"
        label="Write a letter you want"
        value={displayText}
        onChange={handleInputText}
        className={classNames(classes.mt10, classes.w100)}
        variant="outlined"
      />
      {displayText.length > 0 ? (
        <React.Fragment>
          <Grid
            className={classNames(classes.mt20)}
            container
            direction="column"
            alignItems="center"
          >
            <Typography variant="subtitle2" className={classes.sLeft}>
              Font
            </Typography>
            <FormControl
              variant="outlined"
              className={classNames(classes.formControl, classes.w100)}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={textFont}
                onChange={(e) => {
                  dispatch(setFont(e.target.value));
                  dispatch(updateAudioStyles());
                }}
                className={classNames(classes.w100)}
              >
                {Root.fonts.map((item, i) => (
                  <MenuItem value={item.name} key={i} style={{ fontFamily: item.name }}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            className={classNames(classes.mt20)}
            container
            direction="column"
            alignItems="center"
          >
            <Typography variant="subtitle2" className={classes.sLeft}>
              Color
            </Typography>
            <ColorPickerInput
              className={classNames(classes.formControl, classes.w100)}
              value={textColor}
              onChange={handleChangeColorInput}
            />
          </Grid>
          <Grid
            className={classNames(classes.mt20)}
            container
            direction="column"
            alignItems="center"
          >
            <Typography variant="subtitle2" className={classes.sLeft}>
              Size
            </Typography>
            <FormControl
              variant="outlined"
              className={classNames(classes.formControl, classes.w100)}
            >
              <Select
                value={fontSize}
                onChange={(e) => {
                  dispatch(setFontSize(e.target.value));
                  dispatch(updateAudioStyles());
                }}
                className={classNames(classes.w100)}
              >
                {sizes.map((item, i) => (
                  <MenuItem value={item} key={i}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classNames(classes.mt20)} container>
            <Grid item xs={6} container direction="column" alignItems="center">
              <Typography variant="subtitle2" className={classes.sLeft}>
                Justification
              </Typography>
              <Grid container alignItems="center">
                <IconButton
                  aria-label="linear"
                  onClick={() => handleJustification(0)}
                >
                  <Icon
                    icon="carbon:align-horizontal-left"
                    className={classNames(
                      textJustification === 0 ? classes.activeAlignIcon : null
                    )}
                  />
                </IconButton>
                <IconButton
                  aria-label="linear"
                  onClick={() => handleJustification(1)}
                >
                  <Icon
                    icon="carbon:align-horizontal-center"
                    className={classNames(
                      textJustification === 1 ? classes.activeAlignIcon : null
                    )}
                  />
                </IconButton>
                <IconButton
                  aria-label="linear"
                  onClick={() => handleJustification(2)}
                >
                  <Icon
                    icon="carbon:align-horizontal-right"
                    className={classNames(
                      textJustification === 2 ? classes.activeAlignIcon : null
                    )}
                  />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={6} container direction="column" alignItems="center">
              <Typography variant="subtitle2" className={classes.sLeft}>
                Vertical alignment
              </Typography>
              <Grid container alignItems="center">
                <IconButton
                  aria-label="linear"
                  onClick={() => handleVerticalization(0)}
                >
                  <Icon
                    icon="carbon:align-vertical-top"
                    className={classNames(
                      textVerticalAlign === 0 ? classes.activeAlignIcon : null
                    )}
                  />
                </IconButton>
                <IconButton
                  aria-label="linear"
                  onClick={() => handleVerticalization(1)}
                >
                  <Icon
                    icon="carbon:align-vertical-center"
                    className={classNames(
                      textVerticalAlign === 1 ? classes.activeAlignIcon : null
                    )}
                  />
                </IconButton>
                <IconButton
                  aria-label="linear"
                  onClick={() => handleVerticalization(2)}
                >
                  <Icon
                    icon="carbon:align-vertical-bottom"
                    className={classNames(
                      textVerticalAlign === 2 ? classes.activeAlignIcon : null
                    )}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      ) : null}
    </div>
  );
}
