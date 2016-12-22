'use strict'

var DEBUG = true;

function log(msg)  {
    if (DEBUG) {
        console.log(msg);
    }
}

var cheerio = require("cheerio"),
    request = require("request");


// TODO: pass in id, and route id for more generic handling
function Politifact(response) {
    this.url = "http://www.politifact.com/truth-o-meter/rulings/pants-fire/"
    this.response = response;
}

function Lie($, content) {
    this.statementSource = $(content).find(".statement__source").text();
    this.statement = $(content).find(".link").text();
    this.quote = $(content).find(".quote").text();
}

Lie.prototype.buildResponse = function() { 
    return this.statementSource + " lied today by saing: " + this.statement + ". The truth is: " + this.quote; 
}

/**
 * Bootstrap 
 */
Politifact.prototype.requestResponse = function () {

    var Politifact = this;
    request(this.url, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var lies = parse($);
        Politifact.send(lies);
      }
    });
}

Politifact.prototype.send = function(lies) {
    var response = "The top lies for the day are... ";
    lies.reverse(); 
    while (lies.length) {
        var lie = lies.pop();
        response += lie.buildResponse();
        response += "... ";
    }
    this.response.tell(response);
}

function parse($) {
    var lies = $('.statement');
    var firstThree = [lies[0], lies[1], lies[2]]; 
    return firstThree.map(function(val, i) { 
        return new Lie($, val) 
    });
}

module.exports = Politifact;
