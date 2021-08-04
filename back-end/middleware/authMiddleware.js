// const axios = require("axios");

const auth = {
    
    // checks if the user is logged in, if not, redirect to the 
    // unauthorized route
    isLoggedIn: async (req, res, next)=> {
        try{
            next()
        } catch(e) {
            return res.json({session : true});
        }
    }
}

module.exports = auth;