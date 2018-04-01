'use strict'

var request = require("request");

exports.getWindowHeight = function(args, res, next) {
  /**
  * Returns the height of a given url
  *
  * returns json
  **/
  var url = args.url.value;
  request(url, (error, response, body) => {
  	if(error) {
  		res.end();
  	} else {
	  	res.setHeader('Content-Type', 'application/json');
	    res.end(JSON.stringify({height: h}));
  	}
  });
}
