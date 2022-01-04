import React from "react";

import { ColorPicker } from 'material-ui-color';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    }
}));

export default function ColorPickerInput(props) {

    const classes = useStyles();

    return (
        <div {...props} id="color_picker_input">
            <ColorPicker defaultValue={props.defaultValue || "#000000"} disableAlpha={props.disableAlpha || false} value={props.value} onChange={props.onChange} />
        </div>
    )
}