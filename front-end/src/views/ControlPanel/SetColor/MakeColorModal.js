import React, { Fragment, useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Avatar, Backdrop, Button, Checkbox, Fade, FormControlLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Modal, Snackbar, TextField, Typography } from "@material-ui/core";
import { Add, Close, PlayArrow } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import { ColorPicker } from 'material-ui-color';

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SetColor({
    open,
    handleCloseModal,
    newColorName,
    setNewColorName,
    nameCreated,
    setNameCreated,
    colors,
    setColors,
    isPublish,
    setIsPublish,
    handleCreateColor
}) {
    const classes = useStyles();
    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })


    const saveName = () => {
        if (!newColorName) {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: "Color Name is required!" })
            return
        }
        setNameCreated(true);
    }

    const changeColor = (e, id) => {
        var update_colors = [...colors]
        update_colors[id].color = e.css.backgroundColor
        setColors(update_colors);
    }

    const deleteColor = (id) => {
        var update_colors = [...colors]
        update_colors.splice(id, 1)
        for (let i = 0; i < update_colors.length; i++) update_colors[i].id = i

        setColors(update_colors)
    }

    const addColor = () => {
        setColors([...colors, {
            id: colors.length,
            color: "#252424"
        }])
    }

    return (
        <Fragment>
            <Modal
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                className={classNames(classes.modal, classes.makeColorModal)}
            >
                <Fade in={open} className={classNames(classes.bgWhite, classes.modalBody)}>
                    <div className={classes.paper}>
                        <IconButton color="primary" aria-label="close" className={classes.modalCloseBtn} onClick={() => handleCloseModal()} size="small">
                            <Close fontSize="inherit" />
                        </IconButton>
                        {
                            nameCreated ? <Fragment>
                                <Typography variant="h4" className={classNames(classes.mh50, classes.tCenter)}>{newColorName}</Typography>
                                <Typography variant="caption" className={classNames(classes.tCenter, classes.w100, classes.dBlock, classes.mv10)}>Choose 1 - 5 colors for your color palette</Typography>
                                <Grid className={classNames(classes.dFlex, classes.aCenter, classes.jCenter)}>
                                    {
                                        colors.map((item, i) => (
                                            <Grid key={i} className={classNames(classes.dFlex, classes.fColumn, classes.mh5)}>
                                                <ColorPicker value={item.color} hideTextfield onChange={(e) => changeColor(e, item.id)} />
                                                <Grid className={classNames(classes.dFlex, classes.jCenter)}>
                                                    <IconButton color="primary" aria-label="add color" onClick={() => deleteColor(item.id)} size="small">
                                                        <Close fontSize="inherit" />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        ))
                                    }
                                    {
                                        colors.length < 5 ?
                                            <IconButton color="primary" aria-label="add color" onClick={() => addColor()}>
                                                <Add />
                                            </IconButton>
                                            : null
                                    }
                                </Grid>
                                <Typography variant="caption" className={classNames(classes.tCenter, classes.w100, classes.dBlock, classes.mv10)} color="primary">{colors.length > 0 ? `Hover over a color and click the X to remove it.` : `Click the plus button to add a color.`}</Typography>
                                <Grid container justify="center">
                                    <FormControlLabel
                                        control={<Checkbox checked={isPublish} onChange={e => setIsPublish(e.target.checked)} name="publish" color="primary" />}
                                        label="Publish"
                                    />
                                </Grid>
                                {
                                    colors.length > 0 ?
                                        <Grid className={classNames(classes.dFlex, classes.jCenter)}>
                                            <Button variant="outlined" color="primary" onClick={() => handleCreateColor()}>
                                                Create
                                            </Button>
                                        </Grid>
                                        : null
                                }
                            </Fragment>
                                :
                                <Fragment>
                                    <Typography variant="h5" className={classes.mh50}>Create a color palette</Typography>
                                    <TextField id="outlined-basic" label="Name your color palette" value={newColorName} onChange={(e) => setNewColorName(e.target.value)} className={classNames(classes.mt10, classes.w100)} variant="outlined" />
                                    <Grid className={classNames(classes.dFlex, classes.jRight)}>
                                        <Button variant="outlined" color="primary" className={classes.mt10} onClick={() => saveName()}>
                                            Save Name
                                        </Button>
                                    </Grid>
                                </Fragment>
                        }
                    </div>
                </Fade>
            </Modal>
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({ ...openAlert, open: false })}>
                <Alert onClose={() => setOpenAlert({ ...openAlert, open: false })} severity={openAlert.status}>
                    {openAlert.text}
                </Alert>
            </Snackbar>
        </Fragment>
    );
}