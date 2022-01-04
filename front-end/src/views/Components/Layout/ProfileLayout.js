import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    makeStyles,
    useTheme,
    Button
} from '@material-ui/core';
import { GraphicEq, Menu } from '@material-ui/icons';
import classNames from 'classnames';
import { Root } from 'config';
import { Link } from 'react-router-dom';
import { handleLogout } from "redux/actions/auth";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: "84px 20px 20px 20px",
    },
    logo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    link: {
        color: "rgba(0, 0, 0, 0.87)"
    },
    activeLink: {
        backgroundColor: "rgba(0, 0, 0, 0.08)"
    },
    createButton: {
        backgroundColor: "#ff5722",
        color: "white",
        '&:hover': {
            backgroundColor: "#ff8a65",
        }
    },
    header: {
        justifyContent: "space-between"
    }
}));

function ProfileLayout(props) {
    const { window, children } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const userLogout = () => {
        dispatch(handleLogout)
        location.href = "/"
    }

    useEffect(() => {
        if (props.location.pathname === "/logout") {
            userLogout();
        }
    }, [props])

    const drawer = (
        <div>
            <div className={classNames(classes.toolbar, classes.logo)}>Logo</div>
            <Divider />
            <List>
                {Root.profileRoutes.map((item, index) => (
                    <Link to={item.path} key={index} onClick={() => setMobileOpen(false)}>
                        <ListItem button className={classNames(classes.link, props.location.pathname === item.path ? classes.activeLink : null)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.header}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Audio Visualization
                    </Typography>
                    <Button
                        variant="contained"
                        className={classes.createButton}
                        startIcon={<GraphicEq />}
                        onClick={() => history.push("/")}
                    >
                        Create
                    </Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {children}
            </main>
        </div>
    );
}

ProfileLayout.propTypes = {
    window: PropTypes.func,
};

export default ProfileLayout;