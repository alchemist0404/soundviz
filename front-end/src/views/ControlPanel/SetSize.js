import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { ListSubheader, MenuItem, Select, Typography } from "@material-ui/core";
import { Axios } from '../../redux/services';
import { Root } from "config";
import { setPrintSize } from "redux/actions/print_size";
import { setFontSize } from "redux/actions/text";
import { updateAudioStyles, handleRadius } from "redux/actions/style";

const useStylesBase = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
    printOptionSelect: {
        width: "100%"
    }
}));

export default function SetSize(props) {
    const classesBase = useStylesBase();
    const classes = useStyles();
    const dispatch = useDispatch();

    const printOption = useSelector(state => state.print_size.print_type)
    const printSize = useSelector(state => state.print_size.print_size)
    
    const handleChange = e => {
        if (e.target.value) {
            var size = e.target.value.slice(4, 6);

            dispatch(setPrintSize(e.target.value))
            dispatch(setFontSize(Root.fontSizes[5]));
            dispatch(handleRadius(size === "A1" ? 350 : size === "A2" ? 300 : size === "A3" ? 200 : 150));
            dispatch(updateAudioStyles());
        }
    }

    return (
        <div className={classesBase.p10}>
            <Typography variant="h5">SIZES</Typography>
            <Typography variant="body2" className={classesBase.uploadDescription}>
                Select a size for your Digital Download:
            </Typography>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                variant="outlined"
                value={printSize}
                onChange={handleChange}
                className={classNames(classes.printOptionSelect, classesBase.mv10)}
            >
                {
                    Root.printSizes[printOption].map((row, i) => (
                        row.item ?
                            <MenuItem value={row.id} key={i}>{row.name}</MenuItem>
                            : <ListSubheader key={i}>{row.name}</ListSubheader>
                    ))
                }
            </Select>
        </div>
    );
}