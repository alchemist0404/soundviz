const BSC = require('./basecontroller')
const colorModel = require('../model/color_model').colors
const backgroundColorModel = require('../model/color_model').backgroundColors

exports.addColor = async (req, res) => {
    var data = await BSC.data_save({ user_id: req.body.user_id, name: req.body.name, color: req.body.color, publish: req.body.publish }, colorModel)
    if (data) {
        this.getColorsByUserId(req, res)
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.getColorsByUserId = async (req, res) => {
    const { user_id } = req.body;
    var data = await BSC.Bfind(colorModel, { $or: [{ user_id }, { publish: true }] })
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

exports.getPublicColors = async (req, res) => {
    var data = await BSC.Bfind(colorModel, { publish: true })
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

exports.addBackgroundColor = async (req, res) => {
    const { user_id, background, name } = req.body;
    var fdata = await BSC.BfindOne(backgroundColorModel, { user_id, color: background });
    if (fdata) {
        return res.json({
            status: false,
            data: BSC.TEXT_THE_COLOR_ALREADY_EXISTS
        })
    }
    
    var data = await BSC.data_save({ user_id, color: background, name }, backgroundColorModel);
    if (data) {
        this.getBackgroundsByUserId(req, res)
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.getBackgroundsByUserId = async (req, res) => {
    const { user_id } = req.body;
    var data = await BSC.Bfind(backgroundColorModel, { user_id })
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