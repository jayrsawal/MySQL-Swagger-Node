'use strict';

var mysql = require('mysql');
var config = require('./../server/config');

config.setDatabase("crypto");
var con = mysql.createConnection(config.getConnectionString());

exports.getCoins = function(args, res, next) {
  /**
  * Returns list of coins by ID, scraped from coinmarketcap.com
  *
  * returns Map
  **/
  var sql = "select id, coin, sym from coin;";
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    }
  });
}

exports.getCoinData = function(args, res, next) {
  /**
  * Returns list of coins by ID, scraped from coinmarketcap.com
  *
  * returns Map
  **/
  var sql = "select c.* from coin c \
    left join coindata cd on c.id=cd.coinid \
    where c.sym=? order by cd.created desc limit 1;";
  var symbol = args.symbol.value;
  con.query(sql, [symbol], function (err, result) {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    }
  });
}