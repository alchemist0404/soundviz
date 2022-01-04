import { Root } from "config";
import { Axios } from "redux/services";

var actionTimer = null;

export const handleGraphType = (data) => {
	return (dispatch) => {
		dispatch({ type: "GRAPH_TYPE", data });
	};
};

export const handleBarWidth = (data) => {
	return (dispatch) => {
		dispatch({ type: "BAR_WIDTH", data });
	};
};

export const handleBarMaxWidth = (data) => {
	return (dispatch) => {
		dispatch({ type: "BAR_MAX_WIDTH", data });
	};
};

export const handleBarSpace = (data) => {
	return (dispatch) => {
		dispatch({ type: "BAR_SPACE", data });
	};
};

export const handleRadius = (data) => {
	return (dispatch) => {
		dispatch({ type: "CIRCLE_RADIUS", data });
	};
};

export const handleRotate = (data) => {
	return (dispatch) => {
		dispatch({ type: "CIRCLE_ROTATE", data });
	};
};

export const handleBarShape = (data) => {
	return (dispatch) => {
		dispatch({ type: "BAR_SHAPE", data });
	};
};

export const updateAudioStyles = () => {
	return (dispatch, getState) => {
		const userData = JSON.parse(localStorage.getItem(Root.key))
		const audio_data = getState().audio.selectedAudio;
		const graph_style = getState().style;
		const text_style = getState().text;
		const { backgroundColor, graphColor } = getState().color;
		const color_style = {
			color: graphColor._id,
			backgroundColor,
		};

		if (userData) {
			if (actionTimer !== null) {
				clearTimeout(actionTimer)
			}
			actionTimer = setTimeout(async () => {
				const response = await Axios({
					url: "api/audio/updateAudioStyles",
					data: {
						user_id: userData._id,
						audio_id: audio_data.id,
						update_data: {
							color: color_style,
							style: graph_style,
							text: text_style,
						},
					},
				});

				if (!response.status) {
					console.log(`Server Error`, response.data);
				}
			}, 500)
		}
	};
};
