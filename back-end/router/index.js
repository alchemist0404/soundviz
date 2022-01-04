const express = require('express');
const router = express.Router();

const audioRouter = require("./audio_router")
const styleRouter = require("./style_router")
const authRouter = require("./auth_router")
const printRouter = require("./print_router")

router.use("/audio", audioRouter);
router.use("/style", styleRouter);
router.use("/auth", authRouter);
router.use("/print", printRouter);

module.exports = router;