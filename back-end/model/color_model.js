const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colors = () => {
    var ColorSchema = new Schema({
        user_id: { type: String, required: true },
        name: { type: String, required: true },
        color: { type: Array, required: true },
        publish: { type: Boolean, default: false }
    })

    return mongoose.model("colors", ColorSchema);
}

const backgroundColors = () => {
    var ColorSchema = new Schema({
        user_id: { type: String, required: true },
        name: { type: String, required: true },
        color: { type: String, required: true },
    })

    return mongoose.model("backgrounds", ColorSchema);
}

module.exports = {
    colors: colors(),
    backgroundColors: backgroundColors()
}