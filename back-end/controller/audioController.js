const BSC = require('./basecontroller');
const AudioModel = require('../model/audio_model').audios
const { exec } = require('child_process');
const Buffer = require('buffer/').Buffer
const https = require('https');
const path = require('path');
const md5 = require('md5')
const fs = require('fs');
const qs = require('qs');
const axios = require("axios")
const { base64encode } = require('nodejs-base64');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const { MUSICURL, JSONURL, SPOTIFY_CLIENTID, SPOTIFY_CLIENTSECRET } = require('../db')

exports.uploadAudio = (req, res, next) => {
    const { user_id, color, style, text } = req.body;
    const { filename, originalname } = req.files[0];
    const json_file_name = md5(originalname) + '.json';

    exec(`audiowaveform -i ${path.join(MUSICURL, filename)} -o ${path.join(MUSICURL, json_file_name)}`, async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return res.json({
                status: false,
                data: BSC.TEXT_NOT_ABLE_TO_GET_DATA
            });
        }

        const json_data = JSON.parse(fs.readFileSync(path.join(MUSICURL, json_file_name)));

        var sdata = await BSC.data_save({ user_id: user_id, audio_name: filename, json_data, origin_name: originalname, color: JSON.parse(color), style: JSON.parse(style), text: JSON.parse(text) }, AudioModel)
        if (sdata) {
            this.getAudiosByUserId(req, res, next);
            fs.unlink(path.join(MUSICURL, json_file_name), (err) => {
                if (err) throw err;
            })
        } else {
            fs.unlink(path.join(MUSICURL, json_file_name), (err) => {
                if (err) throw err;
            })
            return res.json({
                status: false,
                data: BSC.TEXT_SERVER_ERROR
            })
        }
    });
}

exports.uploadRecording = async (req, res, next) => {
    const { user_id } = req.body;
    const { originalname } = req.files[0];
    const file_name = md5(String(new Date().valueOf())) + "." + req.files[0].mimetype.split("/")[1]
    const json_file_name = md5(String(new Date().valueOf())) + ".json"
    fs.writeFile(`${path.join(MUSICURL, file_name)}`, req.files[0].buffer, (err) => {
        if (err) {
            return res.json({
                status: false,
                data: BSC.TEXT_FAILED_CREATING_RECORD
            })
        } else {
            const me = this;
            const new_file_name = file_name.split(".")[0] + ".mp3"
            BSC.convert(path.join(MUSICURL, file_name), path.join(MUSICURL, new_file_name), function (err) {
                if (!err) {
                    exec(`audiowaveform -i ${path.join(MUSICURL, new_file_name)} -o ${path.join(MUSICURL, json_file_name)}`, async (err, stdout, stderr) => {
                        if (err) {
                            console.error(err);
                            return res.json({
                                status: false,
                                data: BSC.TEXT_NOT_ABLE_TO_GET_DATA
                            });
                        }

                        const color = {
                            "color": 0,
                            "backgroundColor": "#FFFFFF"
                        }
                        const style = {
                            "graph_type": "bar",
                            "bar_width": 1,
                            "bar_space": 0,
                            "circle_radius": 0,
                            "circle_rotate": 0,
                            "bar_shape": 0
                        }
                        const text = {
                            "displayText": "",
                            "textFont": "Alfa Slab One",
                            "textColor": "black",
                            "fontSize": 14,
                            "textJustification": 1,
                            "textVerticalAlign": 1
                        }

                        const json_data = JSON.parse(fs.readFileSync(path.join(MUSICURL, json_file_name)));

                        var sdata = await BSC.data_save({ user_id: user_id, audio_name: new_file_name, json_data, origin_name: originalname, color, style, text }, AudioModel)
                        if (sdata) {
                            me.getAudiosByUserId(req, res, next);
                            fs.unlink(path.join(MUSICURL, json_file_name), (err) => {
                                if (err) throw err;
                            })
                        } else {
                            fs.unlink(path.join(MUSICURL, json_file_name), (err) => {
                                if (err) throw err;
                            })
                            return res.json({
                                status: false,
                                data: BSC.TEXT_SERVER_ERROR
                            })
                        }
                    });
                    fs.unlink(path.join(MUSICURL, file_name), (err) => {
                        if (err) throw err;
                    })
                }
            });
        }
    })
}

