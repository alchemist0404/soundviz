import React, { useEffect, useRef, useState } from "react";
import * as d3 from 'd3'
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/graph-content.js";
import { useDispatch, useSelector } from "react-redux";
import Gradient from "javascript-color-gradient";
import { Root } from "config";
import { setText } from "redux/actions/text";
import { updateAudioStyles } from "redux/actions/style";

const useStyles = makeStyles(styles);
export default function GraphContent() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const audio_data = useSelector(state => state.audio.selectedAudio)
	const { graph_type, bar_width, bar_space, circle_radius, circle_rotate, bar_shape } = useSelector(state => state.style)
	const { backgroundColor, graphColor } = useSelector(state => state.color)
	const { displayText, textFont, textColor, fontSize, textJustification, textVerticalAlign, textInputSize, textInputPosition, fontWeight, lineHeight, letterSpacing, textAlignment } = useSelector(state => state.text)
	const { print_type, print_size } = useSelector(state => state.print_size)
	const contentSize = Root.printSizes[print_type].filter(item => item.id == print_size)[0].size;

	useEffect(() => {
		if (!audio_data) return;
		// consts
		const canvasWidth = contentSize[0]
		const canvasHeight = contentSize[1]
		const paddingVirtical = contentSize[1] * 0.05
		const paddingHorizontal = contentSize[0] * 0.1
		const contentHeight = canvasHeight / 2 - paddingVirtical // as max, half of canvas height: ;
		const numth = (canvasWidth - paddingHorizontal) / (graph_type === "bar" ? (bar_width + bar_space) : bar_width) //graph_type === "bar" ? bar_width : bar_width / 2 - 7 // able to control the bar width    min 74 max 2000      radial min 30
		const barRadius = bar_shape
		const innerRadius = circle_radius
		const textSize = fontSize * 4.2
		const outerRadius = Math.min(canvasWidth, canvasHeight) / 2 - textSize - paddingVirtical / 2;

		//---------------------------- data modify ----------------------------
		var cus_frequencies = [];

		const peaks = audio_data.data.data.filter(point => point >= 0);
		const ratio = Math.max(...peaks) / contentHeight
		const frequency_data = peaks.map(point => Math.round(point / ratio))

		if (frequency_data.length > 100) {
			var n = Math.floor(frequency_data.length / numth);
			if (n === 0) n = 1;
			var n2 = n
			var c = 0;
			while (c < frequency_data.length) {
				var sl = frequency_data.slice(c, n)
				var average = (sl.reduce((a, b) => a + b, 0) / sl.length).toFixed()
				cus_frequencies.push(average)
				c = n
				n = n + n2
			}
		} else {
			cus_frequencies = frequency_data
		}


		// var overWidthIndex = cus_frequencies.length;

		// for (let i = 0; i < cus_frequencies.length; i++) {
		// 	if (i * (bar_width + bar_space) + paddingHorizontal / 2 > canvasWidth) {
		// 		overWidthIndex = i;
		// 		break;
		// 	}
		// }

		// cus_frequencies.splice(overWidthIndex, cus_frequencies.length - overWidthIndex)

		//---------------------------- data modify ----------------------------

		const graph_content = document.getElementById("graph_content")
		if (graph_content.children.length > 0) {
			graph_content.removeChild(graph_content.lastElementChild)
		}

		const svgCanvas = d3.select("#graph_content")
			.append('svg')
			.attr('xmlns', 'http://www.w3.org/2000/svg')
			.attr('xmlns:xhtml', 'http://www.w3.org/1999/xhtml')
			.attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)
		// .attr('style', `background-color: ${backgroundColor}`)

		// const barWidth = svgCanvas.node().scrollWidth / cus_frequencies.length
		var m = contentHeight / Math.max(...cus_frequencies);
		m = m < 1 ? 1 : m

		// making gradient color
		const colorGradient = new Gradient();
		var gardientedColors = [];

		switch (graphColor.color.length) {
			case 2:
				colorGradient.setGradient(graphColor.color[0].color, graphColor.color[1].color);
				colorGradient.setMidpoint(3);
				break;
			case 3:
				colorGradient.setGradient(graphColor.color[0].color, graphColor.color[1].color, graphColor.color[2].color);
				colorGradient.setMidpoint(5);
				break;
			case 4:
				colorGradient.setGradient(graphColor.color[0].color, graphColor.color[1].color, graphColor.color[2].color, graphColor.color[3].color);
				colorGradient.setMidpoint(7);
				break;
			case 5:
				colorGradient.setGradient(graphColor.color[0].color, graphColor.color[1].color, graphColor.color[2].color, graphColor.color[3].color, graphColor.color[4].color);
				colorGradient.setMidpoint(9);
				break;
			default:
				break;
		}

		if (colorGradient.getArray().length > 0) {
			gardientedColors = colorGradient.getArray();
		} else {
			gardientedColors = [graphColor.color[0].color];
		}

		var divide_frequency = Math.max(...cus_frequencies) / gardientedColors.length;
		var divide_frequencies = [];
		for (let i = 0; i < gardientedColors.length; i++) {
			divide_frequencies.push(divide_frequency * (i + 1))
		}

		if (graph_type === "bar") {
			/////////                   linear graph
			svgCanvas.append('rect')
				.attr("width", canvasWidth)
				.attr("height", canvasHeight)
				.attr("fill", backgroundColor)

			svgCanvas.selectAll('rect')
				.data(cus_frequencies).enter()
				.append('rect')
				.attr('width', bar_width)
				.attr('height', (datapoint) => datapoint * m * 2)
				.attr('fill', (datapoint) => {
					if (datapoint <= divide_frequencies[0]) {
						return gardientedColors[0]
					}
					for (let i = 0; i < divide_frequencies.length - 1; i++) {
						if (divide_frequencies[i] < datapoint && datapoint <= divide_frequencies[i + 1]) {
							return gardientedColors[i + 1]
						}
					}
				})
				.attr('rx', barRadius)
				.attr('ry', barRadius)
				.attr('x', (datapoint, iteration) => {
					var x = iteration * (bar_width + bar_space) + paddingHorizontal / 2
					if ((x + ((bar_width + bar_space) + paddingHorizontal / 2)) < canvasWidth) {
						return x
					} else {
						return -200
					}
				})
				.attr('y', (datapoint) => (canvasHeight / 2) - datapoint * m)
		} else {
			/////////                    radial graph

			// X scale
			const x = d3.scaleBand()
				.range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
				.align(0)                  // This does nothing ?
				.padding(bar_space / 600)
				.domain(cus_frequencies.map(d => d)); // The domain of the X axis is the list of states.

			// Y scale
			const y = d3.scaleRadial()
				.range([innerRadius, outerRadius])   // Domain will be define later.
				.domain([0, Math.max(...cus_frequencies)]); // Domain of Y is from 0 to the max seen in the data

			svgCanvas.append('rect')
				.attr("width", canvasWidth)
				.attr("height", canvasHeight)
				.attr("fill", backgroundColor)

			svgCanvas.append("g")
				.attr('transform', `translate(${canvasWidth / 2} ${canvasHeight / 2}) rotate(${circle_rotate})`)
				.selectAll("path")
				.data(cus_frequencies)
				.join("path")
				.attr('fill', (d) => {
					if (d <= divide_frequencies[0]) {
						return gardientedColors[0]
					}
					for (let i = 0; i < divide_frequencies.length - 1; i++) {
						if (divide_frequencies[i] < d && d <= divide_frequencies[i + 1]) {
							return gardientedColors[i + 1]
						}
					}
				})
				.attr("d", d3.arc()     // imagine your doing a part of a donut plot
					.innerRadius(innerRadius)
					.outerRadius(d => y(d))
					.startAngle(d => x(d))
					.endAngle(d => x(d) + x.bandwidth())
					// .padAngle(bar_space)
				)
		}

		// adding text
		if (displayText.length > 0) {
			svgCanvas.append("foreignObject")
				.attr("x", canvasWidth / 2 - 125)
				.attr("y", 30)
				.attr("width", 250)
				.attr("height", 30)
				.attr("id", "audio_text_content")
				.append("xhtml:textarea")
				.attr("class", "audio-text-input")
				.attr("placeholder", "Enter you Text and you can change by handeling the bazels")

			const audioContext = document.getElementById("audio_text_content");

			//// resizers
			const tlResizer = document.createElement("div")
			tlResizer.setAttribute("class", "resizer top-left")
			audioContext.append(tlResizer);

			const trResizer = document.createElement("div")
			trResizer.setAttribute("class", "resizer top-right")
			audioContext.append(trResizer);

			const brResizer = document.createElement("div")
			brResizer.setAttribute("class", "resizer bottom-right")
			audioContext.append(brResizer);

			const blResizer = document.createElement("div")
			blResizer.setAttribute("class", "resizer bottom-left")
			audioContext.append(blResizer);

			//// draggers
			const topDragger = document.createElement("div")
			topDragger.setAttribute("class", "dragger top")
			audioContext.append(topDragger);

			const rightDragger = document.createElement("div")
			rightDragger.setAttribute("class", "dragger right")
			audioContext.append(rightDragger);

			const bottomDragger = document.createElement("div")
			bottomDragger.setAttribute("class", "dragger bottom")
			audioContext.append(bottomDragger);

			const leftDragger = document.createElement("div")
			leftDragger.setAttribute("class", "dragger left")
			audioContext.append(leftDragger);

			const resizers = document.querySelectorAll('#audio_text_content .resizer');
			const draggers = document.querySelectorAll('#audio_text_content .dragger');

			const minimum_size = 20;
			let original_width = 0;
			let original_height = 0;
			let original_x = 0;
			let original_y = 0;
			let original_mouse_x = 0;
			let original_mouse_y = 0;

			for (let i = 0; i < resizers.length; i++) {
				const currentResizer = resizers[i];
				currentResizer.addEventListener('mousedown', function (e) {
					e.preventDefault()
					original_width = parseFloat(getComputedStyle(audioContext, null).getPropertyValue('width').replace('px', ''));
					original_height = parseFloat(getComputedStyle(audioContext, null).getPropertyValue('height').replace('px', ''));
					original_x = Number(audioContext.getAttribute("x"));
					original_y = Number(audioContext.getAttribute("y"));
					const mousePosition = getMousePosition(e);
					original_mouse_x = mousePosition.x;
					original_mouse_y = mousePosition.y;
					window.addEventListener('mousemove', resize)
					window.addEventListener('mouseup', stopResize)
				})

				function resize(e) {
					if (currentResizer.classList.contains('bottom-right')) {
						const mousePosition = getMousePosition(e);
						const width = original_width + (mousePosition.x - original_mouse_x);
						const height = original_height + (mousePosition.y - original_mouse_y)
						if (width > minimum_size && mousePosition.x <= canvasWidth) {
							audioContext.setAttribute("width", width);
						}
						if (height > minimum_size && mousePosition.y <= canvasHeight) {
							audioContext.setAttribute("height", height);
						}
					}
					else if (currentResizer.classList.contains('bottom-left')) {
						const mousePosition = getMousePosition(e);
						const height = original_height + (mousePosition.y - original_mouse_y)
						const width = original_width - (mousePosition.x - original_mouse_x)
						if (height > minimum_size && mousePosition.y <= canvasHeight) {
							audioContext.setAttribute("height", height);
						}
						if (width > minimum_size && mousePosition.x >= 0) {
							audioContext.setAttribute("width", width);
							audioContext.setAttribute("x", original_x + (mousePosition.x - original_mouse_x));
						}
					}
					else if (currentResizer.classList.contains('top-right')) {
						const mousePosition = getMousePosition(e);
						const width = original_width + (mousePosition.x - original_mouse_x)
						const height = original_height - (mousePosition.y - original_mouse_y)
						if (width > minimum_size && mousePosition.x <= canvasWidth) {
							audioContext.setAttribute("width", width);
						}
						if (height > minimum_size && mousePosition.y >= 0) {
							audioContext.setAttribute("height", height);
							audioContext.setAttribute("y", original_y + (mousePosition.y - original_mouse_y));
						}
					}
					else {
						const mousePosition = getMousePosition(e);
						const width = original_width - (mousePosition.x - original_mouse_x)
						const height = original_height - (mousePosition.y - original_mouse_y)
						if (width > minimum_size && mousePosition.x >= 0) {
							audioContext.setAttribute("width", width);
							audioContext.setAttribute("x", original_x + (mousePosition.x - original_mouse_x));
						}
						if (height > minimum_size && mousePosition.y >= 0) {
							audioContext.setAttribute("height", height);
							audioContext.setAttribute("y", original_y + (mousePosition.y - original_mouse_y));
						}
					}

				}

				function stopResize() {
					window.removeEventListener('mousemove', resize)
				}
			}

			let original_content_x = 0;
			let original_content_y = 0;
			let original_drag_x = 0;
			let original_drag_y = 0;

			for (let i = 0; i < draggers.length; i++) {
				const currentDragger = draggers[i];
				currentDragger.addEventListener("mousedown", (e) => {
					original_content_x = Number(audioContext.getAttribute("x"));
					original_content_y = Number(audioContext.getAttribute("y"));
					const mousePosition = getMousePosition(e);
					original_drag_x = mousePosition.x;
					original_drag_y = mousePosition.y;

					window.addEventListener('mousemove', onDrag)
					window.addEventListener('mouseup', stopDrag)
				});

				function onDrag(e) {
					const mousePosition = getMousePosition(e);
					const movedX = mousePosition.x - original_drag_x;
					const movedY = mousePosition.y - original_drag_y;
					const audioContextWidth = Number(audioContext.getAttribute("width"));
					const audioContextHeight = Number(audioContext.getAttribute("height"));

					audioContext.setAttribute("x", original_content_x + movedX);
					audioContext.setAttribute("y", original_content_y + movedY);

					if (currentDragger.classList.contains('right')) {
						if (mousePosition.x - audioContextWidth <= 0) {
							audioContext.setAttribute("x", 0);
						}
						if (Number(audioContext.getAttribute("y")) + audioContextHeight > canvasHeight) {
							audioContext.setAttribute("y", canvasHeight - audioContextHeight);
						} else if (Number(audioContext.getAttribute("y")) <= 0) {
							audioContext.setAttribute("y", 0);
						}
					}
					if (currentDragger.classList.contains('left')) {
						if (mousePosition.x + audioContextWidth >= canvasWidth) {
							audioContext.setAttribute("x", canvasWidth - audioContextWidth);
						}
						if (Number(audioContext.getAttribute("y")) + audioContextHeight > canvasHeight) {
							audioContext.setAttribute("y", canvasHeight - audioContextHeight);
						} else if (Number(audioContext.getAttribute("y")) <= 0) {
							audioContext.setAttribute("y", 0);
						}
					}
					if (currentDragger.classList.contains('top')) {
						if (mousePosition.y + audioContextHeight >= canvasHeight) {
							audioContext.setAttribute("y", canvasHeight - audioContextHeight);
						}
						if (Number(audioContext.getAttribute("x")) + audioContextWidth > canvasWidth) {
							audioContext.setAttribute("x", canvasWidth - audioContextWidth);
						} else if (Number(audioContext.getAttribute("x")) <= 0) {
							audioContext.setAttribute("x", 0);
						}
					}
					if (currentDragger.classList.contains('bottom')) {
						if (mousePosition.y - audioContextHeight <= 0) {
							audioContext.setAttribute("y", 0);
						}
						if (Number(audioContext.getAttribute("x")) + audioContextWidth > canvasWidth) {
							audioContext.setAttribute("x", canvasWidth - audioContextWidth);
						} else if (Number(audioContext.getAttribute("x")) <= 0) {
							audioContext.setAttribute("x", 0);
						}
					}
					if (mousePosition.x > canvasWidth) {
						audioContext.setAttribute("x", canvasWidth - audioContextWidth);
					} else if (mousePosition.x <= 0) {
						audioContext.setAttribute("x", 0);
					} else if (mousePosition.y > canvasHeight) {
						audioContext.setAttribute("y", canvasHeight - audioContextHeight);
					} else if (mousePosition.y <= 0) {
						audioContext.setAttribute("y", 0);
					}
				}

				function stopDrag() {
					window.removeEventListener('mousemove', onDrag)
				}
			}

			const audioText = document.querySelector("#audio_text_content .audio-text-input");
			audioText.value = displayText;
			audioText.setAttribute("style", `font-family: ${textFont}; color: ${textColor}; font-size: ${textSize}px;`);

			audioText.addEventListener("input", (e) => {
				dispatch(setText(e.target.value));
				dispatch(updateAudioStyles());
			})
		}
	}, [
		audio_data,
		graphColor,
		graph_type,
		bar_width,
		bar_space,
		circle_radius,
		circle_rotate,
		bar_shape,
		backgroundColor,
		displayText,
		textFont,
		textColor,
		fontSize,
		textJustification,
		textVerticalAlign,
		contentSize
	])

	const getMousePosition = (e) => {
		var CTM = document.querySelector("#graph_content svg").getScreenCTM();
		return {
			x: (e.clientX - CTM.e) / CTM.a,
			y: (e.clientY - CTM.f) / CTM.d
		};
	}

	return (
		<div className={classes.graphContent}>
			<div className={classes.audioGraph} id="graph_content"></div>
		</div>
	);
}