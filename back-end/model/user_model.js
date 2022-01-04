const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = () => {
    var UserSchema = new Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    })

    UserSchema.pre("save", (next) => {
        next();
    })

    UserSchema.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    UserSchema.methods.validPassword = function (password, encrypted) {
        return bcrypt.compareSync(password, encrypted);
    }

    return mongoose.model("users", UserSchema);
}

const session = () => {
    const SessionSchema = new Schema({
        user_id: { type: String, required: true },
        session_token: { type: String, required: true },
        expire_time: { type: Number, required: true }
    })

    return mongoose.model("sessions", SessionSchema)
}

module.exports = {
    users: users(),
    session: session()
}