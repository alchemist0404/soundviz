const express = require('express');
const router = express.Router();
const printController = require("../controller/printController")
const authMiddleWare = require("../middleware/authMiddleware")


router.post("/convertSvgToPdf", authMiddleWare.isLoggedIn, printController.convertSvgToPdf);
router.post("/addToCart", authMiddleWare.isLoggedIn, printController.addToCart);
router.post("/loadCartsByUserId", authMiddleWare.isLoggedIn, printController.loadCartsByUserId);

module.exports = router;