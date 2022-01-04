import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import styles from "assets/jss/control-panel.js";
import { Root } from 'config';
import { Axios } from 'redux/services';
import CartsDataGrid from 'views/Components/CartsDataGrid';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        background: "#fff",
        borderRadius: "5px"
    },
    content: {
        padding: theme.spacing(2)
    }
}))
const useStylesBase = makeStyles(styles);

export default function Carts() {

    const classes = useStyles();
    const classesBase = useStylesBase();
    const userData = JSON.parse(localStorage.getItem(Root.key));
    const [carts, setCarts] = useState([]);

    const loadCarts = async () => {
        const response_ = await Axios({ url: 'api/print/loadCartsByUserId', data: { user_id: userData._id } })
        if (response_.status) {
            response_.data.map((item, i) => item.id = i);
            setCarts(response_.data)
        }
    }

    useEffect(() => {
        loadCarts()
    }, [])
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <CartsDataGrid data={carts} />
            </div>
        </div>
    )
}
