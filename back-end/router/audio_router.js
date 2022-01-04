const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const audioController = require("../controller/audioController")
const UploaderManager = require("../middleware/Uploader");
const authMiddleWare = require("../middleware/authMiddleware")

const { MUSICURL } = require('../db')
var Uploader = new UploaderManager(path.join(MUSICURL))

router.post("/uploadAudio", authMiddleWare.isLoggedIn, multer({ storage: Uploader.storage, fileFilter: Uploader.filter }).any(), audioController.uploadAudio);
router.post("/uploadRecording", authMiddleWare.isLoggedIn, multer().any(), audioController.uploadRecording);
router.post("/getAudiosByUserId", authMiddleWare.isLoggedIn, audioController.getAudiosByUserId);
router.post("/updateAudioStyles", authMiddleWare.isLoggedIn, audioController.updateAudioStyles);
router.post("/getAudioStyle", authMiddleWare.isLoggedIn, audioController.getAudioStyle);
router.post("/spotifyAuthentication", authMiddleWare.isLoggedIn, audioController.spotifyAuthentication);
router.post("/searchSpotifySongs", authMiddleWare.isLoggedIn, audioController.searchSpotifySongs);
router.post("/deleteAudio", authMiddleWare.isLoggedIn, audioController.deleteAudio);
router.post("/loadingSpotifyMusic", authMiddleWare.isLoggedIn, audioController.loadingSpotifyMusic);
router.post("/getDefaultAudio", audioController.getDefaultAudio);
router.post("/getJson", audioController.getJson);

module.exports = router;