exports.getAudiosByUserId = async (req, res) => {
    const { user_id } = req.body;
    var data = await BSC.Bfind(AudioModel, { user_id });
    if (data) {
        return res.json({
            status: true,
            data
        })
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.getJson = async (req, res) => {
    fs.readFile(`${path.join(JSONURL, req.body.filename)}`, (err, data) => {
        if (err) {
            return res.json({
                status: false,
                data: BSC.TEXT_FILE_NOT_FOUND_ERROR
            })
        } else {
            let json_data = JSON.parse(data);
            return res.json({
                status: true,
                data: json_data
            })
        }
    });
}

exports.getDefaultAudio = async (req, res) => {
    var data = await BSC.Bfind(AudioModel, { user_id: "default_music" });
    if (data) {
        return res.json({
            status: true,
            data
        })
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.updateAudioStyles = async (req, res) => {
    const { user_id, audio_id, update_data } = req.body
    var data = await BSC.BfindOneAndUpdate(AudioModel, { user_id, _id: audio_id }, update_data);

    if (data) {
        this.getAudioStyle(req, res)
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.getAudioStyle = async (req, res) => {
    const { user_id, audio_id } = req.body;
    var data = await BSC.BfindOne(AudioModel, { user_id, _id: audio_id })

    if (data) {
        return res.json({
            status: true,
            data
        })
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.searchSpotifySongs = async (req, res) => {
    const { filter, access_token } = req.body;

    const params = qs.stringify({
        'q': filter,
        'type': 'track'
    })

    var config = {
        method: 'get',
        url: `https://api.spotify.com/v1/search?${params}`,
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    };

    axios(config)
        .then(function (response) {
            return res.json({
                status: true,
                data: response.data
            })
        })
        .catch(function (error) {
            return res.json({
                status: false,
                data: error.response.status
            })
        });
}

exports.spotifyAuthentication = async (req, res) => {
    var data = qs.stringify({
        'grant_type': 'client_credentials'
    });
    var config = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': `Basic ${base64encode(SPOTIFY_CLIENTID + ":" + SPOTIFY_CLIENTSECRET)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data
    };

    axios(config).then(function (response) {
        return res.json({
            status: true,
            data: response.data
        })
    }).catch(function (error) {
        return res.json({
            status: true,
            data: BSC.TEXT_SERVER_ERROR
        })
    });
}

exports.deleteAudio = async (req, res) => {
    const { _id } = req.body;
    var data = await BSC.BfindOneAndDelete(AudioModel, { _id })
    if (data) {
        this.getAudiosByUserId(req, res);
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.loadingSpotifyMusic = async (req, res, next) => {
    const { user_id, preview_url, name, image } = req.body;
    const file_name = md5(String(new Date().valueOf())) + ".mp3";
    const json_file_name = "spotify_music.json"
    const file = fs.createWriteStream(path.join(MUSICURL, file_name));

    const me = this;

    https.get(preview_url, function (response) {
        response.pipe(file);
        file.on("finish", () => {
            exec(`audiowaveform -i ${path.join(MUSICURL, file_name)} -o ${path.join(MUSICURL, json_file_name)}`, async (err, stdout, stderr) => {
                if (err) {
                    console.error("json converting error => ",err);
                    return res.json({
                        status: false,
                        data: BSC.TEXT_NOT_ABLE_TO_GET_DATA
                    });
                }

                const json_data = JSON.parse(fs.readFileSync(path.join(MUSICURL, json_file_name)));

                const color = {
                    "color": 0,
                    "backgroundColor": "#FFFFFF"
                }
                const style = {
                    "graph_type": "bar",
                    "bar_width": 1,
                    "bar_space": 0,
                    "circle_radius": 0,
                    "circle_rotate": 0,
                    "bar_shape": 0
                }
                const text = {
                    "displayText": "",
                    "textFont": "Alfa Slab One",
                    "textColor": "black",
                    "fontSize": 14,
                    "textJustification": 1,
                    "textVerticalAlign": 1
                }

                var sdata = await BSC.data_save({ user_id: user_id, audio_name: file_name, json_data, origin_name: name, color: color, style: style, text: text, image }, AudioModel)
                if (sdata) {
                    me.getAudiosByUserId(req, res);
                    fs.unlink(path.join(MUSICURL, json_file_name), (err) => {
                        if (err) throw err;
                    })
                } else {
                    fs.unlink(path.join(MUSICURL, json_file_name), (err) => {
                        if (err) throw err;
                    })
                    return res.json({
                        status: false,
                        data: BSC.TEXT_SERVER_ERROR
                    })
                }
            });
        })
    }).on('error', (err) => {
        console.log("we are not able to download file from the link => ",err)
        return res.json({
            status: false,
            data: BSC.TEXT_NOT_ABLE_TO_FIND_FILE
        })
    });
}