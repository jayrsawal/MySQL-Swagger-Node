'use strict';

var url = require('url');
var Helper = require('./HelperService');

module.exports.window_height = function getWindowHeight (req, res, next) {
	Helper.getWindowHeight(req.swagger.params, res, next);
};