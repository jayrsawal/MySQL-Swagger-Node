'use strict';

var url = require('url');
var Helper = require('./HelperService');

module.exports.tinyurl = function getTinyUrl (req, res, next) {
	Helper.getTinyUrl(req.swagger.params, res, next);
};