import React from 'react'
import classNames from 'classnames';
import { Backdrop, Fade, LinearProgress, makeStyles, Modal, Typography, withStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: "100px"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: "40%",
        padding: "70px"
    },
    description: {
        paddingTop: "20px"
    }
}));

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 25,
        borderRadius: 2,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 2,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

export default function UploadingProgressModal({ open, value }) {

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classNames(classes.modal)}
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <BorderLinearProgress variant="determinate" value={value}  />
                    <Typography variant="h4" className={classes.description} align="center">Uploading</Typography>
                    <Typography variant="body1" align="center">Once we're done uploading your file, we'll start graph.</Typography>
                </div>
            </Fade>
        </Modal>
    )
}
