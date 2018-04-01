'use strict'

var request = require("request");

exports.getTinyUrl = function(args, res, next) {
  /**
  * Returns the height of a given url
  *
  * returns json
  **/
  var url = args.url.value;
  request("http://tinyurl.com/api-create.php?url=" + url, (error, response, body) => {
  	if(error) {
  		res.end();
  	} else {
	  	res.setHeader('Content-Type', 'application/json');
	  	let data = {
	  		"original": url,
	  		"full_tiny": body, 
	  	};
	  	data["hash"] = body.replace("http://tinyurl.com/", "");
	    res.end(JSON.stringify(data));
  	}
  });
}
