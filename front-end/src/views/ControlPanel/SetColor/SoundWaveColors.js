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
  IconButton,
  Typography,
} from "@material-ui/core";
import { Add, Done, Delete } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { Axios } from "redux/services";
import MakeColorModal from "./MakeColorModal";
import { selectedColor, colorList } from "redux/actions/color";
import { Root } from "config";
import { updateAudioStyles } from "redux/actions/style";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './set-color.scss';
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
    text: ""
  });
  const [deletingPallateId, setDeletePallateId] = useState("");

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

  // deletingPallateId = '';
  const deletePalatte = async(id, e)=>{
    e.stopPropagation();
    var force = false;
    if(deletingPallateId == id){
      force = true;
    }else{
      force = false;
    }
    const response = await Axios({ url: 'api/style/deleteColor', data: { user_id: userData._id, _id: id, force: force } })
    if (response.status) {
        setDeletePallateId('');
        setOpenAlert({ ...openAlert, open: true, status: "success", text: "A color palatte file has been deleted successfully!" })
        dispatch(colorList(response.data))
    }else {
      if(response.confirm){
        setOpenAlert({ ...openAlert, open: true, status: "warning", text: response.data });
        setDeletePallateId(id);
      }else {
        setDeletePallateId('');
      }
    }
  }

  useEffect(() => {
    setAllColors(colorsList.concat(Root.defaultColors));
  }, [colorsList]);

  return (
    <React.Fragment>
      <div className="color-container">
        <div className="color-box">
          <div className="title p-0">
            <h4 className="title-heading">Choose Color</h4>
            <p className="title-description">Select your Colors from given Pattern.</p>
          </div>
        <List className="color-list">
          {allColors.map((item, i) => (
            <ListItem
              key={i}
              button
              className={classes.audioListItem}
              onClick={() => setSelectedColor(item)}
            >
              <Grid className="color-pallete">
                <Grid className="color-pallet-box">
                  <Typography variant="caption" className="caption">
                    {item.name}
                  </Typography>
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
                      className="colors"
                    ></Grid>
                  ))}
                </Grid>
                  {graphColor && graphColor._id === item._id ? ( <Done className="selcted" /> ) : null} 
                  {item.user_id ? (<IconButton edge="end" aria-label="delete palatte" onClick={(event) => deletePalatte(item._id, event)} className="selcted">
                      <Delete />
                  </IconButton>): null}

              </Grid>
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          className="secondary-btn w-100"
          onClick={() => handleOpenModal(true)}
        >
          Choose your own custom color!
        </Button>
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
          autoHideDuration={7500}
          onClose={() => setOpenAlert({ ...openAlert, open: false })}
        >
          <Alert
            onClose={() => setOpenAlert({ ...openAlert, open: false })}
            severity={openAlert.status}
          >
            {openAlert.text}
          </Alert>
        </Snackbar>
        </div>
      </div>
    </React.Fragment>
  );
}