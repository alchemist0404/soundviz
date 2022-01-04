import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, MenuItem, Select, Typography } from "@material-ui/core";
import { setPrintType, setPrintSize } from "redux/actions/print_size";
import { Root } from "config";

const useStylesBase = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
    description: {
        fontSize: "13px"
    },
    printOptionSelect: {
        width: "100%"
    }
}))

export default function Print(props) {
    const classesBase = useStylesBase();
    const classes = useStyles();
    const dispatch = useDispatch();
    const printOption = useSelector(state => state.print_size.print_type)

    const handleChange = e => {
        dispatch(setPrintType(e.target.value))
        dispatch(setPrintSize(Root.printSizes[e.target.value][1].id))
    }

    return (
        <div className={classesBase.p10}>
            <Grid className={classesBase.title}>
                <Typography variant="h5">DOWNLOAD OR PRINT</Typography>
                <Typography variant="body2" className={classesBase.uploadDescription}>
                    Download your artwork, or we can print it for you.
                </Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    value={printOption}
                    onChange={handleChange}
                    className={classNames(classes.printOptionSelect, classesBase.mv10)}
                >
                    <MenuItem value={'digital'}>Digital Download</MenuItem>
                    <MenuItem value={'art'}>Fine Art Print</MenuItem>
                    {/* <MenuItem value={'canvas'}>Stretched Canvas</MenuItem> */}
                </Select>
                <Typography className={classes.description}>
                    A vector PDF file that is delivered instantly and can scale to any size without losing resolution.
                </Typography>
            </Grid>
        </div>
    );
}