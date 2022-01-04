const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carts = () => {
    var CartSchema = new Schema({
        user_id: { type: String, required: true },
        preview_img: { type: String, required: true },
        download_img: { type: String, required: true },
        pdf: { type: String, required: true },
        print_option: { type: String, required: true },
        print_size: { type: String, required: true },
        price: { type: Number, required: true }
    })

    return mongoose.model("carts", CartSchema);
}

module.exports = {
    carts: carts()
}