'use strict';

var mysql = require('mysql');
var config = require('./../server/config');
var stopwords = require('nltk-stopwords');
var request = require("request");
config.setDatabase("crypto");
var con;

handleDisconnect();

function handleDisconnect() {
  con = mysql.createConnection(config.getConnectionString());
  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

exports.getCoins = function(args, res, next) {
  /**
  * Returns list of coins by ID, scraped from coinmarketcap.com
  *
  * returns json
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
  *h
  * returns json
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

exports.getRedditSentiment = function(args, res, next) {
    /**
  * Returns sentiment data of /r/bitcoin
  * Comes in percentage of positivity, negativity or neutral
  * returns json
  **/
  var sql = "select s.created, s.pos, s.neutral, s.neg, s.posts, s.score \
    from sentiment s order by created desc limit 1";
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