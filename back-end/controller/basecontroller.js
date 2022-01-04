const config = require('../db');
const timermoment = require('moment')
var crypto = require('crypto');
const url = require('url');
const fs = require("fs");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const ENCRYPTION_KEY = "e807f1fcf82d132f9bb018ca6738a19f"; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

exports.encrypt = (text) => {
	let iv = crypto.randomBytes(IV_LENGTH);
	let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString('hex') + ':' + encrypted.toString('hex');
}

exports.decrypt = (text) => {
	try {
		let textParts = text.split(':');
		let iv = Buffer.from(textParts.shift(), 'hex');
		let encryptedText = Buffer.from(textParts.join(':'), 'hex');
		let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	} catch (e) {
		return false
	}
}

exports.get_ipaddress = (req) => {
	var forwarded = req.headers['x-forwarded-for']
	var ips = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
	var ip = ips && ips.length > 0 && ips.indexOf(",") ? ips.split(",")[0] : null;
	return ip;
}

exports.get_stand_date_first = (date) => {
	return new Date(timermoment(new Date(date)).format('YYYY-MM-DD'))
}

exports.get_stand_date_end = (date) => {
	return new Date(timermoment(new Date(date)).format('YYYY-MM-DD'))
}

exports.get_stand_date_end1 = (date) => {
	return new Date(timermoment(new Date(new Date(date).valueOf() + 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'))
}

exports.Bfind = async (model, condition = {}) => {
	try {
		var findhandle = null;
		await model.find(condition).then(rdata => {
			findhandle = rdata;
		});
		if (!findhandle) {
			return false;
		} else {
			return findhandle;
		}
	} catch (e) {
		return false;
	}
}

exports.convert = (input, output, callback) => {
    ffmpeg(input)
        .output(output)
        .on('end', function() {                    
            callback(null);
        }).on('error', function(err){
            console.log('error: ', err);
            callback(err);
        }).run();
}

exports.BfindSort = async (model, condition = {}) => {
	try {
		var outdata = null;
		await model.find(condition).sort({ order: 1 }).then(rdata => {
			if (!rdata) {
				outdata = false;
			} else {
				outdata = rdata;
			}
		});
		return outdata;
	} catch (e) {
		return false;
	}
}

exports.get_date = () => {
	return new Date(timermoment(new Date()).format('YYYY-MM'))
}

exports.headers = () => {
	return { 'Content-Type': 'application/x-www-form-urlencoded' };
}

exports.cv_ebase64 = (rstring) => {
	let buff = new Buffer(rstring);
	let base64data = buff.toString('base64');
	return base64data
}

exports.cv_dbase64 = (rstring) => {
	let buff = new Buffer(rstring, 'base64');
	let text = buff.toString('ascii');
	return text;
}

exports.data_save = async (indata, model) => {
	var handle = null;
	var savehandle = new model(indata);
	await savehandle.save().then(rdata => {
		if (!rdata) {
			handle = false;
		} else {
			handle = rdata;
		}
	});
	return handle;
}

exports.BSave = async (indata) => {
	var handle = null;
	await indata.save().then(rdata => {
		if (!rdata) {
			handle = false;
		} else {
			handle = rdata;
		}
	});
	return handle;
}

exports.BSortfind = async (modal, condition = {}, sortcondition = {}) => {
	var data;
	await modal.find(condition).sort(sortcondition).then(rdata => {
		data = rdata;
	});
	if (!data) {
		return false;
	} else {
		return data;
	}
}

exports.BSortfindSelect = async (modal, condition = {}, sortcondition = {}, select = "") => {
	try {
		var data;
		await modal.find(condition, select).sort(sortcondition).then(rdata => {
			data = rdata;
		});
		if (!data) {
			return false;
		} else {
			return data;
		}
	} catch (e) {
		return false;
	}
}

exports.BSortfindPopulate = async (modal, condition = {}, sortcondition = {}, populatestring) => {
	try {
		var data;
		await modal.find(condition).populate(populatestring).sort(sortcondition).then(rdata => {
			data = rdata;
		});
		if (!data) {
			return false;
		} else {
			return data;
		}
	} catch (e) {
		return false;
	}
}

exports.BfindOne = async (model, condition = {}) => {
	try {
		var outdata = null;
		await model.findOne(condition).then(rdata => {
			if (!rdata) {
				outdata = false;
			} else {
				outdata = rdata;
			}
		});
		return outdata;
	} catch (e) {
		return false;
	}
}

exports.BfindOneSelect = async (model, condition = {}, select = "") => {
	try {
		var outdata = null;
		await model.findOne(condition, select).then(rdata => {
			if (!rdata) {
				outdata = false;
			} else {
				outdata = rdata;
			}
		});
		return outdata;
	} catch (e) {
		return false;
	}
}


exports.BfindOneAndUpdate = async (model, condition = {}, data) => {
	var updatehandle = await model.findOneAndUpdate(condition, data, { new: true, upsert: true, })
	if (!updatehandle) {
		return false
	} else {
		return updatehandle
	}
}

exports.BfindOneAndDelete = async (model, condition) => {
	try {
		var deletehandle = null;
		await model.findOneAndDelete(condition).then(rdata => {
			deletehandle = rdata;
		});
		if (!deletehandle) {
			return false;
		} else {
			return deletehandle;
		}
	} catch (e) {
		return false;
	}
}

exports.imageupload = (req, res, next) => {
	if (req.files && req.files.length) {
		var filename = req.files[0].filename;
		var filetype = req.files[0].mimetype.split("/")[1];
		var now_path = config.BASEURL + filename;
		var new_path = config.BASEURL + filename + "." + filetype;
		fs.rename(now_path, new_path, (err) => {
			if (err) {
				req.body.imagesrc = false;
			} else {
				var img = filename + "." + filetype;
				req.body.imagesrc = img;
				next();
			}
		});
	} else {
		req.body.imagesrc = false;
		next();
	}
}

exports.get_timestamp = () => {
	return (new Date()).valueOf();
}

//url parse 
exports.urlparse = (adr) => {
	var q = url.parse(adr, true);
	var qdata = q.query;
	return qdata;
}

exports.array_sort = (data, handle) => {
	var rows = [];
	for (var i = 0; i < data.length; i++) {
		data[i][handle] = i + 1;
		rows.push(data[i]);
	}
	return rows;
}

exports.validTaskFileType = (file) => {
	console.log(`file`, file)
	const mimeType = file.mimetype.split("/")[0]
	const fileType = file.filename.split(".")[1];
	if (mimeType == "image" || mimeType == "video") {
		return mimeType;
	}
	if (fileType == "obj" || fileType == "fbx" || fileType == "gltf" || fileType == "dae") {
		return fileType;
	}
	return false;
}

exports.TEXT_SERVER_ERROR = "Something went wrong! Please try again later."
exports.TEXT_FILE_NOT_FOUND_ERROR = "The file is not exist!"
exports.TEXT_EMAIL_DUPLICATED = "This email already exists!"
exports.TEXT_EMAIL_NOT_EXISTS = "This email doesn't exists!"
exports.TEXT_INVALID_PASSWORD = "This password is invalid!"
exports.TEXT_FAILED_CREATING_RECORD = "Audio creating is failed!"
exports.TEXT_NOT_ABLE_TO_FIND_FILE = "Sorry, We are not able to find the music file!"
exports.TEXT_NOT_ABLE_TO_GET_DATA = "Sorry, We are not able to get data from the audio!"
exports.TEXT_THE_COLOR_ALREADY_EXISTS = "This color already exists on your custom background colors!"