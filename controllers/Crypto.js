'use strict';

var url = require('url');
var Crypto = require('./CryptoService');

module.exports.coin_list = function getCoins (req, res, next) {
  Crypto.getCoins(req.swagger.params, res, next);
};

module.exports.coin_data = function getCoinData (req, res, next) {
  Crypto.getCoinData(req.swagger.params, res, next);
};

module.exports.reddit_sentiment = function getRedditSentiment (req, res, next) {
  Crypto.getRedditSentiment(req.swagger.params, res, next);
};