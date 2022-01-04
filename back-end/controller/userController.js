const userModel = require("../model/user_model").users;
const sessionModel = require("../model/user_model").session;
const AudioModel = require("../model/audio_model").audios;
const BSC = require("./basecontroller")
const md5 = require("md5")
const config = require("../db");
const fs = require('fs');
const path = require('path');

const { JSONURL } = require('../db');

async function existsEmail(email) {
    var femail = await BSC.BfindOne(userModel, { email })
    if (femail) {
        return femail;
    } else {
        return false;
    }
}

exports.register = async (req, res) => {
    if (!await existsEmail(req.body.email)) {
        var user = new userModel(req.body)
        user.password = user.generateHash(user.password)

        var sdata = await BSC.data_save(user, userModel);
        if (sdata) {
            const session_token = md5(new Date())
            var session = new sessionModel({ user_id: sdata._id, session_token, expire_time: Date.now() + config.EXPIRE_TIME })
            var sedata = await BSC.data_save(session, sessionModel)
            if (sedata) {
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

                const json_data = JSON.parse(fs.readFileSync(path.join(JSONURL, "79149c4d64bf024ef0ff543c12a46edb.json")));

                await BSC.data_save({ user_id: sdata._id, audio_name: "25ce7c0fa50a3fb523c9b3c8a24f95cf.mp3", json_data, origin_name: "Demo Sound File", color, style, text }, AudioModel)

                return res.json({
                    status: true,
                    data: {
                        session_token,
                        userData: sdata
                    }
                })
            } else {
                return res.json({
                    status: false,
                    data: BSC.TEXT_SERVER_ERROR
                })
            }
        } else {
            return res.json({
                status: false,
                data: BSC.TEXT_SERVER_ERROR
            })
        }
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_EMAIL_DUPLICATED
        })
    }
}

exports.login = async (req, res) => {
    var user = await existsEmail(req.body.email);
    if (user) {
        if (user.validPassword(req.body.password, user.password)) {
            const session_token = md5(new Date())
            var session = new sessionModel({ user_id: user._id, session_token, expire_time: Date.now() + config.EXPIRE_TIME })
            var sedata = await BSC.data_save(session, sessionModel)
            if (sedata) {
                return res.json({
                    status: true,
                    data: {
                        session_token,
                        userData: user
                    }
                })
            } else {
                return res.json({
                    status: false,
                    data: BSC.TEXT_SERVER_ERROR
                })
            }
        } else {
            return res.json({
                status: false,
                data: BSC.TEXT_INVALID_PASSWORD
            })
        }
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_EMAIL_NOT_EXISTS
        })
    }
}