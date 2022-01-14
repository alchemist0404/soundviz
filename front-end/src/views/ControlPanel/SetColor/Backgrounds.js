import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import './set-color.scss';
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add, Done } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import { selectedBackground } from "redux/actions/color";
import { Root } from "config";
import { updateAudioStyles } from "redux/actions/style";
import ColorPickerInput from "views/Components/ColorPickerInput";
import { backgroundColorList } from "redux/actions/color";
import { Axios } from "redux/services";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Backgrounds(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { backgroundColor } = useSelector((state) => state.color);
  var onChangeTimer = null;

  const userData = JSON.parse(localStorage.getItem(Root.key))

  const { backgroundColorsList } = useSelector((state) => state.color);

  const [backgroundLists, setBackgroundLists] = useState([])
  const [saveColor, setSaveColor] = useState(false)
  const [colorName, setColorName] = useState("")
  const [openAlert, setOpenAlert] = useState({
    open: false,
    status: "success",
    text: ""
  })

  const changeCustomColor = (e) => {
    if (onChangeTimer !== null) {
      clearTimeout(onChangeTimer)
    }
    onChangeTimer = setTimeout(() => {
      dispatch(selectedBackground(e.css.backgroundColor));
      dispatch(updateAudioStyles());
    }, 500)
  }

  const wantSaveBackgroundColor = async () => {
    if (Root.backgroundColors.filter(item => item.color == backgroundColor).length > 0) {
      setOpenAlert({ ...openAlert, open: true, status: "warning", text: "This color already exists in the default background colors!" })
      return;
    }
    setSaveColor(true)
  }
  
  const saveBackgroundColor = async () => {
    if (colorName.length == 0) {
      setOpenAlert({ ...openAlert, open: true, status: "warning", text: "Please fill the name input!" })
      return;
    }

    const response = await Axios({ url: 'api/style/addBackgroundColor', data: { user_id: userData._id, background: backgroundColor, name: colorName } })
    if (response.status) {
      dispatch(backgroundColorList(response.data))
      setSaveColor(false)
    } else {
      setOpenAlert({ ...openAlert, open: true, status: "error", text: response.data })
    }
  }

  useEffect(() => {
    setBackgroundLists(backgroundColorsList.concat(Root.backgroundColors))
  }, [backgroundColorsList])

  return (
    <React.Fragment>
     <div className="color-container">
        <div className="color-box">
          <div className="color-picker-box">
            <div className="text-box">
                <ColorPickerInput
                className="color-picker-textbox"
                value={backgroundColor}
                onChange={changeCustomColor}
              />
            </div>
            {
              saveColor ? 
              <div className="text-box"><TextField id="outlined-basic" label="Please write the name." value={colorName} onChange={(e) => setColorName(e.target.value)} className={classNames(classes.mt10, classes.w100)} variant="outlined" /> </div> : null
            }
            {
              saveColor ?
                <Grid className="btn-container px-0">
                  <div className="btn-box">
                      <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Add />}
                      className="secondary-btn"
                      onClick={() => saveBackgroundColor()}
                    >
                      Save
                    </Button>
                  </div>
                  <div className="btn-box">
                    <Button
                      variant="contained"
                      color="primary"
                      className="primary-btn"
                      onClick={() => {
                        setSaveColor(false);
                        setColorName("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>
                :
                null
            }
          </div>
            <List className={saveColor ? 'color-list-active color-list' : 'color-list'}>
              {backgroundLists.map((item, i) => (
                <ListItem
                  key={i}
                  button
                  className={classes.audioListItem}
                  onClick={() => {
                    dispatch(selectedBackground(item.color));
                    dispatch(updateAudioStyles());
                  }}
                >
                  <Grid className="color-pallete">
                    <Grid className="color-pallet-box">
                      <Grid
                        style={{
                          backgroundColor: item.color,
                          width: "30px",
                          height: "30px",
                        }}
                        className="colors"
                      ></Grid>
                      <Typography variant="subtitle1" className="caption" style={{ marginLeft: "10px" }}>
                        {item.name}
                      </Typography>
                    </Grid>
                    {backgroundColor === item.color ? (
                      <ListItemSecondaryAction
                        className="selcted"
                      >
                        <Done />
                      </ListItemSecondaryAction>
                    ) : null}
                  </Grid>
                </ListItem>
              ))}
            </List>
              {
                !saveColor ?
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Add />}
                  className="secondary-btn w-100"
                  onClick={() => wantSaveBackgroundColor()}
                >
                  Save this background
                </Button>
                :
                null
            }
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({ ...openAlert, open: false })}>
              <Alert onClose={() => setOpenAlert({ ...openAlert, open: false })} severity={openAlert.status}>
                {openAlert.text}
              </Alert>
            </Snackbar>
        </div>
      </div>
    </React.Fragment>
  );
}
