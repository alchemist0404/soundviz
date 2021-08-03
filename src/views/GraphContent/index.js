import React, { useEffect, useState } from "react";
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/graph-content.js";

const useStyles = makeStyles(styles);
export default function GraphContent(props) {
	const classes = useStyles();
	const [frequencyData, setFrequencyData] = useState([]);

	useEffect(() => {
		fetch('Dream English Traditional ABC01.mp3')
			.then(response => response.arrayBuffer())
			.then(buffer => {
				const data = new Uint8Array(buffer);
				setFrequencyData(data);
			})
	}, [])

	useEffect(() => {
		console.log(`frequencyData`, frequencyData)
	}, [frequencyData])

	return (
		<div className={classes.graphContent}>
		</div>
	);
}