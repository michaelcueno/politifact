// Alexa SDK for JavaScript v1.0.00
// Copyright (c) 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved. Use is subject to license terms.

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill'),
    PantsOnFire = require('./PantsOnFire');


/**
 * Politifact is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Politifact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Politifact.prototype = Object.create(AlexaSkill.prototype);
Politifact.prototype.constructor = Politifact;

Politifact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("PantsOnFire onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Politifact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("PantsOnFire onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Would you like to hear the top lies of the day?";
    response.ask(speechOutput);
};

Politifact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("PantsOnFire onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Politifact.prototype.intentHandlers = {

    // register custom intent handlers
    GetTodaysLies : function (intent, session, response) {
        var arrival = new PantsOnFire(response);
        arrival.requestResponse();
    }

};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Politifact skill.
    var politifact = new Politifact();
    politifact.execute(event, context);
};

