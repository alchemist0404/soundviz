import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Button, Grid, Snackbar } from "@material-ui/core";
import { handleActiveTab } from "redux/actions/theme";
import { Root } from "config";
import { Axios } from "redux/services";
import { setFullPageLoading } from "redux/actions/theme";
import MuiAlert from '@material-ui/lab/Alert';
import './control.scss';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(styles);

export default function FooterNavigation({ activeTab, tabs, handleRegister }) {
    const classes = useStyles();
    const dispatch = useDispatch()

    const userData = JSON.parse(localStorage.getItem(Root.key))

    const { print_type, print_size } = useSelector(state => state.print_size)
    const textInfo = useSelector(state => state.text)
    const printOption = useSelector(state => state.print_size.print_type)
    const printSize = useSelector(state => state.print_size.print_size)

    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })

    const goNext = () => {
        const index = tabs.indexOf(activeTab) + 1 >= tabs.length ? tabs.length - 1 : tabs.indexOf(activeTab) + 1
        dispatch(handleActiveTab(tabs[index]));
    }

    const goBack = () => {
        const index = tabs.indexOf(activeTab) - 1 < 0 ? 0 : tabs.indexOf(activeTab) - 1
        dispatch(handleActiveTab(tabs[index]));
    }

    const addToCart = async () => {
        dispatch(setFullPageLoading());

        const graphContent = document.getElementById("graph_content").innerHTML;
        const audioText = document.querySelector("#audio_text");
        var svg = graphContent;
        var text_x = 0;
        var text_y = 0;

        if (audioText) {
            var start = graphContent.indexOf("<g><text");
            var remove_text = graphContent.substr(start, audioText.parentElement.outerHTML.length);
            svg = graphContent.replace(remove_text, "");
            
            const audioTextWidth = audioText.getBoundingClientRect().width
            const audioTextHeight = audioText.getBoundingClientRect().height
            text_x = audioText.getAttribute("x") - audioTextWidth / 2;
            text_y = audioText.getAttribute("y") - audioTextHeight / 2;
        }

        const { size: contentSize, name: sizeName, price } = Root.printSizes[print_type].filter(item => item.id == print_size)[0];
        const printType = print_type === "digital" ? "Digital Download" : "Fine Art Print";


        const pdfText = {
            ...textInfo,
            x: text_x,
            y: text_y
        }

        const response = await Axios({ url: 'api/print/addToCart', data: { user_id: userData._id, originalSvg: graphContent, svg: svg, contentSize, textInfo: pdfText, printOption, printSize, printType, sizeName, price } })
        if (response.status) {
            // const redirect = document.createElement("a");
            // redirect.href = `https://www.waveable.co.uk/checkout/?add-to-cart=${response.data.id}`;
            // redirect.target = "_blank";
            // redirect.click();
            location.href = `https://www.waveable.co.uk/checkout/?add-to-cart=${response.data.id}`;
        } else {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: response.data })
        }
        dispatch(setFullPageLoading());
    }

    return (
        <Grid container justify="space-between" className="footer-navigation">
            {
                userData ?
                    <React.Fragment>
                        <Button className="secondary-btn"  disableElevation onClick={() => goBack()}>Back</Button>
                        {
                            tabs.indexOf(activeTab) + 1 === tabs.length ? <Button className="primary-btn"  disableElevation onClick={() => addToCart()}>Add to cart</Button>
                                : <Button className="primary-btn"  disableElevation onClick={() => goNext()}>Next</Button>
                        }
                    </React.Fragment>
                    :
                    tabs.indexOf(activeTab) + 1 === tabs.length ? <Button className="primary-btn w-100" onClick={handleRegister}>CREATE A SOUND WAVE</Button> :
                        <React.Fragment>
                            <Button className="secondary-btn"  onClick={handleRegister}>Skip</Button>
                            {
                                activeTab === 7 ?
                                    <Button className="primary-btn"  disableElevation onClick={() => dispatch(handleActiveTab(1))}>Start Tutorial</Button>
                                    : <Button className="primary-btn"  disableElevation onClick={() => goNext()}>Next</Button>
                            }
                        </React.Fragment>
            }
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({ ...openAlert, open: false })}>
                <Alert onClose={() => setOpenAlert({ ...openAlert, open: false })} severity={openAlert.status}>
                    {openAlert.text}
                </Alert>
            </Snackbar>
        </Grid>
    );
}