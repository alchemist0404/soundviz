const sessionModel = require("../model/user_model").session
const BSC = require("../controller/basecontroller")
const config = require("../db")

const auth = {

    // checks if the user is logged in, if not, redirect to the 
    // unauthorized route
    isLoggedIn: async (req, res, next) => {
        try {
            const access_token = req.headers['access-token']
            var session = await BSC.BfindOne(sessionModel, { session_token: access_token })
            if (session) {
                if (Date.now() < session.expire_time) {
                    await BSC.BfindOneAndUpdate(sessionModel, { session_token: access_token }, { expire_time: Date.now() + config.EXPIRE_TIME })
                } else {
                    await BSC.BfindOneAndDelete(sessionModel, { session_token: access_token })
                    return res.json({ session: true });
                }
            } else {
                return res.json({ session: true });
            }
            next()
        } catch (e) {
            return res.json({ session: true });
        }
    }
}

module.exports = auth;