import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Add, Done } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { Axios } from "redux/services";
import MakeColorModal from "./MakeColorModal";
import { selectedColor, colorList } from "redux/actions/color";
import { Root } from "config";
import { updateAudioStyles } from "redux/actions/style";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SoundWaveColors(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { colorsList, graphColor } = useSelector((state) => state.color);
  const userData = JSON.parse(localStorage.getItem(Root.key));

  const [open, handleOpenModal] = useState(false);
  const [newColorName, setNewColorName] = useState("");
  const [nameCreated, setNameCreated] = useState(false);
  const [colors, setColors] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [isPublish, setIsPublish] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    status: "success",
    text: "",
  });

  const setSelectedColor = (e) => {
    dispatch(selectedColor(e));
    dispatch(updateAudioStyles());
  };

  const handleCloseModal = () => {
    setNewColorName("");
    setNameCreated(false);
    setColors([]);
    handleOpenModal(false);
  };

  const handleCreateColor = async () => {
    const response = await Axios({
      url: "api/style/addColor",
      data: {
        user_id: userData._id,
        name: newColorName,
        color: colors,
        publish: isPublish,
      },
    });
    if (response.status) {
      dispatch(colorList(response.data));
      handleCloseModal();
    } else {
      setOpenAlert({
        ...openAlert,
        open: true,
        status: "error",
        text: response.data,
      });
    }
  };

  useEffect(() => {
    setAllColors(colorsList.concat(Root.defaultColors));
  }, [colorsList]);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Add />}
        className={classNames(classes.w100, classes.mt10)}
        onClick={() => handleOpenModal(true)}
      >
        MAKE A COLOR PALETTE
      </Button>
      <List>
        {allColors.map((item, i) => (
          <ListItem
            key={i}
            button
            className={classes.audioListItem}
            onClick={() => setSelectedColor(item)}
          >
            <Grid container className={classes.fColumn}>
              <Typography variant="caption" style={{ marginLeft: "2px" }}>
                {item.name}
              </Typography>
              <Grid container>
                {item.color.map((item, i) => (
                  <Grid
                    item
                    key={i}
                    style={{
                      backgroundColor: item.color,
                      width: "30px",
                      height: "30px",
                      borderRadius: "3px",
                      margin: "0 2px",
                    }}
                  ></Grid>
                ))}
              </Grid>
            </Grid>
            {graphColor && graphColor._id === item._id ? (
              <ListItemSecondaryAction
                className={classNames(classes.dFlex, classes.aCenter)}
              >
                <Done />
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        ))}
      </List>
      <MakeColorModal
        open={open}
        handleCloseModal={handleCloseModal}
        newColorName={newColorName}
        setNewColorName={setNewColorName}
        nameCreated={nameCreated}
        setNameCreated={setNameCreated}
        colors={colors}
        setColors={setColors}
        handleCreateColor={handleCreateColor}
        isPublish={isPublish}
        setIsPublish={setIsPublish}
      />
      <Snackbar
        open={openAlert.open}
        autoHideDuration={5000}
        onClose={() => setOpenAlert({ ...openAlert, open: false })}
      >
        <Alert
          onClose={() => setOpenAlert({ ...openAlert, open: false })}
          severity={openAlert.status}
        >
          {openAlert.text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
