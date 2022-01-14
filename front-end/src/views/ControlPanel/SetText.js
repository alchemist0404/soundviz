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
  InputLabel
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
      <Grid className="title">
        <Typography variant="h5" className="title-heading">TEXT</Typography>
        <Typography variant="body2" className="title-description">
          Type in text that you would like displayed on your artwork, such as
          the song name or words that were recorded.
        </Typography>
      </Grid>
      <div className="set-text-container">
        <TextField
          id="outlined-basic"
          label="Write a letter you want"
          value={displayText}
          onChange={handleInputText}
          className="text-field"
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
            </Grid>
            <Grid
              className={classNames(classes.mt20)}
              container
              direction="column"
              alignItems="center"
            >
              <ColorPickerInput
                className="color-picker-textbox w-100"
                value={textColor}
                onChange={handleChangeColorInput}
              />
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
            >
              <Grid xs={6} className="column-box pl-0">
                <FormControl
                  variant="outlined"
                  className="text-field"
                >
                <InputLabel id="demo-simple-select-label">Select Your Font</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={textFont}
                    label="Select Your Font"
                    onChange={(e) => {
                      dispatch(setFont(e.target.value));
                      dispatch(updateAudioStyles());
                    }}
                  >
                    {Root.fonts.map((item, i) => (
                      <MenuItem value={item.name} key={i} style={{ fontFamily: item.name }}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6}  className="column-box pr-0">
                <FormControl
                  variant="outlined"
                  className="text-field"
                >
                <InputLabel id="demo-simple-select-label">Font Size</InputLabel>
                  <Select
                    value={fontSize}
                    label="Font Size"
                    onChange={(e) => {
                      dispatch(setFontSize(e.target.value));
                      dispatch(updateAudioStyles());
                    }}
                  >
                    {sizes.map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid  container direction="row" alignItems="center">
              <Grid xs={6} className="icon-container pl-0">
                <div className="icon-list">
                  <IconButton
                    aria-label="linear"
                    onClick={() => handleJustification(0)}
                    className={(textJustification == 0 ) ? 'active' : ''}
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
                    className={(textJustification == 1 ) ? 'active' : ''}
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
                    className={(textJustification == 2 ) ? 'active' : ''}
                  >
                    <Icon
                      icon="carbon:align-horizontal-right"
                      className={classNames(
                        textJustification === 2 ? classes.activeAlignIcon : null
                      )}
                    />
                  </IconButton>
                </div>
              </Grid>
              <Grid xs={6} className="icon-container pr-0">
                <div className="icon-list">
                  <IconButton
                    aria-label="linear"
                    onClick={() => handleVerticalization(0)}
                    className={(textVerticalAlign == 0 ) ? 'active' : ''}
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
                  className={(textVerticalAlign == 1 ) ? 'active' : ''}
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
                  className={(textVerticalAlign == 2 ) ? 'active' : ''}
                >
                  <Icon
                    icon="carbon:align-vertical-bottom"
                    className={classNames(
                      textVerticalAlign === 2 ? classes.activeAlignIcon : null
                    )}
                  />
                </IconButton>
                </div>
              </Grid>
            </Grid>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
}
