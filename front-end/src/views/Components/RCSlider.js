import React from "react";

import { Slider, withStyles } from '@material-ui/core'

const AirbnbSlider = withStyles({
    root: {
        color: '#3a8589',
        height: 10,
        padding: '7px 0',
        // width: '95%'
    },
    thumb: {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -8,
        marginLeft: -13,
        boxShadow: '#ebebeb 0 2px 2px',
        '&:focus, &:hover, &$active': {
            boxShadow: '#ccc 0 2px 3px 1px',
        },
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 10,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 10,
    },
})(Slider);

function AirbnbThumbComponent(props) {
    return (
        <span {...props}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
        </span>
    );
}

export default function RCSlider(props) {

    return (
        <AirbnbSlider
            ThumbComponent={AirbnbThumbComponent}
            value={props.value}
            min={props.min}
            step={props.step}
            max={props.max}
            onChange={props.onChange}
            valueLabelDisplay="off"
            {...props}
        />
    )
}