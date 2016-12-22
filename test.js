var handler = require("./index.js");
var Politifact = require("./PantsOnFire.js");

var mockResponse = {
  tell : function(text) {
    console.log(text);
  },
}

var test = new Politifact(mockResponse); 

test.requestResponse();
