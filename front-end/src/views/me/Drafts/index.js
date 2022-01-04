import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import styles from "assets/jss/control-panel.js";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    content: {
        padding: theme.spacing(2)
    },
    card: {
        backgroundColor: "#fff",
        width: 280,
        margin: theme.spacing(1),
        display: "inline-block"
    },
    cardContent: {
        padding: theme.spacing(1)
    },
    media: {
        height: 140,
    },
    button: {
        margin: "0 2px"
    }
}))
const useStylesBase = makeStyles(styles);

export default function Drafts() {

    const classes = useStyles();
    const classesBase = useStylesBase();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://v4.mui.com/static/images/cards/paella.jpg"
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body1" align="center" component="h2" className={classesBase.mv10}>
                            $30
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary" component="p">
                            24" x 30" Digital Download
                        </Typography>
                        <Typography variant="caption" align="center" color="textSecondary" component="p" style={{ fontStyle: "italic" }}>
                            Updated: 3 months ago
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.button} size="small" color="primary" variant="outlined">
                            Edit
                        </Button>
                        <Button className={classes.button} size="small" color="secondary" variant="outlined">
                            Delete
                        </Button>
                        <Button className={classes.button} size="small" color="primary" variant="contained">
                            Add to Cart
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://v4.mui.com/static/images/cards/paella.jpg"
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body1" align="center" component="h2" className={classesBase.mv10}>
                            $30
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary" component="p">
                            24" x 30" Digital Download
                        </Typography>
                        <Typography variant="caption" align="center" color="textSecondary" component="p" style={{ fontStyle: "italic" }}>
                            Updated: 3 months ago
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.button} size="small" color="primary" variant="outlined">
                            Edit
                        </Button>
                        <Button className={classes.button} size="small" color="secondary" variant="outlined">
                            Delete
                        </Button>
                        <Button className={classes.button} size="small" color="primary" variant="contained">
                            Add to Cart
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://v4.mui.com/static/images/cards/paella.jpg"
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body1" align="center" component="h2" className={classesBase.mv10}>
                            $30
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary" component="p">
                            24" x 30" Digital Download
                        </Typography>
                        <Typography variant="caption" align="center" color="textSecondary" component="p" style={{ fontStyle: "italic" }}>
                            Updated: 3 months ago
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.button} size="small" color="primary" variant="outlined">
                            Edit
                        </Button>
                        <Button className={classes.button} size="small" color="secondary" variant="outlined">
                            Delete
                        </Button>
                        <Button className={classes.button} size="small" color="primary" variant="contained">
                            Add to Cart
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://v4.mui.com/static/images/cards/paella.jpg"
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body1" align="center" component="h2" className={classesBase.mv10}>
                            $30
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary" component="p">
                            24" x 30" Digital Download
                        </Typography>
                        <Typography variant="caption" align="center" color="textSecondary" component="p" style={{ fontStyle: "italic" }}>
                            Updated: 3 months ago
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.button} size="small" color="primary" variant="outlined">
                            Edit
                        </Button>
                        <Button className={classes.button} size="small" color="secondary" variant="outlined">
                            Delete
                        </Button>
                        <Button className={classes.button} size="small" color="primary" variant="contained">
                            Add to Cart
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://v4.mui.com/static/images/cards/paella.jpg"
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body1" align="center" component="h2" className={classesBase.mv10}>
                            $30
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary" component="p">
                            24" x 30" Digital Download
                        </Typography>
                        <Typography variant="caption" align="center" color="textSecondary" component="p" style={{ fontStyle: "italic" }}>
                            Updated: 3 months ago
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.button} size="small" color="primary" variant="outlined">
                            Edit
                        </Button>
                        <Button className={classes.button} size="small" color="secondary" variant="outlined">
                            Delete
                        </Button>
                        <Button className={classes.button} size="small" color="primary" variant="contained">
                            Add to Cart
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://v4.mui.com/static/images/cards/paella.jpg"
                            title="Contemplative Reptile"
                        />
                    </CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body1" align="center" component="h2" className={classesBase.mv10}>
                            $30
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary" component="p">
                            24" x 30" Digital Download
                        </Typography>
                        <Typography variant="caption" align="center" color="textSecondary" component="p" style={{ fontStyle: "italic" }}>
                            Updated: 3 months ago
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.button} size="small" color="primary" variant="outlined">
                            Edit
                        </Button>
                        <Button className={classes.button} size="small" color="secondary" variant="outlined">
                            Delete
                        </Button>
                        <Button className={classes.button} size="small" color="primary" variant="contained">
                            Add to Cart
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}
